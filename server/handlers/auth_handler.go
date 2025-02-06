package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
	"github.com/saadkhaleeq610/pursuit/server/utils"
	"golang.org/x/crypto/bcrypt"
)

type authUserRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type authUserResponse struct {
	Email        string `json:"email"`
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

func AuthUser(auth *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req authUserRequest
		// Check if the incoming json request is valid according to our json request format or not
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// First we will check if the user already exists with this email

		existingUser, err := auth.GetUserByEmail(c, req.Email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "User with this email not found"})
			return
		}

		// Compare the stored hashed password, with the hashed version of the password that was received
		err = bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(req.Password))
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Password"})
			return
		}

		// Generate access token
		accessToken, err := utils.CreateAccessToken(existingUser.Email, existingUser.RoleID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate access token"})
			return
		}

		// Store Refresh Token – Save it in DB.
		refreshToken, err := utils.CreateRefreshToken(existingUser.Email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
			return
		}

		// Save the refresh token in the database
		err = auth.StoreRefreshToken(c, db.StoreRefreshTokenParams{
			UserID:       existingUser.UserID,
			RefreshToken: refreshToken,
			ExpiresAt: pgtype.Timestamp{
				Time:  time.Now().Add(time.Hour * 24 * 7),
				Valid: true,
			},
		})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save refresh token"})
			return
		}

		// Set Cookie – Store refresh token in an HTTP-only cookie.
		c.SetCookie("refresh_token", refreshToken, 60*15, "/", "", false, true)

		// Set the user details and access token in the response
		c.JSON(http.StatusOK, authUserResponse{
			Email:        existingUser.Email,
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		})
	}
}

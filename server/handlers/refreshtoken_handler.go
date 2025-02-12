package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/saadkhaleeq610/pursuit/server/config"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
	"github.com/saadkhaleeq610/pursuit/server/utils"
)

type refreshTokenResponse struct {
	AccessToken string `json:"access_token"`
}

func RefreshTokenHandler(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Read the refresh token from the httponly cookie
		refreshToken, err := c.Cookie("refresh_token")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Refresh token not found"})
			return
		}

		// Validate the refresh token
		config, err := config.LoadConfig()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load config"})
			return
		}

		userID, err := utils.ValidateToken(refreshToken, config.SecretKey)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid refresh token"})
			return
		}

		// Check if the refresh token exists in the database
		existingToken, err := store.GetRefreshTokenByToken(c, refreshToken)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Refresh token not found"})
			return
		}

		// Check if the refresh token has expired
		if time.Now().After(existingToken.ExpiresAt.Time) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Refresh token has expired"})
			return
		}

		// Generate a new access token
		user, err := store.GetUserById(c, int32(userID))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user details"})
			return
		}

		accessToken, err := utils.CreateAccessToken(user.Email, user.RoleID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate access token"})
			return
		}

		// Generate a new refresh token
		newRefreshToken, err := utils.CreateRefreshToken(user.Email, user.UserID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
			return
		}

		// Store the new refresh token in the database
		err = store.StoreRefreshToken(c, db.StoreRefreshTokenParams{
			UserID:       user.UserID,
			RefreshToken: newRefreshToken,
			ExpiresAt:    pgtype.Timestamp{Time: time.Now().Add(time.Hour * 24 * 7), Valid: true},
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store refresh token"})
			return
		}

		// Delete the old refresh token
		err = store.DeleteRefreshToken(c, refreshToken)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete old refresh token"})
			return
		}

		// Set the new refresh token in an HTTP-only cookie
		c.SetCookie(
			"refresh_token",
			newRefreshToken,
			60*60*24*7, // 7 days
			"/",
			"",
			false, // Secure (set to true in production with HTTPS)
			true,
		)

		// Return the new access token
		c.JSON(http.StatusOK, refreshTokenResponse{
			AccessToken: accessToken,
		})
	}
}

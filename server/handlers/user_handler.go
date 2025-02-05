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

type createUserRequest struct {
	Name         string `json:"name" binding:"required"`
	Email        string `json:"email" binding:"required,email"`
	Password     string `json:"password" binding:"required,min=6"`
	RoleID       int32  `json:"role_id" binding:"required"`
	RestaurantID *int32 `json:"restaurant_id,omitempty"`
}

type createUserResponse struct {
	UserID       int32       `json:"user_id"`
	Name         string      `json:"name"`
	Email        string      `json:"email"`
	RoleID       int32       `json:"role_id"`
	RestaurantID pgtype.Int4 `json:"restaurant_id,omitempty"`
	AccessToken  string      `json:"access_token"`
}

func CreateUser(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req createUserRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// First we will check if the user already exists with this email
		// Todo:Need to add email verifcation . We will add it later
		existingUser, err := store.GetUserByEmail(c, req.Email)
		if err == nil && existingUser.UserID > 0 {
			c.JSON(http.StatusConflict, gin.H{"error": "User with this email already exists"})
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}

		// COnverting  restaurant ID to pgtype.Int4
		var restaurantID pgtype.Int4
		if req.RestaurantID != nil {
			restaurantID.Int32 = *req.RestaurantID
			restaurantID.Valid = true
		}

		//In this step user is getted stored in the database
		user, err := store.CreateUser(c, db.CreateUserParams{
			Name:         req.Name,
			Email:        req.Email,
			Password:     string(hashedPassword),
			RoleID:       req.RoleID,
			RestaurantID: restaurantID,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}

		// Generate tokens
		accessToken, err := utils.CreateAccessToken(user.Email, user.RoleID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate access token"})
			return
		}

		refreshToken, err := utils.CreateRefreshToken(user.Email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
			return
		}

		// Here we are storing refresh token in DB
		err = store.StoreRefreshToken(c, db.StoreRefreshTokenParams{
			UserID:       user.UserID,
			RefreshToken: refreshToken,
			ExpiresAt:    pgtype.Timestamp{Time: time.Now().Add(time.Hour), Valid: true},
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store refresh token"})
			return
		}
		c.SetCookie(
			"refresh_token",
			refreshToken,
			60*60*24*7,
			"/",
			"",
			true,
			true, // httpOnly
		)

		response := createUserResponse{
			UserID:       user.UserID,
			Name:         user.Name,
			Email:        user.Email,
			RoleID:       user.RoleID,
			RestaurantID: user.RestaurantID,
			AccessToken:  accessToken,
		}

		c.JSON(http.StatusCreated, response)
	}
}

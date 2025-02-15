package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
	"github.com/saadkhaleeq610/pursuit/server/utils"
	"golang.org/x/crypto/bcrypt"
)

type joinStaffReq struct {
	Name         string `json:"name" binding:"required"`
	Email        string `json:"email" binding:"required,email"`
	Password     string `json:"password" binding:"required"`
	RoleId       int32  `json:"role_id" binding:"required"`
	RestaurantId *int32 `json:"restaurant_id" binding:"required"`
}

type joinStaffResponse struct {
	Name          string `json:name`
	Email         string `json:"email"`
	Role_Id       int32  `json:"role_id" `
	Restaurant_Id int32  `json:"restaurant_id"`
}

func JoinStaffHandler(queries *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req joinStaffReq
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}

		var restaurantId pgtype.Int4
		if req.RestaurantId != nil {
			restaurantId.Int32 = *req.RestaurantId
			restaurantId.Valid = true
		}
		// Create user in users table
		user, err := queries.CreateUser(context.Background(), db.CreateUserParams{
			Name:         req.Name,
			Email:        req.Email,
			Password:     string(hashedPassword),
			RoleID:       req.RoleId,
			RestaurantID: restaurantId,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}

		// Remove invite entry after successful account creation
		err = queries.DeleteInvite(context.Background(), req.Email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete invite"})
			return
		}

		accessToken, err := utils.CreateAccessToken(user.Email, user.RoleID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate access token"})
			return
		}
		refreshToken, err := utils.CreateRefreshToken(user.Email, user.UserID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
			return
		}
		// Here we are storing refresh token in DB
		err = queries.StoreRefreshToken(c, db.StoreRefreshTokenParams{
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

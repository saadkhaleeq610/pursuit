package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
	"golang.org/x/crypto/bcrypt"
)

type joinRestaurantStaffReq struct {
	Name     string `json:"name" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
}

func JoinRestaurantStaffHandler(queries *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Bind request data
		var req joinRestaurantStaffReq
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Check if the email exists in the invite table
		invite, err := queries.CheckInvite(context.Background(), req.Email)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "No invite found for this email"})
			return
		}

		// Hash the password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}

		restaurantID := pgtype.Int4{Int32: invite.RestaurantID, Valid: true}

		// Create user in users table
		_, err = queries.CreateUser(context.Background(), db.CreateUserParams{
			Name:         req.Name,
			Email:        req.Email,
			Password:     string(hashedPassword),
			RoleID:       invite.RoleID,
			RestaurantID: restaurantID,
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

		c.JSON(http.StatusOK, gin.H{"message": "Account created successfully"})
	}
}

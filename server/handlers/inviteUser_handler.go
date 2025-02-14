package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
)

type inviteRequest struct {
	Email  string `json:"email" binding:"required,email"`
	RoleID int32  `json:"role_id" binding:"required"`
}

// ✅ Invite User Handler
func InviteUserHandler(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {

		// 🔹 Get the authenticated user's restaurant_id from context
		restaurantID, exists := c.Get("restaurant_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "restaurant_id not found in context"})
			return
		}

		// ✅ Type assertion to int32
		restID, ok := restaurantID.(int32)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid restaurant_id type"})
			return
		}

		// 🔹 Parse request
		var req inviteRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error in parsing": err.Error()})
			return
		}

		// 🔹 Insert invite into DB
		err := store.InviteUser(context.Background(), db.InviteUserParams{
			Email:        req.Email,
			RoleID:       req.RoleID,
			RestaurantID: restID, // ✅ Use the inviter's restaurant_id
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to invite user"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "User invited successfully"})
	}
}

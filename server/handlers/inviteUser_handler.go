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

func InviteUserHandler(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {

		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id not found in context"})
			return
		}

		uid, ok := userID.(int32)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user_id type"})
			return
		}

		user, err := store.GetUserById(context.Background(), uid)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user details"})
			return
		}

		if user.RestaurantID.Valid == false {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User is not associated with any restaurant"})
			return
		}

		var req inviteRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err = store.InviteUser(context.Background(), db.InviteUserParams{
			Email:        req.Email,
			RoleID:       req.RoleID,
			RestaurantID: user.RestaurantID.Int32,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to invite user"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "User invited successfully"})
	}
}

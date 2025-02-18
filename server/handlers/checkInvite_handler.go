package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
)

type checkInviteReq struct {
	Email string `json:"email" binding:"required,email"`
}

type checkInviteResponse struct {
	Email          string `json:"email"`
	Role_Id        int32  `json:"role_id" `
	Restaurant_Id  int32  `json:"restaurant_id"`
	RestaurantName string `json:"restaurant_name"`
}

func CheckInviteHandler(queries *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Bind request data
		var req checkInviteReq
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
		restaurantName, err := queries.GetRestaurantName(context.Background(), invite.RestaurantID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve restaurant name"})
			return
		}

		c.JSON(http.StatusOK, checkInviteResponse{
			Email:          invite.Email,
			Role_Id:        invite.RoleID,
			Restaurant_Id:  invite.RestaurantID,
			RestaurantName: restaurantName,
		})
	}
}

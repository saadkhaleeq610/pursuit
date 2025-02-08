package handlers

import (
	"net/http"

	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"

	"github.com/gin-gonic/gin"
)

type registerRestaurantRequest struct {
	Name        string `json:"name" binding:"required"`
	Address     string `json:"address" binding:"required"`
	PhoneNumber string `json:"phone_number" binding:"required"`
}

type createRestaurantResponse struct {
	ID          int32  `json:"id"`
	Name        string `json:"name"`
	Address     string `json:"address"`
	PhoneNumber string `json:"phone_number"`
	OwnerID     int32  `json:"owner_id"`
}

func RegisterRestaurant(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req registerRestaurantRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Get user_id from context
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		userIDInt32 := int32(userID.(int))

		// Create restaurant
		createRestaurant, err := store.CreateRestaurant(c, db.CreateRestaurantParams{
			Name:        req.Name,
			Address:     req.Address,
			PhoneNumber: req.PhoneNumber,
			OwnerID:     userIDInt32,
		})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, createRestaurantResponse{
			ID:          createRestaurant.RestaurantID,
			Name:        createRestaurant.Name,
			Address:     createRestaurant.Address,
			PhoneNumber: createRestaurant.PhoneNumber,
			OwnerID:     createRestaurant.OwnerID,
		})
	}
}

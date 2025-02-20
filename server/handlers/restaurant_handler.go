package handlers

import (
	"log"
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
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

type getRestDetailsRequest struct {
	RestaurantID int32 `json:"restaurant_id" binding:"required"`
}

type getRestDetailsResponse struct {
	RestaurantID int32  `json:"id"`
	Name         string `json:"name"`
	Address      string `json:"address"`
	PhoneNumber  string `json:"phone_number"`
	OwnerID      int32  `json:"owner_id"`
}

func RegisterRestaurant(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("📌 [INFO] Entered RegisterRestaurant handler")

		// Parse request body
		var req registerRestaurantRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			log.Printf("❌ [ERROR] Failed to bind JSON: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		log.Printf("✅ [DEBUG] Parsed request: %+v", req)

		// Retrieve user ID from context
		userID, exists := c.Get("user_id")
		if !exists {
			log.Println("❌ [ERROR] User ID not found in context")
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		// Type assertion for userID
		userIDInt32, ok := userID.(int32)
		if !ok {
			log.Printf("❌ [ERROR] Failed to assert user_id: %v", userID)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
			return
		}
		log.Printf("✅ [DEBUG] Retrieved user ID: %d", userIDInt32)

		// Create restaurant in the database
		log.Println("📌 [INFO] Creating restaurant in DB...")
		createRestaurant, err := store.CreateRestaurant(c, db.CreateRestaurantParams{
			Name:        req.Name,
			Address:     req.Address,
			PhoneNumber: req.PhoneNumber,
			OwnerID:     userIDInt32,
		})
		if err != nil {
			log.Printf("❌ [ERROR] Failed to create restaurant: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create restaurant"})
			return
		}
		log.Printf("✅ [DEBUG] Restaurant created: %+v", createRestaurant)

		// Update user's restaurant_id
		log.Println("📌 [INFO] Updating user's restaurant_id...")
		err = store.UpdateUserRestaurantID(c, db.UpdateUserRestaurantIDParams{
			UserID: userIDInt32,
			RestaurantID: pgtype.Int4{
				Int32: createRestaurant.RestaurantID,
				Valid: true,
			},
		})
		if err != nil {
			log.Printf("❌ [ERROR] Failed to update user's restaurant_id: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user's restaurant_id"})
			return
		}
		log.Println("✅ [DEBUG] User's restaurant_id updated successfully")

		// Return response
		log.Println("📌 [INFO] Sending success response")
		c.JSON(http.StatusOK, createRestaurantResponse{
			ID:          createRestaurant.RestaurantID,
			Name:        createRestaurant.Name,
			Address:     createRestaurant.Address,
			PhoneNumber: createRestaurant.PhoneNumber,
			OwnerID:     createRestaurant.OwnerID,
		})
	}
}

func GetRestaurantDetails(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("📌 [INFO] Entered GetRestaurantDetails handler")

		// Parse request body
		var req getRestDetailsRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			log.Printf("❌ [ERROR] Failed to bind JSON: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		log.Printf("✅ [DEBUG] Parsed request: %+v", req)

		// Fetch restaurant details from database
		log.Println("📌 [INFO] Fetching restaurant details from DB...")
		restaurant, err := store.GetRestaurantDetails(c, req.RestaurantID)
		if err != nil {
			log.Printf("❌ [ERROR] Failed to get restaurant details: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get restaurant details"})
			return
		}
		log.Printf("✅ [DEBUG] Fetched restaurant details: %+v", restaurant)

		// Return response
		log.Println("📌 [INFO] Sending success response")
		c.JSON(http.StatusOK, getRestDetailsResponse{
			RestaurantID: restaurant.RestaurantID,
			Name:         restaurant.Name,
			Address:      restaurant.Address,
			PhoneNumber:  restaurant.PhoneNumber,
			OwnerID:      restaurant.OwnerID,
		})
	}
}

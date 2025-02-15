package handlers

import (
	"context"
	"log"
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

		// Log request method and path
		log.Printf("Received request: %s %s", c.Request.Method, c.Request.URL.Path)

		// Log request headers
		for key, values := range c.Request.Header {
			log.Printf("Header: %s = %v", key, values)
		}

		userID, exists := c.Get("user_id")
		if !exists {
			log.Println("Error: user_id not found in context")
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id not found in context"})
			return
		}

		uid, ok := userID.(int32)
		if !ok {
			log.Println("Error: Invalid user_id type")
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user_id type"})
			return
		}

		log.Printf("Authenticated user ID: %d", uid)

		user, err := store.GetUserById(context.Background(), uid)
		if err != nil {
			log.Printf("Error retrieving user details: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user details"})
			return
		}

		log.Printf("User found: %+v", user)

		if !user.RestaurantID.Valid {
			log.Println("Error: User is not associated with any restaurant")
			c.JSON(http.StatusBadRequest, gin.H{"error": "User is not associated with any restaurant"})
			return
		}

		log.Printf("User's Restaurant ID: %d", user.RestaurantID.Int32)

		var req inviteRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			log.Printf("Error binding JSON: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Printf("Invite request received: %+v", req)

		err = store.InviteUser(context.Background(), db.InviteUserParams{
			Email:        req.Email,
			RoleID:       req.RoleID,
			RestaurantID: user.RestaurantID.Int32,
		})
		if err != nil {
			log.Printf("Error inviting user: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to invite user"})
			return
		}

		log.Println("User invited successfully!")
		c.JSON(http.StatusOK, gin.H{"message": "User invited successfully"})
	}
}

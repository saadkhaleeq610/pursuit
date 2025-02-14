package middleware

// import (
// 	"net/http"

// 	"github.com/saadkhaleeq610/pursuit/server/utils"

// 	"github.com/gin-gonic/gin"
// 	"github.com/saadkhaleeq610/pursuit/server/config"
// )

// func RestaurantIDMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		tokenString, err := c.Cookie("refresh_token")
// 		if err != nil {
// 			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
// 			c.Abort()
// 			return
// 		}

// 		config, err := config.LoadConfig()
// 		if err != nil {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
// 			c.Abort()
// 			return
// 		}

// 		// Extract full user details
// 		userID, email, role, restaurantID, err := utils.ValidateToken(tokenString, config.SecretKey)
// 		if err != nil {
// 			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
// 			c.Abort()
// 			return
// 		}

// 		// ✅ Set full user details in context
// 		c.Set("user_id", userID)
// 		c.Set("email", email)
// 		c.Set("role", role)
// 		c.Set("restaurant_id", restaurantID) // ✅ Include restaurant_id

// 		c.Next()
// 	}
// }

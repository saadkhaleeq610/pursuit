package middleware

import (
	"log"
	"net/http"

	"github.com/saadkhaleeq610/pursuit/server/utils"

	"github.com/gin-gonic/gin"
	"github.com/saadkhaleeq610/pursuit/server/config"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString, err := c.Cookie("refresh_token")
		if err != nil {
			log.Printf("Cookie error: %v", err) // Log the cookie error
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		config, err := config.LoadConfig()
		if err != nil {
			log.Printf("Config error: %v", err) // Log the config error
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
			c.Abort()
			return
		}

		userID, err := utils.ValidateToken(tokenString, config.SecretKey)
		if err != nil {
			log.Printf("Token validation error: %v", err) // Log the token validation error
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Set("user_id", int32(userID))
		c.Next()
	}
}

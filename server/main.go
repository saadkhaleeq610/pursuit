package main

//TODO: better handling of the config . Right Now it is against the DRY Principal
import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/saadkhaleeq610/pursuit/server/config"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
	"github.com/saadkhaleeq610/pursuit/server/handlers"
	"github.com/saadkhaleeq610/pursuit/server/middleware"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

func main() {
	config, err := config.LoadConfig()
	if err != nil {
		log.Fatal("Cannot load config:", err)
	}

	dbpool, err := pgxpool.New(context.Background(), config.DatabaseURL)
	if err != nil {
		log.Fatal("Unable to connect to database:", err)
	}
	defer dbpool.Close()

	store := db.New(dbpool)
	r := gin.Default()
	r.Use(CORSMiddleware())

	r.POST("/signup", handlers.SignupHandler(store))
	r.POST("/login", handlers.LoginHandler(store))
	r.POST("/restaurants", middleware.AuthMiddleware(), handlers.RegisterRestaurant(store))

	// apply middleware to /refreshtoken endpoint so that only authenticated users can access it
	// r.POST("/refresh_token", middleware.AuthMiddleware(), handlers.RefreshTokenHandler(store))
	r.POST("/logout", middleware.AuthMiddleware(), handlers.LogoutHandler(store))
	r.Run(config.ServerAddress)
}

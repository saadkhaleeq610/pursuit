package main

//TODO: better handling of the config . Right Now it is against the DRY Principal
import (
	"context"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/saadkhaleeq610/pursuit/server/config"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
	"github.com/saadkhaleeq610/pursuit/server/handlers"
	"github.com/saadkhaleeq610/pursuit/server/middleware"
)

// func CORSMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
// 		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
// 		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
// 		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

// 		if c.Request.Method == "OPTIONS" {
// 			c.AbortWithStatus(http.StatusNoContent)
// 			return
// 		}

// 		c.Next()
// 	}
// }

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
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/signup", handlers.SignupHandler(store))
	r.POST("/login", handlers.LoginHandler(store))
	r.POST("/register-restaurant", middleware.AuthMiddleware(), handlers.RegisterRestaurant(store))
	r.POST("/restaurant-details", middleware.AuthMiddleware(), handlers.GetRestaurantDetails(store))
	r.POST("/logout", middleware.AuthMiddleware(), handlers.LogoutHandler(store))
	r.POST("/refresh-token", handlers.RefreshTokenHandler(store))
	r.POST("/invite-user", middleware.AuthMiddleware(), handlers.InviteUserHandler(store))
	r.POST("/check-invite", handlers.CheckInviteHandler(store))
	r.POST("/join-staff", handlers.JoinStaffHandler(store))
	r.POST("/create-customer", handlers.CreateCustomer(store))
	r.GET("/customers/:restaurant_id", handlers.ListCustomers(store))
	r.POST("/create-item", handlers.CreateItem(store))
	r.GET("/list-items/:restaurant_id/items", handlers.ListItems(store))
	r.GET("/get-item/:restaurant_id", handlers.GetItem(store))
	r.GET("/items/:id", handlers.UpdateItem(store))
	r.GET("/items/:id", handlers.DeleteItem(store))
	r.Run(config.ServerAddress)
}

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
	r.POST("/check-invite", middleware.AuthMiddleware(), handlers.CheckInviteHandler(store))
	r.POST("/join-staff", handlers.JoinStaffHandler(store))
	r.POST("/create-customer", middleware.AuthMiddleware(), handlers.CreateCustomer(store))
	r.GET("/customers/:restaurant_id", middleware.AuthMiddleware(), handlers.ListCustomers(store))
	r.POST("/create-item", middleware.AuthMiddleware(), handlers.CreateItem(store))
	r.GET("/list-items/:restaurant_id/items", middleware.AuthMiddleware(), handlers.ListItems(store))
	r.GET("/get-item/:restaurant_id", middleware.AuthMiddleware(), handlers.GetItem(store))
	r.GET("/items/:id", middleware.AuthMiddleware(), handlers.UpdateItem(store))
	r.GET("/items/:id", middleware.AuthMiddleware(), handlers.DeleteItem(store))
	r.GET("/orders/:order_id", middleware.AuthMiddleware(), handlers.GetOrderById(store))
	r.GET("/restaurants/:restaurant_id/orders", middleware.AuthMiddleware(), handlers.ListOrdersByRestaurant(store))
	r.GET("/customers/:customer_id/orders", middleware.AuthMiddleware(), handlers.ListOrdersByCustomerId(store))
	r.Run(config.ServerAddress)
}

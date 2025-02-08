package main

//TODO: better handling of the config . Right Now it is against the DRY Principal
import (
	"context"
	"log"

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

	r.POST("/signup", handlers.SignupHandler(store))
	r.POST("/login", handlers.LoginHandler(store))
	r.POST("/restaurants", middleware.AuthMiddleware(), handlers.RegisterRestaurant(store))
	r.Run(config.ServerAddress)
}

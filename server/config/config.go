// config/config.go
package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DatabaseURL   string
	ServerAddress string
}

func LoadConfig() (config Config, err error) {
	err = godotenv.Load()
	if err != nil {
		return config, fmt.Errorf("error loading .env file: %w", err)
	}

	config.DatabaseURL = os.Getenv("DATABASE_URL")
	if config.DatabaseURL == "" {
		return config, fmt.Errorf("DATABASE_URL environment variable is required")
	}

	config.ServerAddress = os.Getenv("SERVER_ADDRESS")
	if config.ServerAddress == "" {
		config.ServerAddress = ":8080"
	}

	return config, nil
}

package utils

import (
	"fmt"
	"log"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/saadkhaleeq610/pursuit/server/config"
)

// In this jwt package there are two types of token . 1) token 2) token string

func CreateAccessToken(email string, role int32) (string, error) {
	config, err := config.LoadConfig()
	if err != nil {
		log.Fatal("Cannot load config:", err)
	}

	claims := jwt.MapClaims{
		"email": email,
		"role":  role,
		"exp":   time.Now().Add(time.Hour).Unix(), // Access token expires in 1 hour
		"iat":   time.Now().Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.SecretKey))
}

func CreateRefreshToken(email string) (string, error) {
	config, err := config.LoadConfig()
	if err != nil {
		log.Fatal("Cannot load config:", err)
	}

	claims := jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Hour * 24 * 7).Unix(), // Refresh token expires in 7 days
		"iat":   time.Now().Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.SecretKey))
}

func ValidateToken(tokenString string) (string, error) {
	config, err := config.LoadConfig()
	if err != nil {
		return "", fmt.Errorf("cannot load config: %v", err)
	}

	// This will parse token with claims . The return type of this function is of *jwt.Token. This function will also check the validaity of the token
	token, err := jwt.ParseWithClaims(tokenString, jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Method)
		}
		return []byte(config.SecretKey), nil
	})

	if err != nil {
		return "", fmt.Errorf("error parsing token: %v", err)
	}
	// Token.valid is set when we call jwt.Parsewithclaims function
	if token == nil || !token.Valid {
		return "", fmt.Errorf("invalid token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", fmt.Errorf("invalid token claims")
	}

	email, ok := claims["email"].(string)
	if !ok {
		return "", fmt.Errorf("invalid username claim")
	}

	return email, nil
}

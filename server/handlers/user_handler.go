package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
	"github.com/saadkhaleeq610/pursuit/server/utils"
	"golang.org/x/crypto/bcrypt"
)

type createUserRequest struct {
	Name         string `json:"name" binding:"required"`
	Email        string `json:"email" binding:"required,email"`
	Password     string `json:"password" binding:"required,min=6"`
	RoleID       int32  `json:"role_id" binding:"required"`
	RestaurantID *int32 `json:"restaurant_id,omitempty"`
}
type createUserResponse struct {
	UserID       int32       `json:"user_id"`
	Name         string      `json:"name"`
	Email        string      `json:"email"`
	RoleID       int32       `json:"role_id"`
	RoleName     string      `json:"role_name"`
	RestaurantID pgtype.Int4 `json:"restaurant_id,omitempty"`
	AccessToken  string      `json:"access_token"`
}

type authUserRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type authUserResponse struct {
	Email        string `json:"email"`
	Name         string `json:"name"`
	UserID       int32  `json:"user_id"`
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	RestaurantID int    `json:"restaurant_id"`
	RoleName     string `json:"role_name"`
	RoleID       int32  `json:"role_id"`
}

func SignupHandler(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req createUserRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// Check if the user already exists with this email
		// Todo:Need to add email verifcation . We will add it later
		_, err := store.GetUserByEmail(c, req.Email)
		if err == nil {
			c.JSON(http.StatusConflict, gin.H{"error": "User with this email already exists"})
			return
		}
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}
		// COnverting  restaurant ID to pgtype.Int4
		var restaurantID pgtype.Int4
		if req.RestaurantID != nil {
			restaurantID.Int32 = *req.RestaurantID
			restaurantID.Valid = true
		}
		//In this step user is getted stored in the database
		user, err := store.CreateUser(c, db.CreateUserParams{
			Name:         req.Name,
			Email:        req.Email,
			Password:     string(hashedPassword),
			RoleID:       req.RoleID,
			RestaurantID: restaurantID,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Failed to create user",
				"details": err.Error(),
			})
			return
		}
		// Generate tokens
		accessToken, err := utils.CreateAccessToken(user.Email, user.RoleID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate access token"})
			return
		}
		refreshToken, err := utils.CreateRefreshToken(user.Email, user.UserID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
			return
		}
		// Here we are storing refresh token in DB
		err = store.StoreRefreshToken(c, db.StoreRefreshTokenParams{
			UserID:       user.UserID,
			RefreshToken: refreshToken,
			ExpiresAt:    pgtype.Timestamp{Time: time.Now().Add(time.Hour), Valid: true},
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store refresh token"})
			return
		}
		c.SetCookie(
			"refresh_token",
			refreshToken,
			60*60*24*7,
			"/",
			"",
			true,
			true, // httpOnly
		)
		userWithRole, err := store.GetUserWithRole(c, user.UserID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user details"})
			return
		}

		response := createUserResponse{
			UserID:       userWithRole.UserID,
			Name:         userWithRole.Name,
			Email:        userWithRole.Email,
			RoleID:       userWithRole.RoleID,
			RoleName:     userWithRole.RoleName,
			RestaurantID: userWithRole.RestaurantID,
			AccessToken:  accessToken,
		}
		c.JSON(http.StatusCreated, response)
	}
}

func LoginHandler(auth *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req authUserRequest
		// Check if the incoming json request is valid according to our json request format
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// check if the user already exists with this email
		existingUser, err := auth.GetUserByEmail(c, req.Email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "User with this email not found"})
			return
		}

		// Compare the stored hashed password
		err = bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(req.Password))
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Password"})
			return
		}

		// Generate access token
		accessToken, err := utils.CreateAccessToken(existingUser.Email, existingUser.RoleID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate access token"})
			return
		}

		// Create and Store Refresh Token – Save it in DB.
		refreshToken, err := utils.CreateRefreshToken(existingUser.Email, existingUser.UserID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
			return
		}

		err = auth.StoreRefreshToken(c, db.StoreRefreshTokenParams{
			UserID:       existingUser.UserID,
			RefreshToken: refreshToken,
			ExpiresAt: pgtype.Timestamp{
				Time:  time.Now().Add(time.Hour * 24 * 7),
				Valid: true,
			},
		})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save refresh token"})
			return
		}

		// Set Cookie – Store refresh token in an HTTP-only cookie.
		c.SetCookie("refresh_token", refreshToken, 60*15, "/", "", false, true)

		c.JSON(http.StatusOK, authUserResponse{
			Email:        existingUser.Email,
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
			RoleID:       existingUser.RoleID,
			RoleName:     existingUser.RoleName,
			Name:         existingUser.Name,
			UserID:       existingUser.UserID,
			RestaurantID: int(existingUser.RestaurantID.Int32),
		})
	}
}

package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
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
	RestaurantID pgtype.Int4 `json:"restaurant_id,omitempty"`
}

func CreateUser(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req createUserRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// Here we need to convert the resturant to pgtype.Int4 because its type is like this in our models.go files
		var restaurantID pgtype.Int4
		if req.RestaurantID != nil {
			restaurantID.Int32 = *req.RestaurantID
			restaurantID.Valid = true
		}
		user, err := store.CreateUser(c, db.CreateUserParams{
			Name:         req.Name,
			Email:        req.Email,
			Password:     req.Password,
			RoleID:       req.RoleID,
			RestaurantID: restaurantID,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}

		response := createUserResponse{
			UserID:       user.UserID,
			Name:         user.Name,
			Email:        user.Email,
			RoleID:       user.RoleID,
			RestaurantID: user.RestaurantID,
		}

		c.JSON(http.StatusCreated, response)
	}
}

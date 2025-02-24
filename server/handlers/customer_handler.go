package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
)

type customerReq struct {
	Name         string `json:"name" binding:"required"`
	Email        string `json:"email" binding:"required,email"`
	Phone        string `json:"phone" binding:"required"`
	RestaurantID int32  `json:"restaurant_id" binding:"required"`
}

func CreateCustomer(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req customerReq
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		restaurantIDInt32 := req.RestaurantID
		customer, err := store.CreateCustomer(c, db.CreateCustomerParams{
			RestaurantID: restaurantIDInt32,
			Name:         req.Name,
			Email: pgtype.Text{
				String: req.Email,
				Valid:  true,
			},
			Phone: pgtype.Text{
				String: req.Phone,
				Valid:  true,
			},
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create customer"})
			return
		}

		c.JSON(http.StatusOK, customer)
	}
}

// Get all the customers of a restaurant
// After your existing imports and code...

type listCustomersRequest struct {
	RestaurantID int32 `uri:"restaurant_id" binding:"required"`
}

func ListCustomers(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req listCustomersRequest
		if err := c.ShouldBindUri(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		customers, err := store.ListCustomersByRestaurant(c, req.RestaurantID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to list customers"})
			return
		}

		c.JSON(http.StatusOK, customers)
	}
}

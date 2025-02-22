package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
)

type createOrderRequest struct {
	CustomerID   int32           `json:"customer_id" binding:"required"`
	RestaurantID int32           `json:"restaurant_id" binding:"required"`
	Status       string          `json:"status"` // optional; defaults to "pending" if empty
	OrderDetails json.RawMessage `json:"order_details" binding:"required"`
}

type getOrderRequest struct {
	OrderID int32 `json:"order_id" binding:"required"`
}

type listOrdersRequest struct {
	CustomerID int32 `json:"customer_id" binding:"required"`
}

type updateOrderStatusRequest struct {
	OrderID int32  `json:"order_id" binding:"required"`
	Status  string `json:"status" binding:"required"`
}

func CreateOrder(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req createOrderRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if req.Status == "" {
			req.Status = "pending"
		}
		order, err := store.CreateOrder(c, db.CreateOrderParams{
			CustomerID:   req.CustomerID,
			RestaurantID: req.RestaurantID,
			Status:       req.Status,
			OrderDetails: req.OrderDetails,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
			return
		}
		c.JSON(http.StatusOK, order)
	}
}

func GetOrder(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req getOrderRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		order, err := store.GetOrderByID(c, req.OrderID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get order"})
			return
		}
		c.JSON(http.StatusOK, order)
	}
}

func ListOrders(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req listOrdersRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		orders, err := store.ListOrdersByCustomer(c, req.CustomerID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to list orders"})
			return
		}
		c.JSON(http.StatusOK, orders)
	}
}

func UpdateOrderStatus(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req updateOrderStatusRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		err := store.UpdateOrderStatus(c, db.UpdateOrderStatusParams{
			Status:  req.Status,
			OrderID: req.OrderID,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update order status"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Order status updated successfully"})
	}
}

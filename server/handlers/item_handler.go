package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
)

type createItemRequest struct {
	RestaurantID int32  `json:"restaurant_id" binding:"required"`
	Name         string `json:"name" binding:"required"`
	Description  string `json:"description"`
	Price        string `json:"price" binding:"required"`
	IsAvailable  *bool  `json:"is_available"`
}

type updateItemRequest struct {
	ItemID      int32  `json:"item_id" binding:"required"`
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
	Price       string `json:"price" binding:"required"`
	IsAvailable *bool  `json:"is_available"`
}

func CreateItem(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req createItemRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		isAvailable := true
		if req.IsAvailable != nil {
			isAvailable = *req.IsAvailable
		}

		// Create a new Numeric value from the price string
		var price pgtype.Numeric
		if err := price.Scan(req.Price); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid price format"})
			return
		}

		item, err := store.CreateItem(c, db.CreateItemParams{
			RestaurantID: req.RestaurantID,
			Name:         req.Name,
			Description: pgtype.Text{
				String: req.Description,
				Valid:  req.Description != "",
			},
			Price: price,
			IsAvailable: pgtype.Bool{
				Bool:  isAvailable,
				Valid: true,
			},
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create item"})
			return
		}

		c.JSON(http.StatusOK, item)
	}
}

func GetItem(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		if id == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Item ID is required"})
			return
		}

		var itemID int32
		if _, err := fmt.Sscan(id, &itemID); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid item ID format"})
			return
		}

		item, err := store.GetItemByID(c, itemID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get item"})
			return
		}

		c.JSON(http.StatusOK, item)
	}
}

func ListItems(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		restaurantID := c.Param("restaurant_id")
		if restaurantID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Restaurant ID is required"})
			return
		}

		var restID int32
		if _, err := fmt.Sscan(restaurantID, &restID); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid restaurant ID format"})
			return
		}

		items, err := store.ListItemsByRestaurant(c, restID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to list items"})
			return
		}

		c.JSON(http.StatusOK, items)
	}
}

func UpdateItem(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req updateItemRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		isAvailable := true
		if req.IsAvailable != nil {
			isAvailable = *req.IsAvailable
		}

		// Create a new Numeric value from the price string
		var price pgtype.Numeric
		if err := price.Scan(req.Price); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid price format"})
			return
		}

		item, err := store.UpdateItem(c, db.UpdateItemParams{
			ItemID: req.ItemID,
			Name:   req.Name,
			Description: pgtype.Text{
				String: req.Description,
				Valid:  req.Description != "",
			},
			Price: price,
			IsAvailable: pgtype.Bool{
				Bool:  isAvailable,
				Valid: true,
			},
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update item"})
			return
		}

		c.JSON(http.StatusOK, item)
	}
}

func DeleteItem(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		if id == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Item ID is required"})
			return
		}

		var itemID int32
		if _, err := fmt.Sscan(id, &itemID); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid item ID format"})
			return
		}

		if err := store.DeleteItem(c, itemID); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete item"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Item deleted successfully"})
	}
}

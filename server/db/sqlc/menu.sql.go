// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0
// source: menu.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createMenuItem = `-- name: CreateMenuItem :one
INSERT INTO menu (restaurant_id, name, description, price, is_available)
VALUES ($1, $2, $3, $4, $5)
RETURNING menu_id, restaurant_id, name, description, price, is_available, created_at
`

type CreateMenuItemParams struct {
	RestaurantID int32
	Name         string
	Description  pgtype.Text
	Price        pgtype.Numeric
	IsAvailable  pgtype.Bool
}

func (q *Queries) CreateMenuItem(ctx context.Context, arg CreateMenuItemParams) (Menu, error) {
	row := q.db.QueryRow(ctx, createMenuItem,
		arg.RestaurantID,
		arg.Name,
		arg.Description,
		arg.Price,
		arg.IsAvailable,
	)
	var i Menu
	err := row.Scan(
		&i.MenuID,
		&i.RestaurantID,
		&i.Name,
		&i.Description,
		&i.Price,
		&i.IsAvailable,
		&i.CreatedAt,
	)
	return i, err
}

const createOrder = `-- name: CreateOrder :one
INSERT INTO orders (customer_id, restaurant_id, status, order_details)
VALUES ($1, $2, $3, $4)
RETURNING order_id, customer_id, restaurant_id, status, order_details, created_at
`

type CreateOrderParams struct {
	CustomerID   int32
	RestaurantID int32
	Status       string
	OrderDetails []byte
}

func (q *Queries) CreateOrder(ctx context.Context, arg CreateOrderParams) (Order, error) {
	row := q.db.QueryRow(ctx, createOrder,
		arg.CustomerID,
		arg.RestaurantID,
		arg.Status,
		arg.OrderDetails,
	)
	var i Order
	err := row.Scan(
		&i.OrderID,
		&i.CustomerID,
		&i.RestaurantID,
		&i.Status,
		&i.OrderDetails,
		&i.CreatedAt,
	)
	return i, err
}

const getMenuItemByID = `-- name: GetMenuItemByID :one
SELECT menu_id, restaurant_id, name, description, price, is_available, created_at
FROM menu
WHERE menu_id = $1
`

func (q *Queries) GetMenuItemByID(ctx context.Context, menuID int32) (Menu, error) {
	row := q.db.QueryRow(ctx, getMenuItemByID, menuID)
	var i Menu
	err := row.Scan(
		&i.MenuID,
		&i.RestaurantID,
		&i.Name,
		&i.Description,
		&i.Price,
		&i.IsAvailable,
		&i.CreatedAt,
	)
	return i, err
}

const getOrderByID = `-- name: GetOrderByID :one
SELECT order_id, customer_id, restaurant_id, status, order_details, created_at
FROM orders
WHERE order_id = $1
`

func (q *Queries) GetOrderByID(ctx context.Context, orderID int32) (Order, error) {
	row := q.db.QueryRow(ctx, getOrderByID, orderID)
	var i Order
	err := row.Scan(
		&i.OrderID,
		&i.CustomerID,
		&i.RestaurantID,
		&i.Status,
		&i.OrderDetails,
		&i.CreatedAt,
	)
	return i, err
}

const listMenuItemsByRestaurant = `-- name: ListMenuItemsByRestaurant :many
SELECT menu_id, restaurant_id, name, description, price, is_available, created_at
FROM menu
WHERE restaurant_id = $1
ORDER BY created_at DESC
`

func (q *Queries) ListMenuItemsByRestaurant(ctx context.Context, restaurantID int32) ([]Menu, error) {
	rows, err := q.db.Query(ctx, listMenuItemsByRestaurant, restaurantID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Menu
	for rows.Next() {
		var i Menu
		if err := rows.Scan(
			&i.MenuID,
			&i.RestaurantID,
			&i.Name,
			&i.Description,
			&i.Price,
			&i.IsAvailable,
			&i.CreatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listOrdersByCustomer = `-- name: ListOrdersByCustomer :many
SELECT order_id, customer_id, restaurant_id, status, order_details, created_at
FROM orders
WHERE customer_id = $1
ORDER BY created_at DESC
`

func (q *Queries) ListOrdersByCustomer(ctx context.Context, customerID int32) ([]Order, error) {
	rows, err := q.db.Query(ctx, listOrdersByCustomer, customerID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Order
	for rows.Next() {
		var i Order
		if err := rows.Scan(
			&i.OrderID,
			&i.CustomerID,
			&i.RestaurantID,
			&i.Status,
			&i.OrderDetails,
			&i.CreatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateOrderStatus = `-- name: UpdateOrderStatus :exec
UPDATE orders
SET status = $1
WHERE order_id = $2
`

type UpdateOrderStatusParams struct {
	Status  string
	OrderID int32
}

func (q *Queries) UpdateOrderStatus(ctx context.Context, arg UpdateOrderStatusParams) error {
	_, err := q.db.Exec(ctx, updateOrderStatus, arg.Status, arg.OrderID)
	return err
}

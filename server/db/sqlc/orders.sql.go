// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0
// source: orders.sql

package db

import (
	"context"
)

const getOrdersByCustomer = `-- name: GetOrdersByCustomer :many
SELECT order_id, customer_id, restaurant_id, status, order_details, created_at FROM orders WHERE customer_id = $1 ORDER BY created_at DESC
`

func (q *Queries) GetOrdersByCustomer(ctx context.Context, customerID int32) ([]Order, error) {
	rows, err := q.db.Query(ctx, getOrdersByCustomer, customerID)
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

const getOrdersByRestaurant = `-- name: GetOrdersByRestaurant :many
SELECT order_id, customer_id, restaurant_id, status, order_details, created_at FROM orders WHERE restaurant_id = $1 ORDER BY created_at DESC
`

func (q *Queries) GetOrdersByRestaurant(ctx context.Context, restaurantID int32) ([]Order, error) {
	rows, err := q.db.Query(ctx, getOrdersByRestaurant, restaurantID)
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

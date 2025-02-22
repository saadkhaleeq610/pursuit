
-- name: CreateMenuItem :one
INSERT INTO menu (restaurant_id, name, description, price, is_available)
VALUES ($1, $2, $3, $4, $5)
RETURNING menu_id, restaurant_id, name, description, price, is_available, created_at;

-- name: GetMenuItemByID :one
SELECT menu_id, restaurant_id, name, description, price, is_available, created_at
FROM menu
WHERE menu_id = $1;

-- name: ListMenuItemsByRestaurant :many
SELECT menu_id, restaurant_id, name, description, price, is_available, created_at
FROM menu
WHERE restaurant_id = $1
ORDER BY created_at DESC;




-- name: CreateOrder :one
INSERT INTO orders (customer_id, restaurant_id, status, order_details)
VALUES ($1, $2, $3, $4)
RETURNING order_id, customer_id, restaurant_id, status, order_details, created_at;

-- name: GetOrderByID :one
SELECT order_id, customer_id, restaurant_id, status, order_details, created_at
FROM orders
WHERE order_id = $1;

-- name: ListOrdersByCustomer :many
SELECT order_id, customer_id, restaurant_id, status, order_details, created_at
FROM orders
WHERE customer_id = $1
ORDER BY created_at DESC;

-- name: UpdateOrderStatus :exec
UPDATE orders
SET status = $1
WHERE order_id = $2;
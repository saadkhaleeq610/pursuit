-- name: CreateCustomer :one
INSERT INTO customers (restaurant_id, name, email, phone)
VALUES ($1, $2, $3, $4)
RETURNING customer_id, restaurant_id, name, email, phone, created_at;

-- name: GetCustomerByID :one
SELECT customer_id, restaurant_id, name, email, phone, created_at
FROM customers
WHERE customer_id = $1;

-- name: ListCustomersByRestaurant :many
SELECT customer_id, restaurant_id, name, email, phone, created_at
FROM customers
WHERE restaurant_id = $1
ORDER BY created_at DESC;

-- name: UpdateCustomer :exec
UPDATE customers
SET name = $1,
    email = $2,
    phone = $3
WHERE customer_id = $4;

-- name: DeleteCustomer :exec
DELETE FROM customers
WHERE customer_id = $1;
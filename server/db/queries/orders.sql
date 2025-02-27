-- name: GetOrdersByRestaurant :many
SELECT * FROM orders WHERE restaurant_id = $1 ORDER BY created_at DESC;


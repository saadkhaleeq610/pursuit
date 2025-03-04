-- name: CreateRestaurant :one
INSERT INTO restaurants (
    name,
    address,
    phone_number,
    owner_id
) VALUES (
    $1, $2, $3, $4
) RETURNING *;

-- name: GetRestaurantName :one
SELECT name FROM restaurants WHERE restaurant_id = $1;

-- name: GetRestaurantDetails :one
SELECT * FROM restaurants WHERE restaurant_id = $1;
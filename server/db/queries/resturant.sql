-- name: CreateRestaurant :one
INSERT INTO restaurants (
    name,
    address,
    phone_number,
    owner_id
) VALUES (
    $1, $2, $3, $4
) RETURNING *;

-- name: CreateUser :one
INSERT INTO users (
    name,
    email,
    password,
    role_id,
    restaurant_id
) VALUES (
    $1, $2, $3, $4, $5
) RETURNING *;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1;

-- name: GetUserById :one
SELECT * FROM users
WHERE user_id = $1;
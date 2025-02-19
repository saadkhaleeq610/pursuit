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
SELECT 
    u.user_id, 
    u.name, 
    u.email, 
    u.password, 
    u.role_id, 
    r.role_name,  
    u.restaurant_id
FROM users u
JOIN roles r ON u.role_id = r.role_id
WHERE u.email = $1;


-- name: GetUserById :one
SELECT * FROM users
WHERE user_id = $1;

-- name: UpdateUserRestaurantID :exec
UPDATE users
SET restaurant_id = $2
WHERE user_id = $1;
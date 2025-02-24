-- name: CreateItem :one
INSERT INTO items (restaurant_id, name, description, price, is_available)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetItemByID :one
SELECT * FROM items
WHERE item_id = $1;

-- name: ListItemsByRestaurant :many
SELECT * FROM items
WHERE restaurant_id = $1
ORDER BY created_at DESC;

-- name: UpdateItem :one
UPDATE items
SET name = $2,
    description = $3,
    price = $4,
    is_available = $5
WHERE item_id = $1
RETURNING *;

-- name: DeleteItem :exec
DELETE FROM items
WHERE item_id = $1;
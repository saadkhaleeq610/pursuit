-- name: StoreRefreshToken :exec
INSERT INTO user_tokens (user_id, refresh_token, expires_at)
VALUES ($1, $2, $3)
RETURNING *;

-- name: DeleteRefreshToken :exec
DELETE FROM user_tokens WHERE refresh_token = $1;
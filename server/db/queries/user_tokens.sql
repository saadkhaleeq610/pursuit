-- name: StoreRefreshToken :exec
INSERT INTO user_tokens (user_id, refresh_token, expires_at)
VALUES ($1, $2, $3)
RETURNING *;
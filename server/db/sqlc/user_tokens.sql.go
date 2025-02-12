// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0
// source: user_tokens.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const deleteRefreshToken = `-- name: DeleteRefreshToken :exec
DELETE FROM user_tokens WHERE refresh_token = $1
`

func (q *Queries) DeleteRefreshToken(ctx context.Context, refreshToken string) error {
	_, err := q.db.Exec(ctx, deleteRefreshToken, refreshToken)
	return err
}

const getRefreshTokenByToken = `-- name: GetRefreshTokenByToken :one
SELECT token_id, user_id, refresh_token, expires_at, created_at FROM user_tokens
WHERE refresh_token = $1
`

func (q *Queries) GetRefreshTokenByToken(ctx context.Context, refreshToken string) (UserToken, error) {
	row := q.db.QueryRow(ctx, getRefreshTokenByToken, refreshToken)
	var i UserToken
	err := row.Scan(
		&i.TokenID,
		&i.UserID,
		&i.RefreshToken,
		&i.ExpiresAt,
		&i.CreatedAt,
	)
	return i, err
}

const storeRefreshToken = `-- name: StoreRefreshToken :exec
INSERT INTO user_tokens (user_id, refresh_token, expires_at)
VALUES ($1, $2, $3)
RETURNING token_id, user_id, refresh_token, expires_at, created_at
`

type StoreRefreshTokenParams struct {
	UserID       int32
	RefreshToken string
	ExpiresAt    pgtype.Timestamp
}

func (q *Queries) StoreRefreshToken(ctx context.Context, arg StoreRefreshTokenParams) error {
	_, err := q.db.Exec(ctx, storeRefreshToken, arg.UserID, arg.RefreshToken, arg.ExpiresAt)
	return err
}

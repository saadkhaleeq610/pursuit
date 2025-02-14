// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0
// source: users.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users (
    name,
    email,
    password,
    role_id,
    restaurant_id
) VALUES (
    $1, $2, $3, $4, $5
) RETURNING user_id, name, email, password, role_id, restaurant_id
`

type CreateUserParams struct {
	Name         string
	Email        string
	Password     string
	RoleID       int32
	RestaurantID pgtype.Int4
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRow(ctx, createUser,
		arg.Name,
		arg.Email,
		arg.Password,
		arg.RoleID,
		arg.RestaurantID,
	)
	var i User
	err := row.Scan(
		&i.UserID,
		&i.Name,
		&i.Email,
		&i.Password,
		&i.RoleID,
		&i.RestaurantID,
	)
	return i, err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT user_id, name, email, password, role_id, restaurant_id FROM users
WHERE email = $1
`

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (User, error) {
	row := q.db.QueryRow(ctx, getUserByEmail, email)
	var i User
	err := row.Scan(
		&i.UserID,
		&i.Name,
		&i.Email,
		&i.Password,
		&i.RoleID,
		&i.RestaurantID,
	)
	return i, err
}

const getUserById = `-- name: GetUserById :one
SELECT user_id, name, email, password, role_id, restaurant_id FROM users
WHERE user_id = $1
`

func (q *Queries) GetUserById(ctx context.Context, userID int32) (User, error) {
	row := q.db.QueryRow(ctx, getUserById, userID)
	var i User
	err := row.Scan(
		&i.UserID,
		&i.Name,
		&i.Email,
		&i.Password,
		&i.RoleID,
		&i.RestaurantID,
	)
	return i, err
}

const updateUserRestaurantID = `-- name: UpdateUserRestaurantID :exec
UPDATE users
SET restaurant_id = $2
WHERE user_id = $1
`

type UpdateUserRestaurantIDParams struct {
	UserID       int32
	RestaurantID pgtype.Int4
}

func (q *Queries) UpdateUserRestaurantID(ctx context.Context, arg UpdateUserRestaurantIDParams) error {
	_, err := q.db.Exec(ctx, updateUserRestaurantID, arg.UserID, arg.RestaurantID)
	return err
}

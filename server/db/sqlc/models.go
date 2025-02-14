// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0

package db

import (
	"github.com/jackc/pgx/v5/pgtype"
)

type Invite struct {
	ID           int32
	Email        string
	RoleID       int32
	RestaurantID int32
	CreatedAt    pgtype.Timestamp
}

type Permission struct {
	PermissionID   int32
	PermissionName string
}

type Restaurant struct {
	RestaurantID int32
	Name         string
	Address      string
	PhoneNumber  string
	OwnerID      int32
}

type Role struct {
	RoleID   int32
	RoleName string
}

type RolePermission struct {
	RoleID       int32
	PermissionID int32
}

type User struct {
	UserID       int32
	Name         string
	Email        string
	Password     string
	RoleID       int32
	RestaurantID pgtype.Int4
}

type UserToken struct {
	TokenID      int32
	UserID       int32
	RefreshToken string
	ExpiresAt    pgtype.Timestamp
	CreatedAt    pgtype.Timestamp
}

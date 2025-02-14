package handlers

type inviteRequest struct {
	Email        string `json:"email" binding: "required"`
	RoleID       int32  `json:"role_id" binding:"required"`
	RestaurantID *int32 `json:"restaurant_id binding "required"`
}

func InviteUserHandler() {

}

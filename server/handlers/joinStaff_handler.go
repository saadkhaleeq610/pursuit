package handlers

type joinRestaurantStaffReq struct {
	Name     string `json:"email" binding: "required"`
	Password string `json:"role_id" binding:"required"`
}

func 
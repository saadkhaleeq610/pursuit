package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	db "github.com/saadkhaleeq610/pursuit/server/db/sqlc"
)

func LogoutHandler(store *db.Queries) gin.HandlerFunc {
	return func(c *gin.Context) {
		refreshToken, err := c.Cookie("refresh_token")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Refresh token not found"})
		}

		err = store.DeleteRefreshToken(c, refreshToken)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.SetCookie("refresh_token", "", -1, "/", "", false, true)

		c.JSON(http.StatusOK, gin.H{"message": "Successfully Logged out"})
	}
}

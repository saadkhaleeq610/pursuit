-- name: InviteUser :exec
INSERT INTO invite (email, role_id, restaurant_id) 
VALUES ($1, $2, $3);

-- name: CheckInvite :one
SELECT email, role_id, restaurant_id FROM invite 
WHERE email = $1;

-- name: DeleteInvite :exec
DELETE FROM invite WHERE email = $1;

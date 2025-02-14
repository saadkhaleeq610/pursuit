-- +goose Up
-- +goose StatementBegin
CREATE TABLE invite (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS invite;
-- +goose StatementEnd

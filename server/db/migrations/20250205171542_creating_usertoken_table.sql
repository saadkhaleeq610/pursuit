-- +goose Up
-- +goose StatementBegin
CREATE TABLE user_tokens (
    token_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    refresh_token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- +goose StatementEnd

s
-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS user_tokens;
-- +goose StatementEnd

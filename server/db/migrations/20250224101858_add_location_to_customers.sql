-- +goose Up
-- +goose StatementBegin
ALTER TABLE customers
ADD COLUMN location TEXT;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE customers
DROP COLUMN location;
-- +goose StatementEnd
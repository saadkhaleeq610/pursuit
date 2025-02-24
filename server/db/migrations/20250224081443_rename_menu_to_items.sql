-- +goose Up
-- +goose StatementBegin

-- First, drop existing foreign key constraints that might reference the menu table
ALTER TABLE IF EXISTS orders
DROP CONSTRAINT IF EXISTS orders_menu_id_fkey;

-- Rename the table
ALTER TABLE menu RENAME TO items;

-- Rename the primary key column
ALTER TABLE items RENAME COLUMN menu_id TO item_id;

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
-- Revert the changes in reverse order
ALTER TABLE items RENAME COLUMN item_id TO menu_id;
ALTER TABLE items RENAME TO menu;

-- Recreate any foreign key constraints if needed
-- +goose StatementEnd
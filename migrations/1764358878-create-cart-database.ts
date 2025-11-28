import type { MigrationBuilder } from "npm:node-pg-migrate";

exports.up = (pgm: MigrationBuilder) => {
  pgm.createTable("cart", {
    id: "id",
    cart_items: { type: "json", notNull: true },
    date_created: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm: MigrationBuilder) => {
  pgm.dropTable("cart");
};

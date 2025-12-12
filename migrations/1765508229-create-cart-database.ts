import type { MigrationBuilder } from "node-pg-migrate";

const up = (pgm: MigrationBuilder) => {
  pgm.createExtension("uuid-ossp", {
    ifNotExists: true,
  });
  pgm.createTable("cart", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    cart_items: { type: "jsonb", notNull: true },
    date_created: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

const down = (pgm: MigrationBuilder) => {
  pgm.dropTable("cart");
  pgm.dropExtension("uuid-ossp");
};

export { down, up };

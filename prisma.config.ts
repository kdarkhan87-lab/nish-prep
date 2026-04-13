import path from "node:path";
import { defineConfig } from "prisma/config";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: isProduction
      ? process.env.DATABASE_URL!
      : "file:" + path.join(__dirname, "prisma", "dev.db"),
  },
});

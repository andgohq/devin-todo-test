import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Todo } from "../models/Todo";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "todo_db",
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: [User, Todo],
  subscribers: [],
  migrations: [],
});

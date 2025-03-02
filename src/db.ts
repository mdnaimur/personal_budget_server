import "reflect-metadata";

import { DataSource } from "typeorm";
import { Budget } from "./models/Budget";
import { Category } from "./models/Category";
import { CategoryBudget } from "./models/CategoryBudget";
import { Transaction } from "./models/Transaction";
import { User } from "./models/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "personalBudget",
    synchronize: true,
    logging: false,
    entities: [User,Transaction,Budget,CategoryBudget,Category],

});

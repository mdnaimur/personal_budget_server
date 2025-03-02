import { IsDate, IsDecimal } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { getInvalidMessage } from "../helper/validation-messages";
import { CategoryBudget } from "./CategoryBudget";
import ExtendedBaseEntity from "./extended-base-entity";
import { User } from "./User";

@Entity()
export class Transaction extends ExtendedBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDecimal(undefined,{
        message:getInvalidMessage('Amount')
    })
    amount: number;

    @Column()
    @IsDate({message:getInvalidMessage('Date')})
    date: Date;

    @ManyToOne(() => CategoryBudget, (categoryBudget) => categoryBudget.transations)
    categoryBudget: CategoryBudget

    @ManyToOne(() => User, (user) => user.transactions)
    user: User;

   
}

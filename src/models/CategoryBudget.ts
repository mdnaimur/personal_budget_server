import { IsDecimal, validateOrReject } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { getInvalidMessage } from "../helper/validation-messages";
import { Budget } from "./Budget";
import { Category } from "./Category";
import ExtendedBaseEntity from "./extended-base-entity";
import { Transaction } from "./Transaction";

@Entity()
export class CategoryBudget extends ExtendedBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

 
   @Column()
   @IsDecimal(undefined,{
        message:getInvalidMessage('Amount')
    })
    amount: number;


    @ManyToOne(() => Category, (category) => category.categoryBudgets)
    category: Category

    @ManyToOne(() => Budget, (budget) => budget.categoryBudgets)
    budget: Budget

    @OneToMany(() => Transaction, (transation) => transation.categoryBudget)
    transations: Transaction[]

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
            await validateOrReject(this);
        }
   
}

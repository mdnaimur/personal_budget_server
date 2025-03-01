import { IsDate, IsDecimal, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { getInvalidMessage } from "../helper/validation-messages";
import { CategoryBudget } from "./CategoryBudget";

@Entity()
export class Transaction extends BaseEntity {

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

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
            await validateOrReject(this);
        }
   
}

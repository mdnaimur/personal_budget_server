import { IsDate, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { getInvalidMessage } from "../helper/validation-messages";
import { CategoryBudget } from "./CategoryBudget";

@Entity()
export class Budget extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

 
    @Column()
    @IsDate({message:getInvalidMessage('Month')})
    month: Date;

    @OneToMany(() => CategoryBudget, (categoryBudget) => categoryBudget.budget)
    categoryBudgets: CategoryBudget[]
    
    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
            await validateOrReject(this);
        }
   
}

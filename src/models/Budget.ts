import { IsDate } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { getInvalidMessage } from "../helper/validation-messages";
import { CategoryBudget } from "./CategoryBudget";
import ExtendedBaseEntity from "./extended-base-entity";
import { User } from "./User";

@Entity()
export class Budget extends ExtendedBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

 
    @Column()
    @IsDate({message:getInvalidMessage('Month')})
    month: Date;

    @OneToMany(() => CategoryBudget, (categoryBudget) => categoryBudget.budget)
    categoryBudgets: CategoryBudget[]
    
    @ManyToOne(() => User, (user) => user.budgets)
    user: User;
   
}

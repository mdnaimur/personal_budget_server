import { IsDecimal, IsEnum, Length, validateOrReject } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { getInvalidMessage } from "../helper/validation-messages";
import { CategoryBudget } from "./CategoryBudget";
import ExtendedBaseEntity from "./extended-base-entity";
import { User } from "./User";

export enum CategoryType {
    INCOME = 0,
    EXPENSE = 1,
    SAVING = 2,
    DEBT = 3
}


@Entity()
export class Category  extends ExtendedBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'enum',
        enum: CategoryType,
        default:CategoryType.INCOME
    })
    @IsEnum(CategoryType,{
        message:getInvalidMessage("Category Type")
    })
    type: CategoryType;

    @Column()
    @Length(3,50,{message:getInvalidMessage('Title')})
    title: string;

    @Column()
    @IsDecimal(undefined,{
            message:getInvalidMessage('Accumulated Amount')
        })
        accAmount: number;

    @ManyToOne(() => User, (user) => user.categories)
    user: User;

    @OneToMany(() => CategoryBudget, (categoryBudget) => categoryBudget.category)
    categoryBudgets: CategoryBudget[]


    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }

}

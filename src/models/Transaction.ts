import { IsDate, IsDecimal, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { getInvalidMessage } from "../helper/validation-messages";

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

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
            await validateOrReject(this);
        }
   
}

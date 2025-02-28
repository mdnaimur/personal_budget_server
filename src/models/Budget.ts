import { IsDate, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { getInvalidMessage } from "../helper/validation-messages";

@Entity()
export class Budget extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

 
    @Column()
    @IsDate({message:getInvalidMessage('Month')})
    month: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
            await validateOrReject(this);
        }
   
}

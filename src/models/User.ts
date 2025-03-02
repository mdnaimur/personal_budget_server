import * as bcrypt from 'bcrypt';

import { IsEmail, IsOptional, Length, Matches, MaxLength, validateOrReject } from "class-validator";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

import { getInvalidMessage } from "../helper/validation-messages";
import { Budget } from './Budget';
import { Category } from './Category';
import ExtendedBaseEntity from './extended-base-entity';
import { Transaction } from './Transaction';

@Entity()
@Unique(['email'])
export class User extends ExtendedBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail(undefined, { message: getInvalidMessage('Email') })
    email: string;

    @Column()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: `${getInvalidMessage("Password")}. User password must have at least 8 characters, including letters and digits.` })
    password: string;

    @Column()
    @Length(1, 50, { message: getInvalidMessage('First Name') })
    firstName: string;

    @Column()
    @Length(1, 50, { message: getInvalidMessage('Last Name') })
    lastName: string;

    @Column({ default: 'USD' })
    @MaxLength(3, { message: getInvalidMessage('Currency') })
    @IsOptional()
    currency: string;

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[]

    @OneToMany(() => Budget, (budget) => budget.user)
    budgets: Budget[];
  
    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[]

    private previousPassword: string;

    @AfterLoad()
    cachePreviousPassword() {
        this.previousPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.previousPassword === this.password) return;
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }

    async isPasswordValid(inputPassword:string):Promise<boolean>{
        return await bcrypt.compare(inputPassword,this.password);
    }
}

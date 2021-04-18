/*

- User table for sqlite -
loginTime is unix timestamp of last login, used for determining the success percentage of the current session
(using the timestamps provided in attempts)

*/

import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import Attempt from "./attempt";
import bcrypt from "bcrypt";

@Entity()
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Attempt, attempt => attempt.user)
    attempts: Attempt[];

    /*
     * compare current user password with input
     * @return promise<boolean>
     */
    async validatePassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }
}

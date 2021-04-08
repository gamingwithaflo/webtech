import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import Attempt from "./attempt";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
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
     * @return boolean
     */
    comparePassword(password: string) {
        return this.password === password;
    }
}

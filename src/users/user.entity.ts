import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'users'})

export class  User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'datetime'  , default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
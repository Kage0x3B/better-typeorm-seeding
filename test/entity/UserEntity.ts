import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from 'typeorm';
import { PetEntity } from './PetEntity';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest'
}

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({
        select: false,
        unique: true
    })
    public email!: string;

    @Column({
        select: false
    })
    public password?: string;

    @Column({
        nullable: true
    })
    public firstName?: string;

    @Column({
        nullable: true
    })
    public lastName?: string;

    @Column({
        nullable: true
    })
    public address?: string;

    @Column('simple-enum', {
        enum: UserRole,
        default: UserRole.GUEST
    })
    public role!: UserRole;

    @CreateDateColumn()
    createdAt!: Date;

    @DeleteDateColumn()
    public deletedAt?: Date;

    @OneToMany(() => PetEntity, (pet) => pet.user)
    public pets?: PetEntity[];

    constructor(data: Partial<UserEntity> = {}) {
        super();

        Object.assign(this, data);
    }
}

import {
    BaseEntity,
    Column,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from './UserEntity';

export enum AnimalType {
    BEAR = 'bear',
    BIRD = 'bird',
    CAT = 'cat',
    DOG = 'dog',
    SNAKE = 'snake'
}

@Entity()
export class PetEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column('simple-enum', {
        enum: AnimalType
    })
    public type!: AnimalType;

    @Column()
    public species!: string;

    @ManyToOne(() => UserEntity, (user) => user.pets)
    public user?: UserEntity;

    @DeleteDateColumn()
    public deletedAt?: Date;

    constructor(data: Partial<PetEntity> = {}) {
        super();

        Object.assign(this, data);
    }
}

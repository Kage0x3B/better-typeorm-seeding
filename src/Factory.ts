import { Constructable } from './util';
import { faker, Faker } from '@faker-js/faker';
import { EntityData } from './util/EntityData';
import { EntityManager, getConnection, SaveOptions } from 'typeorm';

export abstract class Factory<T> {
    abstract readonly model: Constructable<T>;
    private readonly em: EntityManager;

    constructor(em?: EntityManager) {
        this.em = em ?? getConnection().createEntityManager();
    }

    protected abstract definition(faker: Faker): T | EntityData<T>;

    public makeOne(overrideParameters: EntityData<T> = {}): T {
        const entityDefinition = this.definition(faker);
        let entity: T;
        let entityAttributes: EntityData<T> = {};

        if (entityDefinition instanceof this.model) {
            entity = entityDefinition;

            entityAttributes = overrideParameters;
        } else {
            // Constructor can be empty or accept attributes as the first argument to calculate some derived attributes.
            // The attributes still get overwritten below by Object.assign()
            entity = new this.model(entityAttributes);

            entityAttributes = {
                ...this.definition(faker),
                ...overrideParameters
            };
        }

        Object.assign(entity, entityAttributes);

        return entity;
    }

    public make(amount: number, overrideParameters?: EntityData<T>): T[] {
        return Array.from({ length: amount }, () => this.makeOne(overrideParameters));
    }

    public createOne(overrideParameters?: EntityData<T>, options?: SaveOptions): Promise<T> {
        const entity = this.makeOne(overrideParameters);

        return this.em.save(entity, options);
    }

    public create(amount: number, overrideParameters?: EntityData<T>, options?: SaveOptions): Promise<T[]> {
        const entities = this.make(amount, overrideParameters);

        return this.em.save(entities, options);
    }
}

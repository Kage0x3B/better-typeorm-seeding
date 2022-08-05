import { UserFactory } from './exampleModels/UserFactory';
import { UserModel, UserRole } from './exampleModels/UserModel';
import { Connection, createConnection } from 'typeorm';
import { PetModel } from './exampleModels/PetModel';

let connection: Connection;

beforeAll(async () => {
    connection = await createConnection({
        type: 'sqlite',
        name: 'memory',
        database: ':memory:',
        entities: [UserModel, PetModel]
    });
});

describe('Entity Factory', () => {
    test('should generate one random user', () => {
        const entity = new UserFactory(connection.createEntityManager()).makeOne();

        expect(entity).toBeInstanceOf(UserModel);
        expect(entity).toMatchObject({
            email: expect.stringContaining('@'),
            firstName: expect.any(String),
            lastName: expect.any(String)
        });
    });

    test('should generate one user with a fixed firstName and role', () => {
        const entity = new UserFactory(connection.createEntityManager()).makeOne({
            firstName: 'Gertrud',
            role: UserRole.ADMIN
        });

        expect(entity).toMatchObject({
            email: expect.stringContaining('@'),
            firstName: 'Gertrud',
            lastName: expect.any(String),
            role: UserRole.ADMIN
        });
    });

    test('should generate multiple random users', () => {
        const entities = new UserFactory(connection.createEntityManager()).make(5);

        expect(entities).toHaveLength(5);
        expect(entities[0]).toBeInstanceOf(UserModel);
        expect(entities[0]).toMatchObject({
            email: expect.stringContaining('@'),
            firstName: expect.any(String),
            lastName: expect.any(String)
        });
    });
});

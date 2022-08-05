import { Factory } from '../../src/Factory';
import { UserEntity, UserRole } from '../entity/UserEntity';
import { EntityData } from '../../src/util/EntityData';
import { Faker } from '@faker-js/faker';

export class UserFactory extends Factory<UserEntity> {
    model = UserEntity;

    protected definition(faker: Faker): EntityData<UserEntity> {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();

        return {
            email: faker.internet.email(firstName, lastName),
            firstName,
            lastName,
            address: faker.address.streetAddress(true),
            role: faker.helpers.objectValue(UserRole)
        };
    }
}

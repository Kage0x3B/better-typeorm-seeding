/**
 * Generic type for class definitions
 *
 * Example usage:
 * ```
 * function createSomeInstance(myClassDefinition: Constructable<MyClass>) {
 *   return new myClassDefinition()
 * }
 * ```
 */
import { Seeder } from '../Seeder';

export interface Constructable<T> extends Function {
    new (...args: any[]): T;
}

export interface SeederConstructor extends Function {
    new (): Seeder;
}

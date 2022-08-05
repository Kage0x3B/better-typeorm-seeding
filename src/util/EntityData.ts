// eslint-disable-next-line @typescript-eslint/ban-types
type ExcludeFunctions<T, K extends keyof T> = T[K] extends Function ? never : K extends symbol ? never : K;
type EntityDataItem<T> = T | null;

export type EntityData<T> = { [K in keyof T as ExcludeFunctions<T, K>]?: EntityDataItem<T[K]> };

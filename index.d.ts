/**
 * Shortcut for document.getElementById.
 * @param id The element id.
 * @returns The element or null.
 */
export declare const byId: (id: string) => HTMLElement;
/**
 * Waits till the document has loaded before running the main method.
 * @param main The main method.
 */
export declare const runSafe: (main: () => void) => void;
export declare const success: <T>(value: T) => Success<T>;
export declare const failure: <S>(value: S) => Failure<S>;
/**
 * Monad that acts as an inverse of rust's Result.
 */
export type Attempt<T, S> = Success<T> | Failure<S>;
export declare class Success<T> {
    value: T;
    constructor(value: T);
    unwrap(): T;
    /**
     * @param fn The function that would be applied to the attempt.
     * @returns This same success.
     */
    bind<S>(fn: (fallback: S) => Attempt<T, S>): Success<T>;
    /**
     * @param fn The function that would be applied to the attempt.
     * @returns This same success.
     */
    infer<S>(fn: (fallback: S) => T | Attempt<T, S> | null | undefined): Success<T>;
}
export declare class Failure<S> {
    value: S;
    constructor(value: S);
    unwrap(): S;
    /**
     * @param fn The function that will be applied to this failure.
     * @returns Another attempt.
     */
    bind<T>(fn: (fallback: S) => Attempt<T, S>): Attempt<T, S>;
    /**
     * @param fn The function that will be applied to this failure.
     * @returns Another attempt.
     */
    infer<T>(fn: (fallback: S) => T | Attempt<T, S> | null | undefined): Attempt<T, S>;
}
/**
 * @param value The potentially correct value.
 * @param fallback The fallback value.
 * @returns A Success or a Failure depending on the given arguments.
 */
export declare const attempt: <T, S>(value: T | Attempt<T, S> | null | undefined, fallback: S | Failure<S>) => Attempt<T, S>;

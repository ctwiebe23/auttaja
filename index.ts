/**
 * Shortcut for document.getElementById.
 * @param id The element id.
 * @returns The element or null.
 */
export const byId = (id: string) => document.getElementById(id)

/**
 * Waits till the document has loaded before running the main method.
 * @param main The main method.
 */
export const runSafe = (main: () => void) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main)
    } else {
        main()
    }
}

export const success = <T>(value: T) => new Success<T>(value)
export const failure = <S>(value: S) => new Failure<S>(value)

/**
 * Monad that acts as an inverse of rust's Result.
 */
export type Attempt<T, S> = Success<T> | Failure<S>

export class Success<T> {
    value: T

    constructor(value: T) {
        this.value = value
    }

    unwrap() {
        return this.value
    }

    /**
     * @param fn The function that would be applied to the attempt.
     * @returns This same success.
     */
    bind<S>(fn: (fallback: S) => Attempt<T, S>): Success<T> {
        return this
    }

    /**
     * @param fn The function that would be applied to the attempt.
     * @returns This same success.
     */
    infer<S>(
        fn: (fallback: S) => T | Attempt<T, S> | null | undefined,
    ): Success<T> {
        return this
    }
}

export class Failure<S> {
    value: S

    constructor(value: S) {
        this.value = value
    }

    unwrap() {
        return this.value
    }

    /**
     * @param fn The function that will be applied to this failure.
     * @returns Another attempt.
     */
    bind<T>(fn: (fallback: S) => Attempt<T, S>): Attempt<T, S> {
        return fn(this.value)
    }

    /**
     * @param fn The function that will be applied to this failure.
     * @returns Another attempt.
     */
    infer<T>(
        fn: (fallback: S) => T | Attempt<T, S> | null | undefined,
    ): Attempt<T, S> {
        return attempt(fn(this.value), this)
    }
}

/**
 * @param value The potentially correct value.
 * @param fallback The fallback value.
 * @returns A Success or a Failure depending on the given arguments.
 */
export const attempt = <T, S>(
    value: T | Attempt<T, S> | null | undefined,
    fallback: S | Failure<S>,
): Attempt<T, S> => {
    switch (true) {
        case value instanceof Success:
        case value instanceof Failure:
            return value

        case value === null:
        case value === undefined:
            return fallback instanceof Failure ? fallback : failure(fallback)

        default:
            return success(value)
    }
}

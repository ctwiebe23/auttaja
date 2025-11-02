/**
 * Shortcut for document.getElementById.
 * @param id The element id.
 * @returns The element or null.
 */
export const byId = (id) => document.getElementById(id);
/**
 * Waits till the document has loaded before running the main method.
 * @param main The main method.
 */
export const runSafe = (main) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    }
    else {
        main();
    }
};
export const success = (value) => new Success(value);
export const failure = (value) => new Failure(value);
export class Success {
    constructor(value) {
        this.value = value;
    }
    unwrap() {
        return this.value;
    }
    /**
     * @param fn The function that would be applied to the attempt.
     * @returns This same success.
     */
    bind(fn) {
        return this;
    }
    /**
     * @param fn The function that would be applied to the attempt.
     * @returns This same success.
     */
    infer(fn) {
        return this;
    }
}
export class Failure {
    constructor(value) {
        this.value = value;
    }
    unwrap() {
        return this.value;
    }
    /**
     * @param fn The function that will be applied to this failure.
     * @returns Another attempt.
     */
    bind(fn) {
        return fn(this.value);
    }
    /**
     * @param fn The function that will be applied to this failure.
     * @returns Another attempt.
     */
    infer(fn) {
        return attempt(fn(this.value), this);
    }
}
/**
 * @param value The potentially correct value.
 * @param fallback The fallback value.
 * @returns A Success or a Failure depending on the given arguments.
 */
export const attempt = (value, fallback) => {
    switch (true) {
        case value instanceof Success:
        case value instanceof Failure:
            return value;
        case value === null:
        case value === undefined:
            return fallback instanceof Failure ? fallback : failure(fallback);
        default:
            return success(value);
    }
};

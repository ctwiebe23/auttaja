/**
 * Shortcut for document.getElementById.
 * @param {string} id The element id.
 * @returns The element or null.
 */
export const byId = (id) => document.getElementById(id)

/**
 * @callback Procedure
 * Takes no arguments, returns nothing.
 */

/**
 * Waits till the document has loaded before running the main method.
 * @param {Procedure} main The main method.
 */
export const runSafe = (main) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main)
  } else {
    main()
  }
}

/**
 * @callback AttemptCallback
 * @param {any} value The value of the Failure.
 * @returns {Attempt} Either a Success or a Failure.
 */

/**
 * @callback InferredAttemptCallback
 * @param {any} value The value of the Failure.
 * @returns {Attempt} Either a Success or a Failure.
 */

/**
 * Monad that acts as an inverse of rust's Result.
 */
export /* abstract */ class Attempt {
  /**
   * @param {any} value The value of the Attempt.
   */
  constructor(value) {
    // Yes this has a constructor, I'm using "abstract" in a very abstract way.
    this.value = value
  }

  /**
   * @returns {any} The value of the Attempt, be it Success of Failure.
   */
  unwrap() {
    return this.value
  }

  /**
   * @param {AttemptCallback} fn The function that will be applied to the attempt.
   * @returns {Attempt}
   */
  bind(fn) {
    console.error("Calling abstract class Attempt function bind", fn)
    return new Failure(null)
  }

  /**
   * @param {InferredAttemptCallback} fn The function that will be applied to the attempt.
   * @returns {Attempt}
   */
  infer(fn) {
    console.error("Calling abstract class Attempt function infer", fn)
    return new Failure(null)
  }
}

export class Success extends Attempt {
  /**
   * @param {AttemptCallback} fn The function that will be applied to the attempt.
   * @returns {Attempt}
   */
  bind(fn) {
    return this
  }

  /**
   * @param {InferredAttemptCallback} fn The function that will be applied to the attempt.
   * @returns {Attempt}
   */
  infer(fn) {
    return this
  }
}

export class Failure extends Attempt {
  /**
   * @param {AttemptCallback} fn The function that will be applied to the attempt.
   * @returns {Attempt}
   */
  bind(fn) {
    return fn(this.value)
  }

  /**
   * @param {InferredAttemptCallback} fn The function that will be applied to the attempt.
   * @returns {Attempt}
   */
  infer(fn) {
    const res = fn(this.value)
    return attempt(res, this)
  }
}

export const success = (value) => new Success(value)
export const failure = (value) => new Failure(value)

/**
 * @param {any} value The value.
 * @param {any} fallback The fallback value.
 * @returns {Attempt} A Success or a Failure depending on the given arguments.
 */
export const attempt = (value, fallback) => {
  switch (true) {
    case value instanceof Attempt:
      return value

    case value === null:
    case value === undefined:
      return (fallback instanceof Attempt) ? fallback : new Failure(fallback)
    
    default:
      return new Success(value)
  }
}

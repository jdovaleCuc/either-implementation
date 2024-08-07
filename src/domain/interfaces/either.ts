interface FoldExpressions<R, E, T> {
  fnError: (error: E) => R;
  fnOk: (value: T) => R;
}

type Ok<T> = Either<T, never>;
type Error<E> = Either<never, E>;

export class Either<T, E> {
  private constructor(private readonly value?: T, private readonly error?: E) {}

  static Ok<T>(value: T): Ok<T> {
    return new Either(value);
  }

  static Error<E>(error: E): Error<E> {
    return new Either(undefined as never, error);
  }

  isOk(): this is Ok<T> {
    return this.value !== undefined;
  }

  isError(): this is Error<E> {
    return this.error !== undefined;
  }

  getValue(): T {
    if (!this.isOk()) {
      throw new Error("Cannot access value in a non-Ok instance");
    }

    return this.value!;
  }

  getError(): E {
    if (!this.isError()) {
      throw new Error("Cannot access error in a non-Error instance");
    }

    return this.error!;
  }

  fold<R>(expressions: FoldExpressions<R, E, T>): R {
    return this.isError()
      ? expressions.fnError(this.error!)
      : expressions.fnOk(this.value!);
  }
}

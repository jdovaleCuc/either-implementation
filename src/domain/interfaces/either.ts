interface FoldExpressions<R, E, T> {
  fnLeft: (error: E) => R;
  fnRight: (value: T) => R;
}

type Right<T> = Either<T, never>;
type Left<E> = Either<never, E>;

export class Either<T, E> {
  private constructor(private readonly value?: T, private readonly error?: E) {}

  static right<T>(value: T): Right<T> {
    return new Either(value);
  }

  static left<E>(error: E): Left<E> {
    return new Either(undefined as never, error);
  }

  isRight(): this is Right<T> {
    return this.value !== undefined;
  }

  isLeft(): this is Left<E> {
    return this.error !== undefined;
  }

  getValue(): T | undefined {
    if (!this.isRight()) {
      throw new Error("can't access to a value in a not right instance");
    }

    return this.value;
  }

  getError(): E | undefined {
    if (!this.isLeft()) {
      throw new Error("can't access to a value in a not left instance");
    }

    return this.error;
  }

  fold<R>(expressions: FoldExpressions<R, E, T>): R {
    return this.isLeft()
      ? expressions.fnLeft(this.error!)
      : expressions.fnRight(this.value!);
  }
}

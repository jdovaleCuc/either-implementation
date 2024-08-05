import { UserEntity } from "../../domain/entities/user.entity";
import { Either } from "../../domain/interfaces/either";
import { UserRepository } from "../../domain/repositories/userRepository";
import { v4 as uuid } from "uuid";

export class CacheUserRepository implements UserRepository {
  private users: UserEntity[] = [
    {
      id: uuid(),
      email: "alice@example.com",
      name: "Alice",
      lastname: "Smith",
      age: 28,
    },
    {
      id: uuid(),
      email: "bob@example.com",
      name: "Bob",
      lastname: "Johnson",
      age: 34,
    },
    {
      id: uuid(),
      email: "carol@example.com",
      name: "Carol",
      lastname: "Williams",
      age: 22,
    },
    {
      id: uuid(),
      email: "dave@example.com",
      name: "Dave",
      lastname: "Brown",
      age: 45,
    },
    {
      id: uuid(),
      email: "eve@example.com",
      name: "Eve",
      lastname: "Jones",
      age: 30,
    },
    {
      id: uuid(),
      email: "frank@example.com",
      name: "Frank",
      lastname: "Garcia",
      age: 39,
    },
    {
      id: uuid(),
      email: "grace@example.com",
      name: "Grace",
      lastname: "Miller",
      age: 27,
    },
    {
      id: uuid(),
      email: "hank@example.com",
      name: "Hank",
      lastname: "Davis",
      age: 31,
    },
    {
      id: uuid(),
      email: "iris@example.com",
      name: "Iris",
      lastname: "Martinez",
      age: 26,
    },
    {
      id: uuid(),
      email: "jack@example.com",
      name: "Jack",
      lastname: "Hernandez",
      age: 40,
    },
  ];

  async getUserByEmail(email: string): Promise<Either<UserEntity, Error>> {
    const user = this.users.find((val) => val.email === email);

    if (!user) {
      return Either.Error(new Error(`user with email ${email} is not found`));
    }

    return Either.Ok(user);
  }
}

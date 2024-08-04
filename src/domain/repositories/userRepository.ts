import { UserEntity } from "../entities/user.entity";
import { Either } from "../interfaces/either";

export interface UserRepository {
  getUserByEmail: (email: string) => Promise<Either<UserEntity, Error>>;
}

import { UserEntity } from "../../domain/entities/user.entity";
import { Either } from "../../domain/interfaces/either";
import { UserRepository } from "../../domain/repositories/userRepository";

export class GetUserByEmailUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(email: string): Promise<Either<UserEntity, Error>> {
    return this.userRepository.getUserByEmail(email);
  }
}

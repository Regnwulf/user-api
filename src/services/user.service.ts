import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    await user.hashPassword();
    return this.userRepository.save(user);
  }

  async updateUser(id: number, userData: Partial<User>) {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOneBy({ id });
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async findUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async searchUsers(term: string) {
    return this.userRepository
      .createQueryBuilder("user")
      .where("user.nome ILIKE :term OR user.email ILIKE :term", { term: `%${term}%` })
      .getMany();
  }
}

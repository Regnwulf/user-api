import { User, UserRole } from '../entities/user.entity'
import { AppDataSource } from '../config/database'

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } })
  },

  async findByRole(role: UserRole): Promise<User[]> {
    return this.find({ where: { funcao: role } })
  },

  async searchUsers(term: string): Promise<User[]> {
    return this.createQueryBuilder('user')
      .where('user.nome ILIKE :term OR user.email ILIKE :term', {
        term: `%${term}%`,
      })
      .getMany()
  },
})

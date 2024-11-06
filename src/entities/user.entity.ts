import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { promisify } from 'util'
import { scrypt as _scrypt, randomBytes } from 'crypto'

const scrypt = promisify(_scrypt)

export type UserRole = 'admin' | 'cliente'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  nome!: string

  @Column({ unique: true })
  email!: string

  @Column()
  senha!: string

  @Column({ type: 'enum', enum: ['admin', 'cliente'], default: 'cliente' })
  funcao!: UserRole

  async hashPassword() {
    const salt = randomBytes(16).toString('hex')
    const hashedBuffer = (await scrypt(this.senha, salt, 64)) as Buffer
    this.senha = `${salt}:${hashedBuffer.toString('hex')}`
  }

  async validatePassword(senha: string): Promise<boolean> {
    const [salt, storedHash] = this.senha.split(':')
    const hashedBuffer = (await scrypt(senha, salt, 64)) as Buffer
    return storedHash === hashedBuffer.toString('hex')
  }
}

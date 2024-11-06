import { UserService } from '../../src/services/user.service'
import { UserRepository } from '../../src/repositories/user.repository'
import { User, UserRole } from '../../src/entities/User'
import { UpdateResult } from 'typeorm'

jest.mock('../../src/repositories/user.repository')

describe('UserService', () => {
  let userService: UserService
  let createSpy: jest.SpyInstance
  let saveSpy: jest.SpyInstance

  const mockUserData = {
    id: 1,
    nome: 'Test User',
    email: 'testuser@example.com',
    senha: 'testpassword',
    funcao: 'cliente' as UserRole,
  }

  beforeEach(() => {
    userService = new UserService()
    jest.clearAllMocks()
    createSpy = jest
      .spyOn(UserRepository, 'create')
      .mockImplementation((userData) => {
        const user = new User()
        user.senha = userData.senha!
        user.hashPassword = jest.fn().mockResolvedValue(user)
        return user
      })

    saveSpy = jest
      .spyOn(UserRepository, 'save')
      .mockResolvedValue(mockUserData as User)
  })

  describe('createUser', () => {
    it('deve criar um novo usuário com senha hash', async () => {
      const result = await userService.createUser(mockUserData)

      expect(createSpy).toHaveBeenCalledWith(mockUserData)

      expect(saveSpy).toHaveBeenCalledWith(
        expect.objectContaining({ senha: expect.any(String) }),
      )

      expect(result).toEqual(mockUserData)
    })
  })

  describe('updateUser', () => {
    it('deve atualizar os dados de um usuário', async () => {
      const updatedUserData = { nome: 'Updated User' }

      jest.spyOn(UserRepository, 'update').mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: [],
      } as UpdateResult)
      jest.spyOn(UserRepository, 'findOneBy').mockResolvedValue({
        ...mockUserData,
        ...updatedUserData,
      } as User)

      const result = await userService.updateUser(
        mockUserData.id,
        updatedUserData,
      )

      expect(result).toEqual(expect.objectContaining(updatedUserData))
    })
  })

  describe('getUsers', () => {
    it('deve retornar uma lista de usuários', async () => {
      jest
        .spyOn(UserRepository, 'find')
        .mockResolvedValue([mockUserData] as User[])

      const result = await userService.getUsers()

      expect(result).toEqual([mockUserData])
    })
  })

  describe('findUserById', () => {
    it('deve retornar um usuário pelo ID', async () => {
      jest
        .spyOn(UserRepository, 'findOneBy')
        .mockResolvedValue(mockUserData as User)

      const result = await userService.findUserById(mockUserData.id)

      expect(result).toEqual(mockUserData)
    })
  })

  describe('searchUsers', () => {
    it('deve retornar usuários com base em um termo de pesquisa', async () => {
      jest
        .spyOn(UserRepository, 'searchUsers')
        .mockResolvedValue([mockUserData] as User[])

      const result = await userService.searchUsers('Test')

      expect(result).toEqual([mockUserData])
    })
  })
})

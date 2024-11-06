import { Request, Response } from 'express'
import {
  createUser,
  updateUser,
  getUsers,
  searchUsers,
} from '../../src/controllers/user.controller'
import { UserService } from '../../src/services/user.service'
import { User } from '../../src/entities/User'

jest.mock('../../src/services/user.service')

const userServiceMock = UserService as jest.MockedClass<typeof UserService>
const mockResponse = {} as Response
let mockRequest: Partial<Request>

beforeEach(() => {
  mockRequest = {}
  mockResponse.status = jest.fn().mockReturnThis()
  mockResponse.json = jest.fn().mockReturnThis()
})

describe('User Controller', () => {
  it('should create a user successfully', async () => {
    const userData: User = {
      id: 1,
      nome: 'John Doe',
      email: 'john@example.com',
      senha: 'password',
      funcao: 'cliente',
      hashPassword: jest.fn(),
      validatePassword: jest.fn(),
    }

    mockRequest.body = {
      nome: 'John Doe',
      email: 'john@example.com',
      senha: 'password',
    }
    userServiceMock.prototype.createUser.mockResolvedValue(userData)

    await createUser(mockRequest as Request, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith(userData)
  })

  it('should return error when creating a user fails', async () => {
    mockRequest.body = {
      nome: 'John Doe',
      email: 'john@example.com',
      senha: 'password',
    }
    userServiceMock.prototype.createUser.mockRejectedValue(
      new Error('Erro ao criar usuário'),
    )

    await createUser(mockRequest as Request, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Erro ao criar usuário',
    })
  })

  it('should update a user successfully', async () => {
    const userData: User = {
      id: 1,
      nome: 'John Doe',
      email: 'john@example.com',
      senha: 'password',
      funcao: 'cliente',
      hashPassword: jest.fn(),
      validatePassword: jest.fn(),
    }

    mockRequest.params = { id: '1' }
    mockRequest.body = { nome: 'John Doe', email: 'john@example.com' }

    userServiceMock.prototype.updateUser.mockResolvedValue(userData)

    await updateUser(mockRequest as Request, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith(userData)
  })

  it('should return error when updating a user fails', async () => {
    mockRequest.params = { id: '1' }
    mockRequest.body = { nome: 'John Doe', email: 'john@example.com' }
    userServiceMock.prototype.updateUser.mockRejectedValue(
      new Error('Erro ao atualizar usuário'),
    )

    await updateUser(mockRequest as Request, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Erro ao atualizar usuário',
    })
  })

  it('should return an empty array when no users are found', async () => {
    userServiceMock.prototype.getUsers.mockResolvedValue([])

    await getUsers(mockRequest as Request, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith([])
  })

  it('should return a list of users', async () => {
    const users: User[] = [
      {
        id: 1,
        nome: 'John Doe',
        email: 'john@example.com',
        senha: 'password',
        funcao: 'cliente',
        hashPassword: jest.fn(),
        validatePassword: jest.fn(),
      },
    ]

    userServiceMock.prototype.getUsers.mockResolvedValue(users)

    await getUsers(mockRequest as Request, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith(users)
  })

  it('should return error when creating a user fails', async () => {
    mockRequest.body = {
      nome: 'John Doe',
      email: 'john@example.com',
      senha: 'password',
    }
    userServiceMock.prototype.createUser.mockRejectedValue(
      new Error('Erro ao criar usuário'),
    )

    await createUser(mockRequest as Request, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Erro ao criar usuário',
    })
  })

  it('should search users successfully', async () => {
    const users: User[] = [
      {
        id: 1,
        nome: 'John Doe',
        email: 'john@example.com',
        senha: 'password',
        funcao: 'cliente',
        hashPassword: jest.fn(),
        validatePassword: jest.fn(),
      },
    ]

    userServiceMock.prototype.searchUsers.mockResolvedValue(users)
    mockRequest.query = { term: 'john' }

    await searchUsers(mockRequest as Request, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith(users)
  })
})

import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar usuário" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
};

export const getUsers = async (_: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const searchUsers = async (req: Request, res: Response) => {
  const users = await userService.searchUsers(req.query.term as string);
  res.json(users);
};

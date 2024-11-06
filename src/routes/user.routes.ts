import { Router } from "express";
import { createUser, updateUser, getUsers, searchUsers } from "../controllers/user.controller";

const router = Router();

router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.get("/users", getUsers);
router.get("/users/search", searchUsers);

export default router;

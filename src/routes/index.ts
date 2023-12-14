import { Router } from "express";
import { ValidationSchema } from "../controllers/users/validatorSchemas";
import { UserController } from "../controllers/users/userControler";



export const router = Router();


router.get("/users", ValidationSchema.getUsersValidation,UserController.getAll);
router.get("/user", ValidationSchema.getUserValidation, UserController.getUser);
router.post("/user", ValidationSchema.createUserValidation,UserController.create);
router.put("/user", ValidationSchema.updateUserValidation, UserController.update);
router.delete("/user", ValidationSchema.deleteUserValidation, UserController.delete);
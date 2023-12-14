import { Router } from "express";
import { UserValidationSchema } from "../controllers/users/validatorSchemas";
import { UserController } from "../controllers/users/userControler";
import { ensureAuthencticated } from "../shared/middlewares/EnsureAuthenticated";
import {AuthValidationSchema} from "../controllers/auth/validatorSchemas";
import { AuthController } from "../controllers/auth/authControler";


export const router = Router();


router.get("/users",   ensureAuthencticated, UserValidationSchema.getUsersValidation,   UserController.getAll);
router.get("/user",    ensureAuthencticated, UserValidationSchema.getUserValidation,    UserController.getUser);
router.post("/user",   ensureAuthencticated, UserValidationSchema.createUserValidation, UserController.create);
router.put("/user",    ensureAuthencticated, UserValidationSchema.updateUserValidation, UserController.update);
router.delete("/user", ensureAuthencticated, UserValidationSchema.deleteUserValidation, UserController.delete);

router.post("/signin",  AuthValidationSchema.signinValidation, AuthController.signin);
router.post("/signup",  UserValidationSchema.createUserValidation, UserController.create);
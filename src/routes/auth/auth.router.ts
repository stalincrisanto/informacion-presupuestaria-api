import { Router } from "express";
import { loginController } from "../../controllers/auth/auth.controller";

const routerLogin = Router();

routerLogin.post("/login", loginController);

export default routerLogin;

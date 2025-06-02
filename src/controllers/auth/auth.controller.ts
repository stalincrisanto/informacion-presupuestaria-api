import { Request, Response } from "express";
import { loginUser } from "../../services/auth.service";

export const loginController = async (req: Request, res: Response) => {
  console.log("Login controller called", req.body);
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: "Usuario y contraseña son requeridos",
      });
    }

    const result = await loginUser(username, password);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error en la autenticación",
    });
  }
};

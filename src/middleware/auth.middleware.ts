import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.service";
import { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Obtener el token del header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res
        .status(401)
        .json({
          success: false,
          message: "No se proporcionó token de autenticación",
        });
    }

    // 2. Verificar formato Bearer token
    const token = authHeader?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Formato de token inválido" });
    }

    // 3. Verificar token
    const decoded = verifyToken(token!);
    req.user = decoded;

    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Token inválido";
    res.status(403).json({ message });
  }
};

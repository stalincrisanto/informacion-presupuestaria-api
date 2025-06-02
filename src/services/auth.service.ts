import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authConfig } from "../config/auth";

const prisma = new PrismaClient();

export const loginUser = async (username: string, password: string) => {
  try {
    // 1. Buscar usuario
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // 2. Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    // 3. Generar JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      authConfig.secret
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, authConfig.secret);
  } catch (error) {
    console.error("Error en verifyToken:", error);
    throw new Error("Token inválido o expirado");
  }
};

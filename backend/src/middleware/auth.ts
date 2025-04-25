import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { User } from "../models/User";

interface JwtPayload {
  userId: number;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    (req as any).user = user;
    (req as any).token = token;

    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

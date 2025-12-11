import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import type { CustomRequest } from "../types/customRequest.js";

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT secret is not defined");

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    if (!decoded || typeof decoded === "string") {
      return res.status(403).json({ message: "Invalid token payload" });
    }
    
    req.user = { ...decoded, id: (decoded as JwtPayload).id };

    next();
  });
};

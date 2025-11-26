import type { ObjectId } from "mongoose";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import type {Request, Response} from 'express';
import Joi from "joi";

const passwordValidator = Joi.string()
  .pattern(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/
  )
  .required()
  .messages({
    "string.pattern.base":
      "Password must have at least eight characters and has to include letters and numbers",
    "string.empty": "Password can not be empty",
  });


const generateToken = (userId : ObjectId) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: "2h" });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, user, email, password } = req.body;

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { user }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El usuario o el email ya están registrados" });
    }

    const newUser = await UserModel.create({
      fullName,
      user,
      email,
      password,
      myReservations: [],
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      user: newUser.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor durante el registro" });
  }
};

export const loginUser = async (req : Request, res : Response) => {
  try {
    const { user, password } = req.body;


    const existingUser = await UserModel.findOne({
      $or: [{ user }, { email: user }],
    });

    if (!existingUser) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await existingUser.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generateToken(existingUser.id);

    res.status(200).json({
      user: existingUser.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor durante el login" });
  }
};
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
    const { name, email, password, avatar, favPokemon, teamFlag } = req.body;

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { name }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User or email are already registered" });
    }

    const newUser = await UserModel.create({
      name,
      password,
      email,
      avatar,
      favPokemon,
      teamFlag
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      user: newUser.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Error on register:", error);
    res
      .status(500)
      .json({ message: "Error on server during register" });
  }
};

export const loginUser = async (req : Request, res : Response) => {
  try {
    const { name, email, password } = req.body;


    const existingUser = await UserModel.findOne({
      $or: [{ name }, { email }],
    });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await existingUser.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is not correct" });
    }

    const token = generateToken(existingUser.id);

    res.status(200).json({
      user: existingUser.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Error on login:", error);
    res.status(500).json({ message: "Error on server during login" });
  }
};
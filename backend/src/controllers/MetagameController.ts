import type { Request, Response, NextFunction } from "express";
import Metagame from "../models/MetagameModel.js";

export const createMetagame = async (req: Request , res: Response, next: NextFunction) => {
  try {
    const { name, format, regulation, allowedPokemon, bannedPokemon, viability } = req.body;

    if (!name || !format || !regulation || !allowedPokemon || !Array.isArray(allowedPokemon)) {
      return res.status(400).json({ message: "Missing required fields or invalid allowedPokemon" });
    }

    const metagame = await Metagame.create({
      name,
      format,
      regulation,
      allowedPokemon,
      bannedPokemon: bannedPokemon || [],
      viability: viability || [],
    });

    res.status(201).json({
      message: "Metagame created successfully",
      metagameId: metagame._id,
      metagame,
    });
  } catch (err) {
    next(err);
  }
};

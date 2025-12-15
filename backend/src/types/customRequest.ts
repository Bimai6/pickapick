import type { Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    id: string;
    [key: string]: any;
  };
}

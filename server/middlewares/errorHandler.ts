// src/utils/asyncHandler.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncHandler = (fn: RequestHandler): RequestHandler => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;

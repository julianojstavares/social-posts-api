import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    id: number;
    role: string;
}

export async function EnsureAdmin(request:Request, response:Response, next:NextFunction) {
 
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {

        const secret = process.env.SECRET as string;
        const { id, role } = verify(token, secret) as IPayload;

        request.id_user = id;

        if(role !== 'admin') {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        return next();

    } catch (error) {
        return response.status(401).json({ error: 'Invalid token' });
    }

}
import { Request, Response } from "express";
import { ReadUserUseCase } from "./readUserUseCase";

export class ReadUserController {

    async handle(request: Request, response: Response) {

        const { id_user } = request;

        const readUserUseCase = new ReadUserUseCase();
        
        const result = await readUserUseCase.execute({ id_user });

        return response.json(result);

    }

}
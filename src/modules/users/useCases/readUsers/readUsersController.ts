import { Request, Response } from "express";
import { ReadUsersUseCase } from "./readUsersUseCase";

export class ReadUsersController {

    async handle(request: Request, response: Response) {
        
        const readUsersUseCase = new ReadUsersUseCase();
        
        const result = await readUsersUseCase.execute();

        return response.json(result);

    }

}
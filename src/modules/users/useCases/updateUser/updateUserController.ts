import { Request, Response } from "express";
import { UpdateUserUseCase } from "./updateUserUseCase";
import validator from "validator";

export class UpdateUserController {

    async handle(request: Request, response: Response) {

        const { id_user } = request;
        const { name, email } = request.body;

        if(!name && !email) {
            return response.status(400).json({
                error: "Name and/or email required"
            });
        }

        if (!validator.isEmail(email)) {
            return response.status(400).json({
                message: "Invalid email"
            });
        }

        const updateUserUseCase = new UpdateUserUseCase();
        
        const result = await updateUserUseCase.execute({ id_user, name, email });

        return response.json(result);

    }

}
import { Request, Response } from 'express';
import { DeleteUserUseCase } from './deleteUserUseCase';


export class DeleteUserController {

    async handle(request: Request, response: Response) {

        const { id_user, role } = request;
        const { id } = request.params;

        if(!Number(id))
        {
            return response.status(400).json({
                error: 'Invalid id'
            });
        }

        if(role !== 'admin' && id_user !== Number(id)) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        const deleteUserUseCase = new DeleteUserUseCase();

        let idNumber = Number(id);

        try {
            const result = await deleteUserUseCase.execute({ id_user: idNumber });
        
            return response.json(result);

        } catch (error) {
            return response.status(400).json({
                "error": "User not found"
            });
        }


    }

}
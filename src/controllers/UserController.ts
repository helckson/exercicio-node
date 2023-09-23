import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body
        
        if(!name && !email) {
            return res.status(400).json({ message: 'O nome e o email são obrigatórios' })
        }

        try {
            const newUser = userRepository.create({ name, email})

            await userRepository.save(newUser)

            return res.status(201).json(newUser)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error'} )
        }
    }

    async list(req: Request, res: Response) {
        try {
            const users = await userRepository.find()
            return res.json(users)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error'})
        }
    }

    async listby(req: Request, res: Response) {
        const { idUser } = req.params

        const user = await userRepository.findOneBy({ id: Number(idUser)})

        if(user) {
            res.json(user)
        }else {
            res.status(500).json('Usuario não encontrado')
        }
    }

    async update(req: Request, res: Response) {
     try {
        const { idUser } = req.params
        const userData = req.body

        const user = await userRepository.findOneBy({id: Number(idUser)})

        if(!user) {
            return res.status(400).json('Usuario não encontrado')
        }

        await userRepository.update(user, userData);
        
        return res.json("Usuario atualizado com sucesso")
     } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json('Erro interno do servidor');
     }  
    }

    async delete(req: Request, res: Response) {
        try {
            const { idUser } = req.params
            const user = await userRepository.findOneBy({id: Number(idUser)})

            if(!user) {
                return res.status(400).json('Usuario não encontrado')
            }
            
            await userRepository.delete(idUser);

            return res.status(200).json('Usuario deletado com sucesso');

        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return res.status(500).json('Erro interno do servidor');
        }

    }
}
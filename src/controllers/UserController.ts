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
}
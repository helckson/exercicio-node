import { Router } from 'express'
import { UserController } from './controllers/UserController';

const routes = Router();

routes.post('/user', new UserController().create)
routes.get('/user', new UserController().list)
routes.get('/user/:idUser', new UserController().listby)
routes.put('/user/:idUser', new UserController().update)
routes.delete('/user/:idUser', new UserController().delete)

export default routes
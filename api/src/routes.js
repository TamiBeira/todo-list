import { Router } from 'express';

import authMiddlewares from './app/middlewares/auth';

import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';


const routes = new Router();

routes.post('/users', UsersController.store);
routes.post('/sessions', SessionController.store);

//Todas as rotas abaixo desta authMiddlewares precisam estar autenticadas
routes.use(authMiddlewares);
routes.put('/users', UsersController.update);
routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:task_id', TaskController.update);
routes.put('/tasks/editTask/:task_id', TaskController.editTask);
routes.delete('/tasks/:task_id', TaskController.delete);




export default routes;

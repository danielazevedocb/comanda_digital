import { Router } from "express";

import { CreateUserController } from './controllers/user/CreateUseController'
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

import { isAuthenticated } from "./middlewares/isAuthenticated"


const router = Router();

//-- ROTAS USER --

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated,  new DetailUserController().handle)

//-- ROTAS CATEGORY --

router.post('/category', isAuthenticated, new CreateCategoryController().handle )


export { router }
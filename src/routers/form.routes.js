import { Router } from "express";
import authorizedRoutes from "../middlewares/auth.middleware.js";
import createNewForm from "../controllers/form/createForm.controller.js";

const formRouter = Router();

//? form routes
//create
formRouter.post("/",authorizedRoutes,createNewForm);

export default formRouter;

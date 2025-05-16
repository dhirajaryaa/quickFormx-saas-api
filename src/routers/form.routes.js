import { Router } from "express";
import authorizedRoutes from "../middlewares/auth.middleware.js";
import createNewForm from "../controllers/form/createForm.controller.js";
import getForm from "../controllers/form/getForm.controller.js";

const formRouter = Router();

//? form routes
//create
formRouter.post("/",authorizedRoutes,createNewForm);
//get form
formRouter.get("/:formId",authorizedRoutes,getForm);

export default formRouter;

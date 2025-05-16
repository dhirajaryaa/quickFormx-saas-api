import { Router } from "express";
import authorizedRoutes from "../middlewares/auth.middleware.js";
import createNewForm from "../controllers/form/createForm.controller.js";
import getForm from "../controllers/form/getForm.controller.js";
import getAllForms from "../controllers/form/getForms.controller.js";

const formRouter = Router();

//? form routes
//create
formRouter.post("/",authorizedRoutes,createNewForm);
//get form
formRouter.get("/:formId",authorizedRoutes,getForm);
//get forms
formRouter.get("/",authorizedRoutes,getAllForms);

export default formRouter;

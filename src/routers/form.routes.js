import { Router } from "express";
import authorizedRoutes from "../middlewares/auth.middleware.js";
import createNewForm from "../controllers/form/createForm.controller.js";
import getForm from "../controllers/form/getForm.controller.js";
import getAllForms from "../controllers/form/getForms.controller.js";
import updateForm from "../controllers/form/updateForm.controller.js";
import deleteForm from "../controllers/form/deleteForm.controller.js";
import createFormWithAi from "../controllers/form/createFormAi.controller.js";
import saveFormDraft from "../controllers/form/draftSave.controller.js";
import getPublicForm from "../controllers/form/getPublicForm.controller.js";

const formRouter = Router();

//? form routes
//create
formRouter.post("/", authorizedRoutes, createNewForm);
//create with ai agent
formRouter.post("/ai", authorizedRoutes, createFormWithAi);
//get form
formRouter.get("/:formId", authorizedRoutes, getForm);
//get form with public id
formRouter.get("/public/:publicId", getPublicForm);
//get forms
formRouter.get("/", authorizedRoutes, getAllForms);
//update form
formRouter.patch("/:formId", authorizedRoutes, updateForm);
//delete form
formRouter.delete("/:formId", authorizedRoutes, deleteForm);
//draft form
formRouter.patch("/:formId/draft", authorizedRoutes, saveFormDraft);

export default formRouter;

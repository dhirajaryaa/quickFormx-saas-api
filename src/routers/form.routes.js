import { Router } from "express";
import createNewForm from "../controllers/form/createForm.controller";

const formRouter = Router();

//? form routes
//create
formRouter.post("/",createNewForm);

export default formRouter;

import { Router } from "express";
import authorizedRoutes from "../middlewares/auth.middleware.js";
import saveNewSubmission from "../controllers/submission/create.controller.js";

const submissionRouter = Router();

// create new submission
submissionRouter.post("/",saveNewSubmission);

export default submissionRouter;

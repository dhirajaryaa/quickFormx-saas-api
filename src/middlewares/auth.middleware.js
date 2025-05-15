import ApiError from '../utils/apiError.js';
import AsyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import { Access_Token_Secret } from "../config/env.js"

const authorizedRoutes = AsyncHandler(async (req, res, next) => {
    const incomingToken = req.cookies.accessToken || req.headers['authorization']?.replace("Bearer ", "")
    if (!incomingToken) {
        throw new ApiError(400, "invalid Token or Expired")
    }
    // token decoded
    const decodedToken = jwt.verify(incomingToken, Access_Token_Secret);
    // check token expired
    if(decodedToken.exp * 1000 < Date.now()){
        throw new ApiError(403,"Token Expired")
    }
    req.user = decodedToken;
    next()
})
export default authorizedRoutes;

import nodemailer  from "nodemailer";
import {Gmail_UserId,Gmail_User_Password,NODE_ENV} from "./env.js"

// create transport
const emailTransport = nodemailer.createTransport({
   host: 'smtp.gmail.com',
  port: 465,
  secure: true, // must be true for port 465
  auth:{
    user: Gmail_UserId,
    pass:Gmail_User_Password
  }
});
export default emailTransport

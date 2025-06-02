import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,URL} from "./env.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${URL}/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile); // Just return raw profile if not using DB yet
    }
  )
);

export default passport;

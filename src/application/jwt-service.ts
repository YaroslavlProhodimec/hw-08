import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import * as dotenv from "dotenv";
import { JwtPayloadResult } from "../dto/common/jwt/JwtPayloadResult";

dotenv.config();

export const jwtService = {
  async createJWT(
    userId: string,
    secret: string,
    expiresIn: number
  ): Promise<string> {
    console.log(userId,'userId')
    console.log(secret,'secret')
    console.log(expiresIn,'expiresIn')
    const token = jwt.sign({ userId }, secret, {
      expiresIn,
    });
    console.log(token,'token')
    return token;
  },
  async getJwtPayloadResult(
    token: string,
    secret: string
  ): Promise<JwtPayloadResult | null> {
    try {
      const result = jwt.verify(token, secret);
      return result as JwtPayloadResult;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log({
          name: error.name,
          message: error.message,
          expiredAt: error.expiredAt,
        });
        return null;
      } else if (error instanceof JsonWebTokenError) {
        console.log({
          name: error.name,
          message: error.message,
        });
        return null;
      } else if (error instanceof NotBeforeError) {
        console.log({
          name: error.name,
          message: error.message,
        });
        return null;
      } else return null;
    }
  },
};

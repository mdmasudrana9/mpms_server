// import jwt, { JwtPayload } from 'jsonwebtoken'
import jwt, { JwtPayload } from "jsonwebtoken";

export const veriFyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

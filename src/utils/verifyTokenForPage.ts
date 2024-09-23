import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const verifyTokenForPage = (token: string): User | null => {
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY as string) as User;
    return user;
  } catch {
    return null;
  }
};
export default verifyTokenForPage;

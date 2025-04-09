import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { PersonaData, UsuarioData } from "types/authTypes";
import { maxAgeJwt } from "constants/timeJWT";


interface AuthenticatedUser {
  userId: string;
  role: string;
  sessionId: string;
}

class AuthController {
  private authService : any;

  constructor(authService: any) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, email, password }: { username?: string; email?: string; password: string } = req.body;
      const { usuario, session } = await this.authService.login({ username, email, password });

      const token = jwt.sign(
        { userId: usuario._id, role: usuario.role, sessionId: session._id },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      res.cookie("authToken", token, {
        maxAge: maxAgeJwt,

      });

      res.json({ ok: true, message: "Logged successfully!", user_id: usuario._id });
    } catch (error: any) {
      res.json({ ok: false, message: error.message });
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.cookies.authToken;
      if (!token) {
        res.json({ ok: false, message: "You don't have an active session!" });
        return;
      }

      await this.authService.logout(token);
      res.clearCookie("authToken");
      res.json({ ok: true, message: "Session closed successfully!" });
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { persona, usuario }: { persona: PersonaData; usuario: UsuarioData } = req.body;
      if (!persona || !usuario) {
        res.json({ ok: false, message: "No info sent" });
        return;
      }

      const { usuario: newUser, session } = await this.authService.register(persona, usuario);

      const token = jwt.sign(
        { userId: newUser._id, role: newUser.role, sessionId: session._id },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      res.cookie("authToken", token, {
        maxAge: maxAgeJwt,
  
      });

      res.json({
        ok: true,
        message: "Registered successfully!",
        user_id: newUser._id,
        user_email: newUser.email,
      });
    } catch (error : any) {
      res.json( { ok :false, message : error.message})
      // next(error);
    }
  };

  verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authToken } = req.cookies;

    if (!authToken) {
      res.status(401).json({ ok: false, message: "Unauthorized" });
      return;
    }

    jwt.verify(authToken, process.env.JWT_SECRET!, async (err : any, user : any) => {
      if (err || typeof user !== "object" || !user || !("userId" in user)) {
        res.status(401).json({ ok: false, message: "Unauthorized" });
        return;
      }

      try {
        const usuario = await this.authService.getUserById((user as AuthenticatedUser).userId);
        res.status(200).json({ ok: true, usuario });
      } catch (error) {
        next(error);
      }
    });
  };
}

export const authController = new AuthController(authService);

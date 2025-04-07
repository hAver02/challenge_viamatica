import { intentosFallidosDao } from "../dao/collections/intentosfallidos.dao";
import { personaDao } from "../dao/collections/persona.dao";
import { sessionDao } from "../dao/collections/session.dao";
import { usuarioDao } from "../dao/collections/usuario.dao";
import CustomError from "../utils/custom.error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { generateEmail } from "../utils/generateEmail";
import { LoginData, PersonaData, UsuarioData } from "types/authTypes";

class AuthService {
    private userDao: typeof usuarioDao;
    private personaDao;
    private sessionDao;
    private failedDao: typeof intentosFallidosDao;
  
    constructor(
      userDao: typeof usuarioDao,
      personaDao : any,
      sessionDao : any,
      failedDao: typeof intentosFallidosDao
    ) {
      this.userDao = userDao;
      this.personaDao = personaDao;
      this.sessionDao = sessionDao;
      this.failedDao = failedDao;
    }
  
    register = async (personaData: PersonaData, usuarioData: UsuarioData) => {
      try {
        const { nombre, apellido, documento, fechaNacimiento } = personaData;
        if (!nombre || !apellido || !documento || !fechaNacimiento)
          throw new CustomError("wrong person information sent", 404);
  
        const { password, username, role } = usuarioData;
        if (!password || !username)
          throw new CustomError("wrong user information sent", 404);
  
        let persona = await this.personaDao.findByDocument(documento);
        if (persona)
          throw new CustomError("Already exist one account with this document!", 400);
  
        const user = await this.userDao.findUserByUsername(username);
        if (user)
          throw new CustomError("Already exist one account with this email or username!", 400);
  
        const email = await generateEmail(nombre, apellido, documento);
        if(!email) throw new CustomError("error generando email", 500)
        const newPersona = await this.personaDao.create(personaData);
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const usuario : any = await this.userDao.create({
          idPersona: newPersona._id,
          username,
          email: email.toLowerCase(),
          password: hashedPassword,
          role: role || "user",
        });
  
        const session = await this.sessionDao.create({
          userId: usuario._id.toString(),
        });
  
        return { usuario, session };
      } catch (error) {
        throw error;
      }
    };
  
    login = async ({ username, email, password }: LoginData) => {
      try {
        let usuario : any = await this.userDao.findUserByEmailOrUsername(username || "", email || "");
        if (!usuario) throw new CustomError("User not found", 404);
  
        if (usuario.status === "blocked")
          throw new CustomError("Blocked user", 403);
  
        if (usuario.failedAttempts >= 3) {
          await this.userDao.updateStatus(usuario._id, "blocked");
          throw new CustomError("Your account has been blocked", 403);
        }
  
        const currentTime = new Date();
        const cookieExpirationTime = 3600000;
        const sessiones = await this.sessionDao.getSessionByUserIdAndWithEndNull(usuario._id);
  
        for (const session of sessiones) {
          const sessionDuration = currentTime.getTime() - new Date(session.sessionStart).getTime();
          if (sessionDuration > cookieExpirationTime) {
            await this.sessionDao.setSessionEnd(session._id);
            usuario = await this.userDao.updateSession(usuario._id, false);
          }
        }
  
        if (usuario.sessionActive)
          throw new CustomError("Already have one active session", 400);
  
        const isValidPassword = await bcrypt.compare(password, usuario.password);
        if (!isValidPassword) {
          await this.failedDao.create({ userId: usuario._id, date: new Date() });
          usuario = await this.userDao.updateFailed(usuario._id, usuario.failedAttempts + 1);
  
          if (usuario.failedAttempts > 3) {
            await this.userDao.updateStatus(usuario._id, "blocked");
          }
  
          throw new CustomError("Invalid password", 401);
        }
  
        if (usuario.failedAttempts >= 3) {
          await this.userDao.updateStatus(usuario._id, "blocked");
          throw new CustomError("Your account has been blocked", 403);
        }
  
        await this.userDao.updateSession(usuario._id, true);
  
        const session = await this.sessionDao.create({
          userId: usuario._id,
        });
  
        return { usuario, session };
      } catch (error) {
        throw error;
      }
    };
  
    logout = async (token: string) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
  
        await this.userDao.updateSession(decoded.userId, false);
        await this.sessionDao.setSessionEnd(decoded.sessionId);
      } catch (error) {
        throw error;
      }
    };
  
    getUserById = async (id: string) => {
      try {
        const user : any = await this.userDao.getById(id);
        if (!user) throw new CustomError("User not found", 404);
  
        delete user.password;
        const persona = await this.personaDao.getById(user.idPersona);
  
        if (!persona) throw new CustomError("User not found", 404);
  
        return { user, persona };
      } catch (error) {
        throw error;
      }
    };
  }
  
  export const authService = new AuthService(
    usuarioDao,
    personaDao,
    sessionDao,
    intentosFallidosDao
  );
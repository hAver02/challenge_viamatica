// src/services/SessionService.ts
import { ISession } from "interfaces/session.interface";
import { sessionDao } from "../dao/collections/session.dao";


class SessionService {
  private sessionDao: any;

  constructor(sessionDao: any) {
    this.sessionDao = sessionDao;
  }

  getAll = async (): Promise<ISession[]> => {
    try {
      return this.sessionDao.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  create = async (session: Partial<ISession>): Promise<ISession> => {
    try {
      return this.sessionDao.create(session);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  getByUserId = async (userId: string): Promise<ISession[]> => {
    try {
      return this.sessionDao.getByUserId(userId);
    } catch (error) {
      throw new Error("Error getting sessions!");
    }
  };
}

export const sessionService = new SessionService(sessionDao);

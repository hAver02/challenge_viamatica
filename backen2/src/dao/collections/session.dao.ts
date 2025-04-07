import { sessionModel } from "../../models/sessions.model";
import MongoDao from "../MongoDao";
import { ISession } from "../../interfaces/session.interface";
import { Types } from "mongoose";

class SessionDao extends MongoDao<ISession> {
  constructor() {
    super(sessionModel);
  }

  setSessionEnd = async (sessionId: string): Promise<ISession | null> => {
    return await this.model.findByIdAndUpdate(
      sessionId,
      { sessionEnd: new Date() },
      { new: true }
    );
  }

  getSessionByUserIdAndWithEndNull = async (userId: string): Promise<ISession[]> => {
    return await this.model.find({
      $and: [{ userId }, { sessionEnd: null }]
    });
  }

  getByUserId = async (userId: string): Promise<ISession[]> => {
    return this.model.find({ userId });
  }
}

export const sessionDao = new SessionDao();

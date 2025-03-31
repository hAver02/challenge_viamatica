import mongoose from "mongoose";

const FailedAttemptsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    date : { type : Date, required : true}
  });



  export const FailedModel = mongoose.model("IntentosFallidos", FailedAttemptsSchema);
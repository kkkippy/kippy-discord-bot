import { TicketModel } from "./models/ticket";
import { mongooseUri } from "./config.json";
import { UserModel } from "./models/user";
import { connect } from "mongoose";

export const mongoConnect = async () => {
    await connect(mongooseUri, {
        dbName: "data"
    })
    .then(() => console.log("Mongoose conectado."))
    .catch(console.log);
}

export const GetAllUsers = async () => {
    return await UserModel.find();
}

export const GetAllTickets = async () => {
    return await TicketModel.find();
}
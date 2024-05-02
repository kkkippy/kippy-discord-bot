import { mongooseUri } from "./config.json";
import { UserModel } from "./models/user";
import { connect } from "mongoose";
import { User } from "discord.js";

export const mongoConnect = async () => await connect(mongooseUri, {
    dbName: "data"
})
.then(() => console.log("Mongoose conectado."))
.catch(console.log);

export const RemoveUser = async (user: User) => {
    if (await UserModel.exists({ id: user.id }))
    {
        await UserModel.deleteOne({ id: user.id })
        .then(() => console.log(`O usuário ${user.username} (${user.id}) foi removido do banco de dados com sucesso.`))
        .catch(console.log);
    }
}

export const RegisterUser = async (user: User) => {
    if (await UserModel.exists({ id: user.id }))
    {
        console.log(`O usuário ${user.username} (${user.id}) já está registrado.`);
        return;
    }

    await UserModel.create({
        id: user.id
    })
    .then(() => console.log(`O usuário ${user.username} (${user.id}) foi registrado com sucesso.`))
    .catch(console.log);
}

export const GetAllUsers = async () => await UserModel.find();


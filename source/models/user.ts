import { Document, model, Schema } from "mongoose";

export interface MUser extends Document
{
    id: bigint;
    currentTicket: string;
}

const UserSchema = new Schema<MUser>({
    id: {
        required: true,
        type: BigInt,
    },

    currentTicket: { // Propriedade que armazena o ID do ticket já aberto; null caso não tenha um ticket aberto
        type: String,
        default: null,
    },
})

export const UserModel = model<MUser>("users", UserSchema);
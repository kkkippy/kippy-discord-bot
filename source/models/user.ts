import { model, Schema, Types } from "mongoose";

export interface MUser
{
    id: bigint;

    ticketHistory: Types.ObjectId[];
    currentTicket: Types.ObjectId;
}

const UserSchema = new Schema<MUser>({
    id: {
        required: true,
        type: BigInt,
    },

    ticketHistory: { // Array de tickets já abertos
        type: [Schema.Types.ObjectId],
        ref: "tickets",
    },

    currentTicket: { // Propriedade que armazena o ticket já aberto; null caso não tenha um ticket aberto
        type: Schema.Types.ObjectId,
        default: null,
    },
})

export const UserModel = model<MUser>("users", UserSchema);
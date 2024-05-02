import { model, Schema, Types } from "mongoose";

export interface MTicket
{
    createdBy: Types.ObjectId,
    createdAt: Date,
}

const TicketSchema = new Schema<MTicket>({
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },

    createdAt: {
        default: Date.now,
        type: Date,
    }
})

export const TicketModel = model<MTicket>("tickets", TicketSchema);
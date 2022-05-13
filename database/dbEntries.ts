import { isValidObjectId } from "mongoose";
import { Entry, IEntry } from "../models";
import { db } from ".";
import { json } from "stream/consumers";

export const getEntryById = async (id: string): Promise<IEntry | null> => {
    if(!isValidObjectId) return null;

    await db.connect();
    const entry = await Entry.findById(id).lean();
    // lean se usa cuando se aplica menos data

    await db.disconnect();

    return JSON.parse(JSON.stringify(entry));
}
import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces';

export interface IEntry extends Entry{}

const EntrySchema = new Schema({
    description: { type: String, required: true },
    createAt: { type: Number },
    status: { 
        type: String,
        enum: ['pending', 'in-progress', 'finished'],
        message: '{VALUE} no es un estado válido',
     },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);

const entry = new EntryModel();

export default EntryModel;
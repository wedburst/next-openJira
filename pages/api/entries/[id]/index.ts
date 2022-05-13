import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(req.query);
  // const { id } = req.query;

  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: "ID no es válido " + id });
  // }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    case "GET":
      return getEntry(req, res);

    case "DELETE":
      return deleteEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryInDB = await Entry.findById(id);
  
  if (!entryInDB) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay entradas con este ID: " + id });
  }

  try {
    const deleteEntry = await Entry.deleteOne(
      { _id: id }
    );
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    console.log({ error });
    res
      .status(400)
      .json({ message: "Error al actualizar entrada, BAD REQUEST" });
  }

  return res.status(200).json(entryInDB);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay entradas con este ID: " + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    return res.status(200).json(updatedEntry!);
  } catch (error) {
    await db.disconnect();
    console.log({ error });
    res
      .status(400)
      .json({ message: "Error al actualizar entrada, BAD REQUEST" });
  }

  // entryToUpdate.description = description;
  // entryToUpdate.status = status;
  // await entryToUpdate.save();
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryInDB = await Entry.findById(id);
  await db.disconnect();

  if (!entryInDB) {
    return res
      .status(400)
      .json({ message: "No hay entradas con este ID: " + id });
  }

  return res.status(200).json(entryInDB);
};

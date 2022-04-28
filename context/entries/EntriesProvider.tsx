import React, { FC, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Entry } from "../../interfaces";

import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
}

const UI_INITIALSTATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: "Pendiente: lorem10",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "En-Progreso lorem10",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "Terminadas: lorem10",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};

export const EntriesProvider = ({ children }:any) => {
  const [state, dispath] = useReducer(entriesReducer, UI_INITIALSTATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };
    dispath({ type: "[Entry] - Add-Entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispath({ type: "[Entry] - Update-Entry", payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

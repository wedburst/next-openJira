import React, { FC, useEffect, useReducer } from "react";
// import { v4 as uuidv4 } from "uuid";
import { entriesApi } from "../../apis";

import { Entry } from "../../interfaces";

import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
}

const UI_INITIALSTATE: EntriesState = {
  entries: [],
};

export const EntriesProvider = ({ children }:any) => {
  const [state, dispath] = useReducer(entriesReducer, UI_INITIALSTATE);

  const addNewEntry = async(description: string) => {
    // const newEntry: Entry = {
    //   _id: uuidv4(),
    //   description,
    //   createdAt: Date.now(),
    //   status: "pending",
    // };

    const { data } = await entriesApi.post<Entry>('/entries', {description});
    dispath({ type: "[Entry] - Add-Entry", payload: data });
  };

  const updateEntry = async({_id, description, status}: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status});
      dispath({ type: "[Entry] - Update-Entry", payload: data });
    } catch (error) {
      console.log({error});
    }
  };

  const refreshEntries = async() => {
    const {data} = await entriesApi.get<Entry[]>('/entries');
    dispath({ type: "[Entry] - Refresh-Entry", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

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

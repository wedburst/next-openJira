import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
     entries: Entry[];
     // Method
     addNewEntry: (description: string) => void;
     updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
     deleteEntry: (entryId: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);
import { createContext } from 'react';

interface ContextProps {
     sidemenuOpen: boolean;

     // Method
     openSideMenu: () => void;
     closeSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
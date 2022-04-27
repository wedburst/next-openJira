import React, { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  children?: any;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<UIState> = ({ children }) => {
  const [state, dispath] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispath({ type: "UI - Open Sidebar" });

  const closeSideMenu = () => dispath({ type: "UI - Close Sidebar" });

  const setIsAddingEntry = (isAdding: boolean) => dispath({ type: "UI - is Adding Entry", payload: isAdding });

  const startDragging = () => {
    dispath({type: "UI - Start Dragging"});
  }

  const endDragging = () => {
    dispath({type: "UI - End Dragging"});
  }

  return (
    <UIContext.Provider
      value={{
        // sidemenuOpen: state.sidemenuOpen,
        ...state,

        // Method
        openSideMenu,
        closeSideMenu,
        
        setIsAddingEntry,

        //Dragging
        startDragging,
        endDragging
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

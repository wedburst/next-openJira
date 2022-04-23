import React, { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
  children?: any;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
};

export const UIProvider: FC<UIState> = ({ children }) => {
  const [state, dispath] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispath({ type: "UI - Open Sidebar" });

  const closeSideMenu = () => dispath({ type: "UI - Close Sidebar" });

  return (
    <UIContext.Provider
      value={{
        // sidemenuOpen: state.sidemenuOpen,
        ...state,

        // Method
        openSideMenu,
        closeSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

import { createContext, useState } from "react";
import { coordinatesTypes } from "./coordinates.context";

type undoRedoProviderContextProps = {
  children: React.ReactNode;
};

export type undoRedoContextProps = {
  undoStack: coordinatesTypes[][];
  setUndoStack: React.Dispatch<React.SetStateAction<coordinatesTypes[][]>>;
  redoStack: coordinatesTypes[][];
  setRedoStack: React.Dispatch<React.SetStateAction<coordinatesTypes[][]>>;
};

export const UndoRedoContext = createContext<undoRedoContextProps>({
  undoStack: [],
  setUndoStack: () => null,
  redoStack: [],
  setRedoStack: () => null,
});

export const UndoRedoProvider = ({
  children,
}: undoRedoProviderContextProps) => {
  const [undoStack, setUndoStack] = useState<coordinatesTypes[][]>([]);
  const [redoStack, setRedoStack] = useState<coordinatesTypes[][]>([]);
  const value = { undoStack, setUndoStack, redoStack, setRedoStack };
  return (
    <UndoRedoContext.Provider value={value}>
      {children}
    </UndoRedoContext.Provider>
  );
};

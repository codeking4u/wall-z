import { createContext, useState } from "react";

type canvasProviderContextProps = {
  children: React.ReactNode;
};

export type canvasContextProps = {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
};

export const CanvasContext = createContext<canvasContextProps>({
  width: 0,
  setWidth: () => null,
  height: 0,
  setHeight: () => null,
});

export const CanvasProvider = ({ children }: canvasProviderContextProps) => {
  const [width, setWidth] = useState<number>(700);
  const [height, setHeight] = useState<number>(500);
  const value = { width, height, setWidth, setHeight };
  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
};

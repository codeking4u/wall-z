import { createContext, useState } from "react";

type coordinatesProviderContextProps = {
  children: React.ReactNode;
};

type coordinatesTypes = {
  x: number;
  y: number;
};

export type coordinatesContextProps = {
  wallCoordinates: coordinatesTypes[][];
  setWallCoordinates: React.Dispatch<
    React.SetStateAction<coordinatesTypes[][]>
  >;
  currentPosition: coordinatesTypes[];
  setCurrentPosition: React.Dispatch<React.SetStateAction<coordinatesTypes[]>>;
  lastReference: coordinatesTypes[];
  setLastReference: React.Dispatch<React.SetStateAction<coordinatesTypes[]>>;
  highLight: coordinatesTypes[];
  setHighLight: React.Dispatch<React.SetStateAction<coordinatesTypes[]>>;
  selectedLine: coordinatesTypes[];
  setSelectedLine: React.Dispatch<React.SetStateAction<coordinatesTypes[]>>;
};

export const coordinatesContext = createContext<coordinatesContextProps>({
  wallCoordinates: [],
  setWallCoordinates: () => null,
  currentPosition: [],
  setCurrentPosition: () => null,
  lastReference: [],
  setLastReference: () => null,
  highLight: [],
  setHighLight: () => null,
  selectedLine: [],
  setSelectedLine: () => null,
});

export const CoordinatesProvider = ({
  children,
}: coordinatesProviderContextProps) => {
  const [wallCoordinates, setWallCoordinates] = useState<coordinatesTypes[][]>(
    []
  );
  const [currentPosition, setCurrentPosition] = useState<coordinatesTypes[]>(
    []
  );
  const [lastReference, setLastReference] = useState<coordinatesTypes[]>([]);
  const [highLight, setHighLight] = useState<coordinatesTypes[]>([]);
  const [selectedLine, setSelectedLine] = useState<coordinatesTypes[]>([]);

  const value = {
    wallCoordinates,
    setWallCoordinates,
    currentPosition,
    setCurrentPosition,
    lastReference,
    setLastReference,
    highLight,
    setHighLight,
    selectedLine,
    setSelectedLine,
  };
  return (
    <coordinatesContext.Provider value={value}>
      {children}
    </coordinatesContext.Provider>
  );
};

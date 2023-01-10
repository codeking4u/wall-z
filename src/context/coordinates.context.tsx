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
};

export const coordinatesContext = createContext<coordinatesContextProps>({
  wallCoordinates: [],
  setWallCoordinates: () => null,
  currentPosition: [],
  setCurrentPosition: () => null,
  lastReference: [],
  setLastReference: () => null,
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

  const value = {
    wallCoordinates,
    setWallCoordinates,
    currentPosition,
    setCurrentPosition,
    lastReference,
    setLastReference,
  };
  return (
    <coordinatesContext.Provider value={value}>
      {children}
    </coordinatesContext.Provider>
  );
};

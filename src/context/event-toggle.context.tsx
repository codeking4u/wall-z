import { createContext, useState } from "react";

type eventToggleProviderContextProps = {
  children: React.ReactNode;
};

type eventToggleContextProps = {
  wallEnabled: boolean | null;
  setWallEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const eventToggleContext = createContext<eventToggleContextProps>({
  wallEnabled: false,
  setWallEnabled: () => null,
});

export const EventToggleProvider = ({
  children,
}: eventToggleProviderContextProps) => {
  const [wallEnabled, setWallEnabled] = useState<boolean>(false);
  const value = { wallEnabled, setWallEnabled };
  return (
    <eventToggleContext.Provider value={value}>
      {children}
    </eventToggleContext.Provider>
  );
};

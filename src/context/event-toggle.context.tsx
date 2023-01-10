import { createContext, useState } from "react";

type eventToggleProviderContextProps = {
  children: React.ReactNode;
};

export type eventToggleContextProps = {
  toolEnabled: "CREATE_WALL" | "DELETE_WALL" | null;
  setToolEnabled: React.Dispatch<
    React.SetStateAction<"CREATE_WALL" | "DELETE_WALL" | null>
  >;
};

export const eventToggleContext = createContext<eventToggleContextProps>({
  toolEnabled: null,
  setToolEnabled: () => null,
});

export const EventToggleProvider = ({
  children,
}: eventToggleProviderContextProps) => {
  const [toolEnabled, setToolEnabled] = useState<
    "CREATE_WALL" | "DELETE_WALL" | null
  >(null);
  const value = { toolEnabled, setToolEnabled };
  return (
    <eventToggleContext.Provider value={value}>
      {children}
    </eventToggleContext.Provider>
  );
};

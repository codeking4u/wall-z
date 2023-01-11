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

export const EventToggleContext = createContext<eventToggleContextProps>({
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
    <EventToggleContext.Provider value={value}>
      {children}
    </EventToggleContext.Provider>
  );
};

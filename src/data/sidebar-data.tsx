import { GiBrickWall } from "react-icons/gi";
import { SlCursor } from "react-icons/sl";

type SidebarDataProps = {
  title: string;
  bgcolor: string;
  icon: JSX.Element;
  bcolor: string;
  toolType: "CREATE_WALL" | "DELETE_WALL" | null;
};

export const SidebarData: SidebarDataProps[] = [
  {
    title: "Select wall",
    icon: <SlCursor />,
    bgcolor: "#0097e5",
    bcolor: "#0097e5",
    toolType: "CREATE_WALL",
  },
  {
    title: "Create wall",
    icon: <GiBrickWall />,
    bgcolor: "#000",
    bcolor: "#fff",
    toolType: "DELETE_WALL",
  },
];

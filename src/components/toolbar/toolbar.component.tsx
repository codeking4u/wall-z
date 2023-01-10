import { useContext } from "react";
import { eventToggleContext } from "../../context/event-toggle.context";

import { SidebarData } from "../../data/sidebar-data";

const ToolBar = () => {
  const { wallEnabled, setWallEnabled } = useContext(eventToggleContext);
  return (
    <div className="toolbar">
      <ul className="toolbar__list">
        {SidebarData.map((tool, key) => {
          return (
            <li
              className="toolbar__items"
              key={key}
              onClick={() => {
                console.log("wallEnabled", wallEnabled);
                setWallEnabled(!wallEnabled);
              }}
            >
              <div
                title={tool.title}
                style={{
                  backgroundColor: tool.bgcolor || "none",
                  borderColor: tool.bcolor || "none",
                }}
              >
                {tool.icon}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToolBar;

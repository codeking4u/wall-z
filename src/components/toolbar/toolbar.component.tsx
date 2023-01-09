import { SidebarData } from "../../data/sidebar-data";

const ToolBar = () => {
  return (
    <div className="toolbar">
      <ul className="toolbar__list">
        {SidebarData.map((tool, key) => {
          return (
            <li className="toolbar__items" key={key}>
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

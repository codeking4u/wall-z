import { SidebarData } from "../../data/sidebar-data";

const ToolBar = () => {
  return (
    <div className="toolbar">
      <ul className="toolbar__list">
        {SidebarData.map((tool, key) => {
          return (
            <li className="toolbar__items" key={key}>
              <div
                style={{
                  backgroundColor: tool.bgcolor,
                  borderColor: tool.bcolor,
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

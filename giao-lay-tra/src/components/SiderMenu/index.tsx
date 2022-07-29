import React from "react";
import { Layout, Menu } from "antd";
import s from "./index.module.less";
import { RouteType } from "@/config/routes";
import { useGetCurrentPath } from "@/hooks/useGetCurrentPath";
import { Link } from "react-router-dom";

const { Sider } = Layout;

// const { SubMenu } = Menu;

const SiderMenu: React.FC<{
  collapsed: boolean;
  isMobile: boolean;
  onCollapse: () => void;
}> = ({ collapsed, isMobile, onCollapse }) => {
  let selectedKey = "";
  // let openKey = "";
  const { currentPath, pathList } = useGetCurrentPath("MainLayout");

  if (currentPath) {
    selectedKey = currentPath?.key;
    // openKey = "station" || currentPath?.openTab || "";
  }

  const handleCollapseMobile = () => {
    if (isMobile) {
      onCollapse();
    }
  };

  const renderMenuItem = (
    item: RouteType,
    index: number
  ): JSX.Element | boolean => {
    const { title, key, path = "", hideInMenu, icon } = item;
    return (
      !hideInMenu && (
        <Menu.Item key={key} icon={icon} onClick={handleCollapseMobile}>
          <Link to={path}>{title}</Link>
        </Menu.Item>
      )
    );
  };

  const renderSubMenu = (item: RouteType, index: number) => {
    const { subRoutes = [] } = item;
    return (
      <React.Fragment key={index}>
        {subRoutes.map((item) => renderMenuItem(item, index))}
        <div className={s.divider} />
      </React.Fragment>
    );
  };

  return (
    <>
      <Sider className={s.sider} collapsed={collapsed} collapsedWidth={0}>
        <Menu
          theme="light"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          // defaultOpenKeys={[openKey]}
          mode="inline"
        >
          {Array.isArray(pathList) &&
            pathList.map((item, idx) => {
              const { isParent } = item;
              return isParent
                ? renderSubMenu(item, idx)
                : renderMenuItem(item, idx);
            })}
        </Menu>
      </Sider>
      {isMobile && !collapsed && (
        <div className={s.overlay} onClick={onCollapse} />
      )}
    </>
  );
};

export default SiderMenu;

import React from "react";
import { Layout, Menu } from "antd";
import s from "./index.module.less";
import { RouteType } from "@/config/routes";
import { useGetCurrentPath } from "@/hooks/useGetCurrentPath";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Link } from "react-router-dom";
import { checkPermission } from "@/utils/utils";

const { Sider } = Layout;

const SiderMenu: React.FC<{
  collapsed: boolean;
  isMobile: boolean;
  onCollapse: () => void;
}> = ({ collapsed, isMobile, onCollapse }) => {
  let selectedKey = "";
  const { currentPath, pathList } = useGetCurrentPath("MainLayout");
  const { permissions = [] } = useTypedSelector((state) => state.user);
  if (currentPath) {
    selectedKey = currentPath?.key;
  }

  const handleCollapseMobile = () => {
    if (isMobile) {
      onCollapse();
    }
  };

  const renderMenuItem = (item: RouteType): JSX.Element | boolean | null => {
    const { title, key, path, hideInMenu, icon, permission } = item;
    const check = checkPermission(permissions, permission);
    if (!check) return null;
    return (
      !hideInMenu && (
        <Menu.Item key={key} icon={icon} onClick={handleCollapseMobile}>
          <Link to={path}>{title}</Link>
        </Menu.Item>
      )
    );
  };

  return (
    <>
      <Sider className={s.sider} collapsed={collapsed} collapsedWidth={0}>
        <Menu
          theme="light"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          mode="inline"
        >
          {Array.isArray(pathList) &&
            pathList.map((item) => {
              return renderMenuItem(item);
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

import React, { useState, useCallback } from "react";
import { Layout, Avatar, Dropdown, Select } from "antd";
import styles from "./index.module.less";
import logo from "@/assets/images/logo.svg";
import ViewSelectApp from "../ViewSelectApp";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { logout } from "@/services/auth";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { UserOutlined } from "@ant-design/icons";
import iconClose from "@/assets/images/SelectAppClose.png";
import iconOpen from "@/assets/images/SelectAppOpen.png";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { getLocalStorage, setLocalStorage } from "@/utils/utils";

const { Header } = Layout;
const { Option } = Select;

const ComponentHeader: React.FC<{
  onCollapse: () => void;
  collapsed: boolean;
  hubList: { hubId: string; hubName: string }[];
}> = ({ onCollapse, collapsed, hubList }) => {
  const { currentUser: { userInfo = {} } = {} } = useTypedSelector(
    (state) => state.user
  );

  const { ssoId = "", profile: { fullname = "" } = {} } = userInfo;

  const [openViewSelectApp, setOpenViewSelectApp] = useState<boolean>(false);

  const handleOpenModal = useCallback(() => {
    setOpenViewSelectApp((prevState) => !prevState);
  }, []);

  const genViewLogout = (
    <div className={styles.contentDropdown}>
      <div className={styles.viewInfo}>
        <Avatar size={56} icon={<UserOutlined />} />
        <p className={styles.textName}>{`${ssoId} - ${
          fullname || "User name"
        }`}</p>
        <p className={styles.textTitle}>Sorting Supervisor</p>
      </div>
      <div className={styles.viewLogout} onClick={() => logout()}>
        <FaSignOutAlt />
        <span>Đăng xuất</span>
      </div>
    </div>
  );

  const handleSelectHub = (id: string) => {
    setLocalStorage("CURRENT_HUB", id);
    window.location.href = "/ktc-lc";
  };

  const currentHub = getLocalStorage("CURRENT_HUB");

  return (
    <>
      <Header className={styles.header}>
        <div className={styles.viewLogo}>
          {collapsed ? (
            <AiOutlineMenuUnfold
              onClick={onCollapse}
              className={styles.iconMenu}
            />
          ) : (
            <AiOutlineMenuFold
              onClick={onCollapse}
              className={styles.iconMenu}
            />
          )}

          <Link to="/">
            <img className={styles.logo} src={logo} alt="logo" />
          </Link>
          <span style={{ textTransform: "uppercase" }}>KTC & LC</span>
        </div>
        <div className={styles.contentRight}>
          <Select
            value={currentHub}
            suffixIcon={<FaChevronDown />}
            showSearch
            filterOption={(input, option: any) => {
              const { children = "" } = option;
              return children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
            onChange={handleSelectHub}
          >
            {hubList.map((hubInfo: any) => (
              <Option value={hubInfo?.hubId} key={hubInfo?.hubId}>
                {hubInfo?.hubName}
              </Option>
            ))}
          </Select>
          <Dropdown overlay={genViewLogout} placement="bottom">
            <Avatar
              className={styles.avatar}
              size={40}
              icon={<UserOutlined />}
            />
          </Dropdown>
          <img
            src={!openViewSelectApp ? iconClose : iconOpen}
            alt="toggle"
            onClick={handleOpenModal}
          />
        </div>
      </Header>
      <ViewSelectApp isOpen={openViewSelectApp} />
    </>
  );
};

export default ComponentHeader;

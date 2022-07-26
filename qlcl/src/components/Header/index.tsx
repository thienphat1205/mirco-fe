import React, { useState, useEffect, useCallback } from "react";
import { Layout, Avatar, Dropdown } from "antd";
import styles from "./index.module.less";
import logo from "@/assets/images/logo.png";
import ViewSelectApp from "../ViewSelectApp";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "@/services/auth";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { UserOutlined } from "@ant-design/icons";
import iconClose from "@/assets/images/SelectAppClose.png";
import iconOpen from "@/assets/images/SelectAppOpen.png";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import SearchHeader from "../SearchHeader";

const { Header } = Layout;

const ComponentHeader: React.FC<{
  onCollapse: () => void;
  collapsed: boolean;
}> = ({ onCollapse, collapsed }) => {
  const { currentUser: { userInfo = {} } = {} } = useTypedSelector(
    (state) => state.user
  );

  const { ssoId = "", profile: { fullname = "" } = {} } = userInfo;

  const [borderChange, setBorderChange] = useState<boolean>(false);

  const [openViewSelectApp, setOpenViewSelectApp] = useState<boolean>(false);

  useEffect(() => {
    const handleBorderChange = () => {
      if (window.scrollY >= 65) {
        setBorderChange(true);
      } else {
        setBorderChange(false);
      }
    };
    window.addEventListener("scroll", handleBorderChange);

    return function cleanup() {
      window.removeEventListener("scroll", handleBorderChange);
    };
  });

  const handleOpenModal = useCallback(() => {
    setOpenViewSelectApp((prevState) => !prevState);
  }, []);

  const genViewLogout = (
    <div className={styles.viewLogout} onClick={() => logout()}>
      <FaSignOutAlt />
      <span>Đăng xuất</span>
    </div>
  );

  return (
    <>
      <Header
        className={styles.header}
        style={
          borderChange
            ? {
                backgroundColor: "#f7f7f7",
                boxShadow: "4px 0 20px -5px rgb(0 0 0 / 10%)",
              }
            : {}
        }
      >
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
          <span style={{ textTransform: "uppercase" }}>
            HT quản lý chất lượng
          </span>
        </div>
        <div
          className={styles.inputSearchHeader}
          style={{ visibility: "hidden" }}
        >
          <SearchHeader />
        </div>

        <div className={styles.contentRight}>
          <Avatar className={styles.avatar} size={40} icon={<UserOutlined />} />
          <Dropdown overlay={genViewLogout}>
            <div className={styles.userName}>
              <span>{`${ssoId} - ${fullname || "User name"}`}</span>
            </div>
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

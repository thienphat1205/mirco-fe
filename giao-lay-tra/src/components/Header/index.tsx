import React, { useState, useEffect, useCallback } from "react";
import { Layout, Avatar, Dropdown } from "antd";
import styles from "./index.module.less";
// import { FaSearch } from "react-icons/fa";
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

const { Header } = Layout;

const ComponentHeader: React.FC<{
  onCollapse: () => void;
  collapsed: boolean;
}> = ({ onCollapse, collapsed }) => {
  const { currentUser: { userInfo: { ssoId = "", profile = {} } = {} } = {} } =
    useTypedSelector((state) => state.user);

  // const [q, setQ] = useState<string | undefined>(undefined);

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

  // const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setQ(event.target.value);
  // };

  const handleOpenModal = useCallback(() => {
    setOpenViewSelectApp((prevState) => !prevState);
  }, []);

  // const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   const { key } = e;
  //   if (key === "Enter" && q) {
  //     console.log("Key search", q);
  //   }
  // };

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
          <span>Giao-Lấy-Trả</span>
        </div>
        <div className={styles.inputSearchHeader}>
          {/* <Input
            placeholder="Tìm kiếm"
            prefix={<FaSearch />}
            onPressEnter={handleSearch}
            onChange={handleChangeInput}
            allowClear
            disabled
          /> */}
        </div>

        <div className={styles.contentRight}>
          <Avatar className={styles.avatar} size={40} icon={<UserOutlined />} />
          <Dropdown overlay={genViewLogout}>
            <div className={styles.userName}>
              <span>{`${ssoId} - ${profile?.fullname || "User name"}`}</span>
            </div>
          </Dropdown>
          {!openViewSelectApp ? (
            <img src={iconClose} alt="toggle" onClick={handleOpenModal} />
          ) : (
            <img src={iconOpen} alt="toggle" onClick={handleOpenModal} />
          )}
        </div>
      </Header>
      <ViewSelectApp isOpen={openViewSelectApp} />
    </>
  );
};

export default ComponentHeader;

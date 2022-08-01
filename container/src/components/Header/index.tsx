import logo from "@/assets/images/logo.svg";
import iconClose from "@/assets/images/SelectAppClose.png";
import iconOpen from "@/assets/images/SelectAppOpen.png";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { logout } from "@/services/auth";
import { updateCollapseHeader } from "@/state/reducers/commonReducer";
import { getLocalStorage, setLocalStorage } from "@/utils/utils";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Select } from "antd";
import React, { useCallback, useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ViewSelectApp from "../ViewSelectApp";
import styles from "./index.module.less";

const { Header } = Layout;
const { Option } = Select;

const ComponentHeader: React.FC<{
  hubList: { hubId: string; hubName: string }[];
}> = ({ hubList }) => {
  const { currentUser: { userInfo = {} } = {} } = useTypedSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const { collapse } = useTypedSelector((state) => state.commonReducer) || {};

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

  const dispatch = useDispatch();

  const handleCollapse = () => {
    dispatch(updateCollapseHeader(!collapse));
  };

  return (
    <>
      <Header className={styles.header}>
        <div className={styles.viewLogo}>
          {collapse ? (
            <AiOutlineMenuUnfold
              onClick={handleCollapse}
              className={styles.iconMenu}
            />
          ) : (
            <AiOutlineMenuFold
              onClick={handleCollapse}
              className={styles.iconMenu}
            />
          )}

          <img
            className={styles.logo}
            style={{ cursor: "pointer" }}
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
          />

          <span style={{ textTransform: "uppercase" }}>Demo Micro FE</span>
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
      <ViewSelectApp
        isOpen={openViewSelectApp}
        onClose={() => setOpenViewSelectApp(false)}
      />
    </>
  );
};

export default ComponentHeader;

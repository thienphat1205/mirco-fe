/* eslint-disable no-sparse-arrays */
/* eslint-disable react/no-array-index-key */
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Row, Col, Input } from "antd";
import React from "react";
import classnames from "classnames";
import s from "./index.module.less";

const { Search } = Input;

const ViewSelectDriver: React.FC<any> = (props) => {
  const renderItemDriver = (item: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onSelect, driverSelected } = props;
    return (
      <div
        className={classnames(s.itemDriver, {
          [s.itemDriver__active]: driverSelected === item?.id,
        })}
        // onClick={() => onSelect(item?.id)}
      >
        <Avatar shape="square" size="large" icon={<UserOutlined />} />
        <div className={s.itemDriver__info}>
          <p className={s.name}>{item?.name}</p>
          <i style={{ color: "green" }}>Đang rãnh</i>
        </div>
      </div>
    );
  };

  const arr = [
    { id: "5f21a53038a51c1edac6ff51", name: "1879450 - Bùi Minh Thế" },
  ];
  return (
    <div className={s.viewSelectDriver}>
      <div style={{ padding: "1rem" }}>
        <Search
          placeholder="search"
          // onSearch={onSearch}
          enterButton
          size="large"
        />
      </div>
      <div className={s.viewListDriver}>
        <Row gutter={[20, 20]}>
          {arr.map((item, index) => (
            <Col lg={8} md={12} xs={24} key={index}>
              {renderItemDriver(item)}
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ViewSelectDriver;

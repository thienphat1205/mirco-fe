import React from "react";
import { Table, Button, Input } from "antd";
import s from "./index.module.less";

const { TextArea } = Input;

const Check: React.FC = () => {
  const dataSource = [
    {
      key: "1",
      area: "Quận 9",
      user: "Hường QC test - xxxxxx9157",
      orderCodes: ["ZYB3H"],
      text: "Không có thông tin tuyến",
      address: "2041820 - Võ Trịnh Thức Tuyến A1",
    },
  ];
  const columns = [
    {
      title: (
        <div className={s.header__info}>
          <p>Thông tin địa chỉ</p>
          <p className={s.subTitle}>1 ĐIỂM GIAO - 1 ĐƠN HÀNG</p>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      render: (_: any, row: any) => {
        const { area, user, orderCodes } = row;
        return (
          <div>
            <div style={{ fontWeight: "bold" }}>{area}</div>
            <div>{user}</div>
            <div>{orderCodes.length} đơn hàng</div>
            <div>{orderCodes.toString().replaceAll(",", ", ")}</div>
          </div>
        );
      },
    },
    {
      title: "Tuyến auto",
      dataIndex: "text",
      key: "text",
      render: (value: string | undefined) => (
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>{value}</div>
      ),
    },
    {
      title: "Tuyến",
      dataIndex: "address",
      key: "address",
      render: (value: string | undefined) => (
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>{value}</div>
      ),
    },
    {
      title: (
        <div className={s.header__reason}>
          <div>Lí do</div>
          <Button type="primary">Hoàn tất</Button>
        </div>
      ),
      dataIndex: "x",
      key: "x",
      render: () => {
        return (
          <TextArea
            placeholder="Nhập lí do"
            rows={3}
            className={s.header__textArea}
          />
        );
      },
    },
  ];

  return (
    <div className={s.check}>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default Check;

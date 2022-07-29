import { Table, Select } from "antd";
import React, { useState } from "react";
import s from "./index.module.less";

const { Option } = Select;

const UnpaidTable: React.FC<any> = ({ data = [] }) => {
  const [driverSelected, setDriverSelected] = useState<string>("");

  const onChangeSelect = (driverSelected: string) => {
    setDriverSelected(driverSelected);
  };

  const columns = [
    {
      title: "CBĐP",
      dataIndex: "driverId",
      key: "driverId",
      width: 250,
      render: (_: any, record: any) =>
        record?.driverId && (
          <>
            <p style={{ margin: 0 }}>{record?.driverId}</p>
            <p style={{ margin: 0 }}>{record?.driverName}</p>
          </>
        ),
    },
    {
      title: "Mã chuyến đi",
      dataIndex: "tripId",
      key: "tripId",
    },
    {
      title: "Đối tác",
      dataIndex: "servicePartner",
      key: "servicePartner",
    },
    {
      title: "ĐH cần thu",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Tiền cần thu",
      dataIndex: "amountOrder",
      key: "amountOrder",
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "",
      // render: () => (
      // <Button type="primary">
      //   {formatMessage({ id: "button.createReceipts" })}
      // </Button>
      // ),
    },
  ];
  let dataTable = data;
  if (driverSelected) {
    dataTable = data.filter((item: any) => item?.driverId === driverSelected);
  }

  return (
    <div className={s.unpaidTable}>
      <Select
        showSearch
        allowClear
        className={s.selectDriver}
        placeholder={"Chọn CBĐP"}
        optionFilterProp="children"
        onChange={onChangeSelect}
        filterOption={(input, option: any = {}) => {
          const { children = "" } = option;
          return children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
      >
        {data.map((item: any) => (
          <Option key={item?.driverId}>{item?.driver}</Option>
        ))}
      </Select>
      <Table
        loading={false}
        dataSource={dataTable}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={false}
      />
    </div>
  );
};

export default UnpaidTable;

import React from "react";
import { Table } from "antd";

const History: React.FC<any> = (props) => {
  const { data } = props;
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Người cập nhật",
      dataIndex: "updateBy",
      key: "updateBy",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];
  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ showSizeChanger: true }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default History;

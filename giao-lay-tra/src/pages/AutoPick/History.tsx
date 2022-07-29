import React from "react";
import s from "./index.module.less";
import { Select, Table, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const dataTable = [
  {
    id: "12345",
    no: 1,
    datetime: "25/03/2022 01:04:00",
    createdBy: "SYSTEM_AUTO - Hệ thống Auto",
    actionType: "Tạo chuyến giao tự động",
    note: "Tạo (Mới) chuyến đi giao tự động",
  },
];

interface IPagination {
  page: number;
  limit: number;
}

const History: React.FC = () => {
  const [pagination, setPagination] = React.useState<IPagination>({
    page: 1,
    limit: 10,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = React.useState<any>({
    list: [...dataTable],
    total: dataTable.length,
  });

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination({ limit: pageSize, page: current });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "no",
    },
    {
      title: "Thời gian",
      dataIndex: "datetime",
    },
    {
      title: "Người thao tác",
      dataIndex: "createdBy",
    },
    {
      title: "Thao tác",
      dataIndex: "actionType",
    },
    {
      title: "Nội dung",
      dataIndex: "note",
    },
  ];

  return (
    <div className={s.history}>
      <div className={s.viewFilter}>
        <div className={s.selectAction}>
          <Select placeholder="Thao tác" allowClear>
            <Option key="210908">Chỉ định cửa hàng cho NVPTTT</Option>
          </Select>
        </div>
        <Button type="primary" icon={<SearchOutlined />}>
          Tìm kiếm
        </Button>
      </div>
      <div className={s.viewTable}>
        <Table
          loading={false}
          rowKey="id"
          dataSource={data?.list}
          columns={columns}
          scroll={{ x: "max-content" }}
          pagination={{
            current: pagination?.page,
            pageSize: pagination?.limit,
            showSizeChanger: true,
            total: data?.total,
            showTotal: (total, range) =>
              `Hiển thị ${range[0]}-${range[1]} trong tổng ${total} kết quả`,
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default History;

import React from "react";
import s from "./index.module.less";
import { Table, Form, Row, Col, Input, DatePicker, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

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

  const onFinish = (values: any): void => {
    console.log("values", values);
  };

  return (
    <div className={s.history}>
      <div className={s.viewFilter}>
        <Form name="form-filter" onFinish={onFinish}>
          <Row gutter={[20, 20]}>
            <Col lg={6} md={12} sm={12} xs={24}>
              <Form.Item name="time">
                <RangePicker />
              </Form.Item>
            </Col>
            <Col lg={4} md={12} sm={12} xs={24}>
              <Form.Item name="userId">
                <Input placeholder="Người thao tác" />
              </Form.Item>
            </Col>
            <Col lg={4} md={12} sm={12} xs={24}>
              <Form.Item name="action">
                <Select placeholder="Thao tác">
                  <Option value="CREATE_AUTO_DELIVER_TRIP">
                    Tạo chuyến giao tự động
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={4} md={12} sm={12} xs={24}>
              <Form.Item name="tripCodeLM">
                <Input placeholder="Mã chuyến LM" />
              </Form.Item>
            </Col>
            <Col lg={3} md={12} sm={12} xs={24}>
              <Form.Item name="orderCode">
                <Input placeholder="Mã đơn hàng" />
              </Form.Item>
            </Col>
            <Col lg={3} md={12} sm={12} xs={24}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                icon={<SearchOutlined />}
              >
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Form>
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

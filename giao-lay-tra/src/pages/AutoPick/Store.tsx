import React from "react";
import s from "./index.module.less";
import { Input, Row, Col, Select, Table, Button } from "antd";
import ModalConfirmRemove from "@/components/ModalConfirmRemove";

const { Option } = Select;

const dataTable = [
  {
    id: "12345",
    storeInfo: "500383 - ***************** hãng",
    phone: "*****37005",
    areaPick: "Phường Hiệp Phú - Quận 9",
    employeePick: "1707262 - Phan Hoành",
  },
];

interface IPagination {
  page: number;
  limit: number;
}

const Store: React.FC = () => {
  const [pagination, setPagination] = React.useState<IPagination>({
    page: 1,
    limit: 10,
  });

  const [visible, setVisible] = React.useState<boolean>(false);

  const [itemSelected, setItemSelected] = React.useState<object>({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = React.useState<any>({
    list: [...dataTable],
    total: dataTable.length,
  });

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination({ limit: pageSize, page: current });
  };

  const handleConfirmRemove = (record: any) => {
    setItemSelected(record);
    setVisible(true);
  };

  const handleCancelModal = React.useCallback(() => {
    setItemSelected({});
    setVisible(false);
  }, []);

  const handleRemove = React.useCallback(() => {
    console.log("ITEM SELECTED", itemSelected);
    handleCancelModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Cửa hàng",
      dataIndex: "storeInfo",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Khu vực lấy hàng",
      dataIndex: "areaPick",
    },
    {
      title: "Nhân viên PTTT lấy hàng",
      dataIndex: "employeePick",
    },
    {
      title: null,
      dataIndex: "x",
      render: (_: any, row: any) => (
        <Button onClick={() => handleConfirmRemove(row)} danger type="primary">
          Huỷ
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className={s.store}>
        <div className={s.viewFilter}>
          <Row gutter={[20, 20]}>
            <Col lg={8} md={8} sm={24}>
              <div className={s.inputOrderCode}>
                <Input placeholder="Nhập hoặc scan barcode" allowClear />
              </div>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <div className={s.selectAction}>
                <Select placeholder="Thao tác" allowClear>
                  <Option key="210908">210908 - Nguyễn Thanh Khanh</Option>
                </Select>
              </div>
            </Col>
          </Row>
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
      <ModalConfirmRemove
        visible={visible}
        onCancel={handleCancelModal}
        onOk={handleRemove}
        loading={false}
        description="Bạn có chắc chắn muốn xoá cài đặt này ?"
      />
    </>
  );
};

export default Store;

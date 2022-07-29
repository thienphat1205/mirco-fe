import React from "react";
import { Row, Col, Button, Table, Tag } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import FormFilter from "./FormFilter";
import ActionStatusPicking from "./ActionStatusPicking";
import styles from "./index.module.less";

const OrderListInTripDetail: React.FC<any> = (props) => {
  const { orderList = [] } = props;
  const tagStatus: any = {
    PICKING: {
      color: "#00467F",
      text: "Lấy",
    },
  };
  const columsTable = [
    {
      title: "Mã số",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Loại",
      dataIndex: "status",
      key: "status",
      render: (value: any) => (
        <Tag className={styles.tag} color={tagStatus[value]?.color}>
          {tagStatus[value]?.text}
        </Tag>
      ),
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (_: any, row: any) => {
        const { address, coordinates } = row;
        return (
          <div className={styles.viewAddress}>
            <p>{address}</p>
            <p style={{ color: "#a76" }}>{coordinates}</p>
          </div>
        );
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "sender",
      key: "sender",
      render: (_: any, row: any) => {
        const { sender, receiver } = row;
        return (
          <div className={styles.viewAddress}>
            <p>
              <strong>Gửi: </strong>
              <span>{sender}</span>
            </p>
            <p>
              <strong>Nhận: </strong>
              <span>{receiver}</span>
            </p>
          </div>
        );
      },
    },
    {
      title: "Phải thu",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Trạng thái",
      dataIndex: "",
      key: "x",
      render: (_: any, row: any) => {
        switch (row.status) {
          case "PICKING":
            return <ActionStatusPicking record={row} />;
          default:
            return <ActionStatusPicking record={row} />;
        }
      },
    },
  ];
  return (
    <div className={styles.root}>
      <Row gutter={[20, 20]}>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <strong style={{ textTransform: "uppercase" }}>5 Đơn hàng</strong>
        </Col>
        <Col
          md={{ span: 5, offset: 11 }}
          xxl={{ span: 3, offset: 13 }}
          xs={{ span: 24 }}
          className={styles.viewColRight}
        >
          <strong>Lấy: 5 | Giao: 0 | Trả: 0</strong>
        </Col>
      </Row>
      <div style={{ margin: "1rem 0" }}>
        <Row gutter={[20, 20]}>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <FormFilter />
          </Col>
          <Col
            md={{ span: 5, offset: 7 }}
            xxl={{ span: 3, offset: 13 }}
            xs={{ span: 24 }}
            className={styles.viewColRight}
          >
            <Button type="primary" icon={<SaveOutlined />}>
              Lưu trạng thái
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        dataSource={orderList}
        columns={columsTable}
        pagination={{ showSizeChanger: true }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default OrderListInTripDetail;

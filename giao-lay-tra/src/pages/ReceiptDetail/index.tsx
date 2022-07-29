import React from "react";
import { Row, Col, Button, Table, Tag } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import NotFound from "../NotFound";
import { useParams, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import CustomTitle from "@/components/CustomTitle";

const data = [
  {
    no: 1,
    orderCode: "ZH6J8",
    tripCode: "2171479PACW40",
    senderName: "Kho 1479 - Bình Thạnh 2457",
    senderPhone: "******9975",
    receiverName: "Phường 1 - Quận 3",
    receiverPhone: "******9972",
    type: "Lấy",
    dateTime: "09/07/2021 - 15:29:21",
    amount: "18.700",
  },
  {
    no: 2,
    orderCode: "ZH6J2",
    tripCode: "3333479PACW40",
    senderName: "Kho 1479 - Bình Thạnh 2457",
    senderPhone: "******9975",
    receiverName: "Phường 1 - Quận 3",
    receiverPhone: "******9972",
    type: "Lấy",
    dateTime: "09/07/2021 - 15:29:21",
    amount: "18.700",
  },
];

const ReceiptDetail: React.FC = () => {
  const { id: receiptCode = "" } = useParams();
  const navigate = useNavigate();
  if (!receiptCode) {
    return <NotFound />;
  }
  const renderInfo = (name: string, phone: string) => {
    return (
      <>
        <p style={{ margin: 0 }}>
          <strong>Tên: </strong> <span>{name}</span>
        </p>
        <p style={{ margin: 0 }}>
          <strong>SĐT: </strong> <span>{phone}</span>
        </p>
      </>
    );
  };

  const info = [
    {
      label: "Người tạo: ",
      value: "0001 - Nguyễn Thiên Phát",
    },
    {
      label: "Người nộp tiền: ",
      value: "2033898 - Nguyễn Hoàng Tuấn",
    },
    {
      label: "Ngày tạo: ",
      value: "09/07/2021 - 15:29:21",
    },
    {
      label: `Tổng tiền: `,
      value: "18.700 (VNĐ)",
    },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: "Mã chuyến đi",
      dataIndex: "tripCode",
      key: "tripCode",
      // render: (value) => (
      //   <Link
      //     to={() => {
      //       return { pathname: "/trip/detail", query: { id: value } };
      //     }}
      //   >
      //     {value}
      //   </Link>
      // ),
    },
    {
      title: "Mã PT Internal",
      dataIndex: "",
      key: "x",
      render: () => (
        <Tag color="#4CAF50" style={{ fontWeight: "500" }}>
          Đã Thu
        </Tag>
      ),
    },
    {
      title: "Người gửi",
      dataIndex: "senderName",
      key: "senderName",
      render: (_: any, row: any) =>
        renderInfo(row?.senderName, row.senderPhone),
    },
    {
      title: "Người nhận",
      dataIndex: "receiverName",
      key: "receiverName",
      render: (_: any, row: any) =>
        renderInfo(row?.receiverName, row.receiverPhone),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Người lập phiếu",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      key: "amount",
    },
  ];
  return (
    <div className={styles.root}>
      <div className={styles.titlePage}>
        <div className={styles.viewRight}>
          <div className={styles.btnBack} onClick={() => navigate(-1)}>
            <FaAngleLeft style={{ marginRight: "8px" }} />
            Quay lại
          </div>
          <span>Chi tiết phiếu thu</span>
          <span className={styles.receiptCode}>{receiptCode}</span>
        </div>
        <Button type="primary" icon={<PrinterOutlined />}>
          In phiếu thu
        </Button>
      </div>
      <div className={styles.content}>
        <CustomTitle title="Thông tin phiếu thu" />
        <Row gutter={[20, 5]} className={styles.viewInfoList}>
          {info.map((info: any, idx: number) => (
            <Col md={8} sm={12} xs={24} key={idx}>
              <p className={styles.textLabel}>{info?.label}</p>
              <p className={styles.textValue}>{info?.value}</p>
            </Col>
          ))}
        </Row>

        <CustomTitle title="Danh sách đơn hàng" />
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ showSizeChanger: true }}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default ReceiptDetail;

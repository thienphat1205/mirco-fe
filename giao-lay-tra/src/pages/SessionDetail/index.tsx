import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tag, Row, Col, Input, Table } from "antd";
import NotFound from "../NotFound";
import CustomTitle from "@/components/CustomTitle";
import s from "./index.module.less";
import { FaAngleLeft } from "react-icons/fa";

const SessionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  if (!id) {
    return <NotFound />;
  }
  const infoList = [
    { label: "Đối tác", value: " 9794 - sendo_In" },
    { label: "Biển số xe", value: "23456" },
    { label: "Tên người nhận", value: "Phát" },
    { label: "SĐT người nhận", value: "0339798626" },
    { label: "Thời gian tạo", value: "31/03/2022 17:20:52" },
    { label: "Nhân viên tạo", value: "1004 - Mai Hoàng Test Tên Hơi Dài" },
  ];
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "code",
    },
    {
      title: "Nhân viên",
      dataIndex: "partner",
    },
    {
      title: "Mã đơn GHN",
      dataIndex: "status",
    },
    {
      title: "Mã đơn khách hàng",
      dataIndex: "createdAt",
    },
    {
      title: "Loại",
      dataIndex: "finishAt",
    },
    {
      title: "Thao tác",
      dataIndex: "employee",
    },
  ];
  return (
    <div className={s.root}>
      <div className={s.titlePage}>
        <div className={s.btnBack} onClick={() => navigate(-1)}>
          <FaAngleLeft style={{ marginRight: "8px" }} />
          Quay lại
        </div>
        <span>Phiên lấy hàng</span>
        <span className={s.sessionId}>{id}</span>
        <Tag color="blue">Đang bàn giao</Tag>
      </div>
      <div className={s.content}>
        <CustomTitle title="Thông tin phiên" />
        <Row gutter={[20, 5]} className={s.viewInfoList}>
          {infoList.map((info: any, idx: number) => (
            <Col md={8} sm={12} xs={24} key={idx}>
              <p className={s.textLabel}>{info?.label}</p>
              <p className={s.textValue}>{info?.value}</p>
            </Col>
          ))}
        </Row>
        <CustomTitle title="Danh sách đơn" />
        <div className={s.viewBottom}>
          <div className={s.scan}>
            <p>
              Số đơn đã bàn giao: <span className={s.highlightNumber}>0</span>
            </p>
            <Input
              className={s.input}
              placeholder="Quét mã đơn để bàn giao. Nhâp END để kết thúc"
            />
          </div>
          <Table
            loading={false}
            rowKey="orderCode"
            dataSource={[]}
            columns={columns}
            scroll={{ x: "max-content" }}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;

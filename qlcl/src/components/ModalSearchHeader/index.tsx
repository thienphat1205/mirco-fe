import React, { useEffect } from "react";
import { Modal, Button, Table } from "antd";
import styles from "./index.module.less";
import closeIcon from "@/assets/images/closeIcon.png";
import moment from "moment";
import { formatTime } from "@/utils/utils";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
interface ModalProps {
  visible: boolean;

  handleCancel: () => void;

  orderCode: string | undefined;
}

const ContentModal: React.FC<
  Pick<ModalProps, "orderCode" | "handleCancel">
> = ({ orderCode, handleCancel }) => {
  const navigate = useNavigate();
  const { ticketStatusList = [] } = useTypedSelector((state) => state.metaData);

  const handleClickRow = (row: any) => {
    const { ticketId = "" } = row;
    if (ticketId) {
      navigate(`/detail/${ticketId}`);
    }
    handleCancel();
  };

  const dataSource = [
    {
      ticketId: "XL221568464256",
      orderCode: "ZYNQF",
      status: "EXPLAINING",
      deadline: "2022-03-12T03:06:36.397Z",
    },
    {
      ticketId: "XL221611907492",
      orderCode: "ZYNS0",
      status: "EXPLAINING",
      deadline: "2022-03-12T03:06:36.397Z",
    },
  ];

  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "ticketId",
    },
    {
      title: "Mã đơn",
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value: any) =>
        ticketStatusList.find((item) => item?.id === value)?.name || value,
    },
    {
      title: "Hết hạn",
      dataIndex: "deadline",
      key: "deadline",
      render: (value: any) => value && moment(value).format(formatTime),
    },
  ];

  return (
    <div className={styles.contentModal}>
      <div className={styles.headerModal}>
        <p>Đang tìm theo "{orderCode}"</p>
      </div>
      <Table
        rowKey="ticketId"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => handleClickRow(record),
          };
        }}
      />
      <div className={styles.viewFooter}>
        <Button type="primary" onClick={handleCancel}>
          Đóng
        </Button>
      </div>
    </div>
  );
};

const ModalSearchHeader: React.FC<ModalProps> = ({
  visible,
  handleCancel,
  orderCode,
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      className={styles.root}
      footer={null}
      width={800}
      closeIcon={<img src={closeIcon} alt="close" />}
    >
      <ContentModal orderCode={orderCode} handleCancel={handleCancel} />
    </Modal>
  );
};

export default ModalSearchHeader;

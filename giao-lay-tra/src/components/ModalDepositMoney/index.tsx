import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Row, Col, Input, notification } from "antd";
import styles from "./index.module.less";
import closeIcon from "@/assets/images/closeIcon.png";
import numeral from "numeral";

const { Search } = Input;

interface ModalProps {
  visible: boolean;

  handleCancel: () => void;

  itemSelected: any;

  keyModal: number;
}

const ModalDepositMoney: React.FC<ModalProps> = ({
  visible,
  handleCancel,
  itemSelected,
  keyModal,
}) => {
  const { name, amount, coinsPackage, endowAmount } = itemSelected;

  const [payer, setPayer] = useState<any>(undefined);

  useEffect(() => {
    setPayer(undefined);
  }, [keyModal]);

  const dataList = [
    {
      label: "Gói xu nạp",
      value: `${coinsPackage} - ${name}`,
    },
    {
      label: "Nội dung",
      value: name,
    },
    {
      label: "Giá tiền",
      value: numeral(itemSelected.amount).format("0,0 VNĐ"),
    },
    {
      label: "Tổng xu",
      value: `Xu chính: ${numeral(amount).format(
        "0,0"
      )} - Xu khuyến mãi: ${numeral(endowAmount).format("0,0")}`,
    },
  ];

  const onSearch = (value: string) => {
    if (!value) {
      return notification.warning({
        message: "Nhập số điện thoại",
      });
    }
    if (value !== "0123456789") {
      return notification.error({
        message: "Không tìm thấy khách hàng",
      });
    }
    if (value === "0123456789") {
      setPayer({});
    }
  };

  return (
    <Modal
      title="Nạp ví"
      className={styles.root}
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button
          key="cancel"
          onClick={handleCancel}
          className={styles.btnCancel}
        >
          Huỷ
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={!payer}
          className={styles.btnSubmit}
          //   loading={loading}
          onClick={handleCancel}
        >
          Xác nhận
        </Button>,
      ]}
      closeIcon={<img src={closeIcon} alt="close" />}
      destroyOnClose
    >
      <div className={styles.contentModal}>
        <div className={styles.viewWarning}>
          <p>
            *** Vui lòng kiểm tra thông tin trước khi thực hiện giao dịch ***
          </p>
          <p>** Sau khi thực hiện xong giao dịch thì không thể huỷ bỏ **</p>
        </div>
        <div className={styles.inputSearch}>
          <Search
            placeholder="Ex: 0123456789"
            onSearch={onSearch}
            enterButton
          />
        </div>

        {payer && (
          <Row>
            <Col span={8}>
              <span className={styles.textLabel}>Tên khách hàng</span>
            </Col>
            <Col span={16}>
              <span className={styles.textValue}>Phát Nguyễn</span>
            </Col>
            <Col span={8}>
              <span className={styles.textLabel}>Số điện thoại</span>
            </Col>
            <Col span={16}>
              <span className={styles.textValue}>0123456789</span>
            </Col>
          </Row>
        )}

        <Row>
          {dataList.map((item) => {
            const { label, value } = item;
            return (
              <Fragment key={label}>
                <Col span={8}>
                  <span className={styles.textLabel}>{label}</span>
                </Col>
                <Col span={16}>
                  <span className={styles.textValue}>{value}</span>
                </Col>
              </Fragment>
            );
          })}
        </Row>
      </div>
    </Modal>
  );
};

export default ModalDepositMoney;

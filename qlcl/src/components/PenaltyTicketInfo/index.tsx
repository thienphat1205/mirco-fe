import React from "react";
import { Row, Col } from "antd";
import styles from "./index.module.less";
import CustomTitle from "../CustomTitle";

interface PenaltyTicketInformationProps {
  dataList: {
    label: string;
    value: string | undefined | HTMLElement;
  }[];
  ticketHandler: any;
}

const PenaltyTicketInformation: React.FC<PenaltyTicketInformationProps> = ({
  dataList,
  ticketHandler = [],
}) => {
  return (
    <div className={styles.root}>
      <CustomTitle title="Thông tin phiếu phạt" />
      <Row gutter={[20, 0]} className={styles.viewInfoList}>
        <Col md={16} xs={24}>
          <Row>
            {dataList.map((item) => {
              const { label, value } = item;
              return (
                <Col md={12} xs={24} key={label}>
                  <p className={styles.textLabel}>{label}</p>
                  <p className={styles.textValue}>{value}</p>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col md={8} xs={24}>
          <p className={styles.textLabel}>Người xử lý phiếu</p>
          {ticketHandler.length === 0 ? (
            <p className={styles.textValue}>-</p>
          ) : (
            ticketHandler.map((item: any) => {
              const { id = "", name = "" } = item;
              return (
                <p key={id} className={styles.textValue}>
                  {id} - {name}
                </p>
              );
            })
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PenaltyTicketInformation;

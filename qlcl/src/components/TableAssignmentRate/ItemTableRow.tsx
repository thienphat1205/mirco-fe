import React from "react";
import { Row, Col, Button } from "antd";
import styles from "./index.module.less";
import { Link } from "react-router-dom";
import numeral from "numeral";
import moment from "moment";
import { formatTime, formatTimeCoundown } from "@/utils/utils";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import Countdown from "../Countdown";

interface ItemTableRowProps {
  item: any;
  index: number;
}

const ItemTableRow: React.FC<ItemTableRowProps> = ({ item, index }) => {
  const {
    ticketTypeList = [],
    ticketStatusList = [],
    allWarehouses = [],
  } = useTypedSelector((state) => state.metaData);
  const {
    ticketId,
    createdAt,
    penaltyFee,
    status,
    ticketType,
    closedAt,
    picId,
    picName,
    hubId,
    deadline,
    assignmentIssue,
  } = item;

  const hubName =
    allWarehouses.find((item) => item?.id === hubId)?.name || hubId;

  const employeeInfo = picId ? `${picId} - ${picName}` : `${picName || "-"}`;

  return (
    <div
      className={styles.itemRow}
      style={!(index % 2) ? { backgroundColor: "#fafafa" } : {}}
    >
      <Row>
        <Col span={1}></Col>
        <Col span={3}>
          <div className={styles.viewCell}>
            <Link to={`/detail/${ticketId}`}>
              <p>{ticketId}</p>
            </Link>
          </div>
        </Col>
        <Col span={7}>
          <div className={styles.viewCell}>
            <p>
              <strong className={styles.label}>Loại phiếu:</strong>
              <span className={styles.value}>
                {ticketTypeList.find((item) => item?.id === ticketType)?.name ||
                  ticketType}
              </span>
            </p>
            <p>
              <strong className={styles.label}>Tỉ lệ gán đơn:</strong>
              <span className={styles.value}>
                <span className={styles.textHighlight}>
                  {assignmentIssue?.assignmentRatio || 0}%
                </span>
                /{assignmentIssue?.assignmentRequired || 0}%
              </span>
            </p>
            <p>
              <strong className={styles.label}>Tiền phạt:</strong>
              <span className={styles.value}>
                {numeral(penaltyFee).format("0,0")}
              </span>
            </p>
          </div>
        </Col>
        <Col span={5}>
          <div className={styles.viewCell}>
            <p>
              {ticketStatusList.find((item) => item?.id === status * 1)?.name ||
                status}
            </p>
            <p>
              <strong className={styles.label}>TG tạo:</strong>
              <span className={styles.value}>
                {createdAt && moment(createdAt).format(formatTime)}
              </span>
            </p>
            {closedAt ? (
              <p>
                <strong className={styles.label}>TG hoàn tất:</strong>
                <span className={styles.value}>
                  {moment(closedAt).format(formatTime)}
                </span>
              </p>
            ) : (
              <p>
                <strong className={styles.label}>Hạn xử lý:</strong>
                <span className={styles.textHighlight}>
                  <Countdown
                    deadline={moment(deadline).format(formatTimeCoundown)}
                    tooltipText={moment(deadline).format(formatTime)}
                  />
                </span>
              </p>
            )}
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.viewCell}>
            <p>
              <strong className={styles.label}>Nhân viên:</strong>
              <span className={styles.value}>{employeeInfo}</span>
            </p>
            {hubName && (
              <p>
                <strong className={styles.label}>Bưu cục:</strong>
                <span className={styles.value}>{hubName}</span>
              </p>
            )}
          </div>
        </Col>
        <Col span={2}>
          <div className={styles.viewCell} style={{ alignItems: "center" }}>
            <Link to={`/detail/${ticketId}`}>
              <Button className={styles.btnView}>Xem</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ItemTableRow;

import React from "react";
import { Row, Col, Tooltip } from "antd";
import styles from "./index.module.less";
import { useExplanation } from "./index";

const ItemCanNotEdit: React.FC = () => {
  const {
    explanation,
    workflow,
    //  ticketId
  } = useExplanation();
  const {
    message = "",
    assignedUsers = [],
    pics = [],
    hubId,
    hubName,
    // attachments = [],
  } = explanation;

  const formatPics = pics.map((item: any) => {
    return `${item?.id} - ${item?.name}`;
  });

  const stringPics = formatPics.toString().replaceAll(",", ", ");

  const hubInfo = formatPics ? `${hubId} - ${hubName}` : "-";

  const {
    viewAssignUsers,
    // viewAttachments,
    viewMessage,
  } = workflow;

  const renderTextTooltip = () => {
    return (
      <>
        {formatPics.map((item: any, idx: any) => {
          return (
            <p key={idx} style={{ margin: 0 }}>
              {item}
            </p>
          );
        })}
      </>
    );
  };

  return (
    <div className={styles.itemCanNotEdit}>
      <div className={styles.viewHubInfo}>
        <p className={styles.textHubInfo}>{hubInfo}</p>
      </div>
      <p className={styles.textLabel}>Người giải trình</p>
      {pics.length === 0 ? (
        <p className={styles.textValue}>-</p>
      ) : (
        <Tooltip title={renderTextTooltip}>
          <p className={styles.textValuePics}>{stringPics}</p>
        </Tooltip>
      )}

      {viewMessage && (
        <>
          <p className={styles.textLabel}>Nội dung giải trình</p>
          <p className={styles.textValue}>{message || "-"}</p>
        </>
      )}

      {viewAssignUsers && (
        <>
          <p className={styles.textLabel}>Người chịu trách nhiệm</p>
          <Row gutter={[0, 5]} className={styles.viewPersonList}>
            {assignedUsers.map((item: any) => {
              const { id, name } = item;
              return (
                <Col
                  className={styles.itemPerson}
                  key={id}
                >{`${id} - ${name}`}</Col>
              );
            })}
          </Row>
        </>
      )}
    </div>
  );
};

export default ItemCanNotEdit;

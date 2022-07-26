/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Input, Form, Tooltip } from "antd";
// import UploadFile from "../UploadFile";
import styles from "./index.module.less";
import SelectEmployees from "../SelectEmployees";
import { useActions } from "@/hooks/useActions";
import { useExplanation } from "./index";
import UploadFile from "../UploadFile";

const { TextArea } = Input;

const ItemCanEdit: React.FC = () => {
  const { explanation, ticketId, workflow, onStateChange } = useExplanation();
  const [form] = Form.useForm();
  const {
    message,
    assignedUsers = [],
    pics = [],
    hubId,
    hubName,
    attachments = [],
  } = explanation;

  const { editMessage, editAttachments, editAssignUsers, viewMessage } =
    workflow;

  const { updateExplanationTickets } = useActions();
  const [dataUploadList, setDataUploadList] = useState<any[]>([]);

  React.useEffect(() => {
    const assignedUserIds = assignedUsers.map((item: any) => item?.id);
    form.setFieldsValue({ assignedUserIds });
    onStateChange({
      assignedUserIds,
    });
  }, [assignedUsers]);

  React.useEffect(() => {
    form.setFieldsValue({ message });
    onStateChange({
      message,
    });
  }, [message]);

  React.useEffect(() => {
    onStateChange({
      attachments: dataUploadList,
    });
  }, [dataUploadList]);

  React.useEffect(() => {
    if (Array.isArray(attachments) && attachments.length > 0) {
      setDataUploadList(attachments);
    }
  }, []);

  const handleSubmitForm = (values: any) => {
    const payload = {
      ...values,
      attachments: dataUploadList,
      ticketIds: [ticketId],
    };
    updateExplanationTickets(payload);
  };

  const formatPics = pics.map((item: any) => {
    return `${item?.id} - ${item?.name}`;
  });
  const stringPics = formatPics.toString().replaceAll(",", ", ");
  const hubInfo = hubId ? `${hubId} - ${hubName}` : "-";

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

  const handleValuesChange = (_: any, allFields: any) => {
    onStateChange(allFields);
  };

  return (
    <Form
      className={styles.contentModal}
      form={form}
      name="update-explanation-ticket-detail"
      onFinish={handleSubmitForm}
      onValuesChange={handleValuesChange}
      initialValues={{
        message,
      }}
    >
      <div className={styles.itemCanEdit}>
        <div className={styles.viewHubInfo}>
          <p className={styles.textHubInfo}>{hubInfo}</p>
          {/* <div className={styles.viewCheckbox}>
          <span className={styles.textCheckbox}>Đánh dấu truy thu</span>
          <Checkbox defaultChecked={false} />
        </div> */}
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
            <p className={styles.textLabel}>Nội dung giải trình </p>
            <Form.Item name="message" label={null}>
              <TextArea
                className={styles.textArea}
                placeholder="Nhập nội dung giải trình"
                allowClear={false}
                rows={3}
                disabled={!editMessage}
              />
            </Form.Item>
          </>
        )}

        {/* <UploadFile
          fileList={dataUploadList}
          handleChangeFileList={setDataUploadList}
          disabled={!editAttachments}
        /> */}
        <p className={styles.textLabel}>Người chịu trách nhiệm</p>
        <Form.Item name="assignedUserIds" label={null}>
          <SelectEmployees
            ticketId={ticketId}
            defaultList={assignedUsers}
            disabled={!editAssignUsers}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default React.memo(ItemCanEdit);

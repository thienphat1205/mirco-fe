/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Form, Row, Col, Select, Input, Button } from "antd";
import UploadFile from "../UploadFile";
import SelectEmployees from "../SelectEmployees";
import styles from "./index.module.less";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import CustomTagSelectMultiple from "../CustomTagSelectMultiple";

const { Option } = Select;
const { TextArea } = Input;

interface FormProps {
  dataListSelected: string[];

  onClose: () => void;

  query: any;
}

const FormExplanation: React.FC<FormProps> = ({
  dataListSelected,
  onClose,
  query,
}) => {
  const [dataUploadList, setDataUploadList] = useState<any[]>([]);

  const { loading: { loadingAction = false } = {} } = useTypedSelector(
    (state) => state.ticket
  );

  const {
    updateExplanationTickets,
    setDataTicketReducer,
    getTicketsInProcessList,
  } = useActions();

  const handleSubmitForm = (values: any): void => {
    const payload = {
      ...values,
      attachments: dataUploadList.map((item) => item?.url),
    };
    updateExplanationTickets(payload, handleAfterUpdateSuccessfully);
  };

  const handleAfterUpdateSuccessfully = (): void => {
    // reset data table
    setDataTicketReducer({
      ticketInProcessList: {
        tickets: [],
        total: 0,
        isEmpty: false,
      },
    });
    onClose();
    // get new data table with offset: 0, limit: current page * 10 and keep it all filter ✅
    getTicketsInProcessList(query);
  };

  return (
    <Form
      className={styles.contentModal}
      layout="vertical"
      name="material-form"
      onFinish={handleSubmitForm}
      initialValues={{
        ticketIds: dataListSelected,
      }}
    >
      <Row>
        <Col md={11} xs={24} className={styles.viewLeft}>
          <p className={styles.textTitle}>
            Danh sách phiếu cần giải trình hàng loạt
          </p>
          <Form.Item name="ticketIds" label={false}>
            <Select
              mode="multiple"
              tagRender={CustomTagSelectMultiple}
              dropdownRender={() => <></>}
            >
              {dataListSelected.map((item) => (
                <Option value={item} key={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={13} xs={24} className={styles.viewRight}>
          <div style={{ padding: "12px" }}>
            <p className={styles.textTitle}>Nội dung giải trình</p>
            <Form.Item
              name="message"
              label="Nội dung giải trình"
              rules={[
                {
                  required: true,
                  message: "Nhập nội dung giải trình!",
                },
              ]}
            >
              <TextArea className={styles.textArea} allowClear rows={3} />
            </Form.Item>
            {/* <UploadFile
              fileList={dataUploadList}
              handleChangeFileList={setDataUploadList}
            /> */}
            <Form.Item
              name="assignedUserIds"
              label="Người chịu trách nhiệm"
              rules={[
                {
                  required: true,
                  message: "Chọn người chịu trách nhiệm!",
                },
              ]}
            >
              <SelectEmployees ticketId={dataListSelected[0]} />
            </Form.Item>
          </div>

          <div className={styles.viewFooterModal}>
            <Button className={styles.btnCancel} onClick={onClose}>
              Huỷ
            </Button>
            <Form.Item
              shouldUpdate={(prevValues, curValues) =>
                prevValues.ticketIds !== curValues.ticketIds
              }
            >
              {({ getFieldValue }) => {
                const ticketIds = getFieldValue("ticketIds");
                return (
                  <Button
                    loading={loadingAction}
                    className={styles.btnSubmit}
                    htmlType="submit"
                    disabled={ticketIds.length === 0}
                  >
                    Lưu nội dung giải trình
                  </Button>
                );
              }}
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default FormExplanation;

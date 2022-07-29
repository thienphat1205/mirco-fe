import { Modal, Button, Row, Col, Form, Select, Input } from "antd";
import React from "react";
import s from "./index.module.less";

const { Option } = Select;

const listType = [
  { label: "Giao", value: "pick" },
  { label: "Lấy", value: "delivery" },
  { label: "Trả", value: "return" },
];

const ModalAddOrder: React.FC<any> = (props) => {
  const { title = "", show, handleCancel } = props;

  const onFinish = (values: any) => {
    console.log("values", values);
  };
  return (
    <Modal
      className={s.root}
      title={title}
      visible={show}
      onCancel={handleCancel}
      footer={[
        <Button key="close" onClick={handleCancel}>
          Đóng
        </Button>,
        <Button
          form="formAddOrder"
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Thêm đơn hàng
        </Button>,
      ]}
      width={1000}
      style={{ top: 40 }}
      destroyOnClose
    >
      <Row gutter={[30, 20]}>
        <Col md={12} xs={24}>
          <Form
            name="formAddOrder"
            onFinish={onFinish}
            className={s.form}
            initialValues={{ type: "pick" }}
          >
            <div className={s.viewSelectType}>
              <p className={s.textLabel}>Loại:</p>
              <div className={s.formItemSelect}>
                <Form.Item
                  name="type"
                  label={false}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select size="large">
                    {listType.map((item) => (
                      <Option key={item.value}>{item.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <Form.Item
              name="ordersCode"
              label={false}
              rules={[
                {
                  required: true,
                  message: "Nhập mã đơn hàng",
                },
              ]}
            >
              <Input.TextArea
                className={s.inputArea}
                autoSize={{ minRows: 12, maxRows: 12 }}
                placeholder="Nhập danh sách đơn hàng, enter để thêm nhiều đơn hàng"
              />
            </Form.Item>
          </Form>
        </Col>
        <Col md={12} xs={24}>
          <div className={s.viewTitle}>Kết quả</div>
          <div className={s.viewResult} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalAddOrder;

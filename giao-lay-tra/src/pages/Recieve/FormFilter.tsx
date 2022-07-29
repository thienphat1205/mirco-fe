import React from "react";
import { Form, Row, Col, Input, Button } from "antd";
import s from "./index.module.less";
import { ISearch } from "./index";

interface FormFilterProps {
  defaultValues: ISearch;

  onClose: () => void;

  onSubmit: (values: any) => void;

  isFiltered: boolean;
}

const FormFilter: React.FC<FormFilterProps> = ({
  defaultValues,
  onClose,
  onSubmit,
  isFiltered,
}) => {
  const [form] = Form.useForm();

  const handleSubmitForm = (values: any) => {
    const { orderCode, phone } = values;
    const payload = {
      orderCode,
      phone,
    };
    onSubmit(payload);
    onClose();
  };

  const handleReset = () => {
    form.setFieldsValue({
      orderCode: undefined,
      phone: undefined,
    });
    form.submit();
  };

  return (
    <div className={s.formFilter}>
      <Form
        form={form}
        layout="vertical"
        name="material-form"
        onFinish={handleSubmitForm}
        className={s.viewForm}
        initialValues={{
          ...defaultValues,
        }}
      >
        <Row gutter={[20, 10]}>
          <Col span={24}>
            <Form.Item name="orderCode" label="Mã đơn hàng">
              <Input placeholder="Nhập mã đơn hàng" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="phone" label="Số điện thoại">
              <Input placeholder="Nhập SĐT" />
            </Form.Item>
          </Col>
        </Row>
        <div className={s.viewButton}>
          {isFiltered ? (
            <Button
              className={s.btnCancel}
              style={{ width: "121px" }}
              onClick={handleReset}
            >
              Xoá bộ lọc
            </Button>
          ) : (
            <Button className={s.btnCancel} onClick={onClose}>
              Huỷ bỏ
            </Button>
          )}

          <Button className={s.btnSubmit} htmlType="submit">
            Áp dụng
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormFilter;

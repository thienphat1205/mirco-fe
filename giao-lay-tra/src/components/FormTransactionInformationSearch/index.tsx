import React from "react";
import { Row, Col, Form, Input, Button, Select, DatePicker } from "antd";
import moment from "moment";
import s from "./index.module.less";
import { ISearch } from "@/pages/Wallet/TransactionInformation";
import { SearchOutlined } from "@ant-design/icons";
import { formatTimePayload } from "@/utils/utils";

const { Option } = Select;

interface FormProps {
  defaultValues: ISearch;

  onSubmit: (values: ISearch) => void;
}

const FormTransactionInformationSearch: React.FC<FormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const handleSubmit = (values: ISearch) => {
    const { fromDate, toDate } = values;
    onSubmit({
      ...values,
      fromDate: moment(fromDate).format(formatTimePayload),
      toDate: moment(toDate).format(formatTimePayload),
    });
  };

  const handleResetForm = () => {
    form.setFieldsValue({
      fromDate: moment(),
      toDate: moment(),
      status: undefined,
      payerId: undefined,
      code: undefined,
    });
    form.submit();
  };

  const { fromDate, toDate } = defaultValues;

  return (
    <div className={s.root}>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          ...defaultValues,
          fromDate: fromDate ? moment(fromDate, formatTimePayload) : moment(),
          toDate: toDate ? moment(toDate, formatTimePayload) : moment(),
        }}
      >
        <Row>
          <Col md={{ span: 16 }} sm={24} xs={24}>
            <Row gutter={[20, 0]}>
              <Col lg={8} md={12} sm={12} xs={24} className={s.formField}>
                <div className={s.label}>Từ ngày:</div>
                <Form.Item name="fromDate" label={false}>
                  <DatePicker
                    format={formatTimePayload}
                    showToday={false}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={12} xs={24} className={s.formField}>
                <div className={s.label}>Đến ngày:</div>
                <Form.Item name="toDate" label={false}>
                  <DatePicker
                    format={formatTimePayload}
                    showToday={false}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={12} xs={24} className={s.formField}>
                <div className={s.label}>Trạng thái:</div>
                <Form.Item name="status" label={false}>
                  <Select placeholder="Trạng thái" allowClear>
                    <Option key="ALL">Tất cả</Option>
                    <Option key="WAITING">Đang chờ</Option>
                    <Option key="CANCELED">Đã huỷ</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={12} xs={24} className={s.formField}>
                <div className={s.label}>ID Khách hàng</div>
                <Form.Item name="payerId" label={false}>
                  <Input placeholder="ID Khách hàng" />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={12} xs={24} className={s.formField}>
                <div className={s.label}>Mã giao dịch:</div>
                <Form.Item name="code" label={false}>
                  <Input placeholder="Nhập mã giao dịch" />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col md={{ span: 6, offset: 2 }} sm={24} xs={24}>
            <div className={s.viewButton}>
              <Button className={s.btnReset} onClick={handleResetForm}>
                Reset
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className={s.btnSubmit}
                icon={<SearchOutlined />}
                loading={false}
              >
                Tìm kiếm
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormTransactionInformationSearch;

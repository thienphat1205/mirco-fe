import React from "react";
import { Row, Col, Form, Input, Button, Select, DatePicker } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import s from "./index.module.less";

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";
const FormReceiptSearch: React.FC<any> = (props) => {
  const handleSubmit = (values: any) => {
    const { onSubmit } = props;
    if (typeof onSubmit === "function") onSubmit(values);
  };

  const {
    defaultValues = {},
    isDetail = false,
    loading = false,
    isDisableActionExport = false,
  } = props;
  const { fromDate, toDate } = defaultValues;
  return (
    <div className={s.root}>
      <Form
        layout="horizontal"
        onFinish={handleSubmit}
        name="form-receipt-search"
        initialValues={{
          ...defaultValues,
          fromDate: fromDate ? moment(fromDate) : undefined,
          toDate: toDate ? moment(toDate) : undefined,
        }}
      >
        <Row gutter={[20, 0]}>
          <Col md={8} xs={12} className={s.formField}>
            <Col span={8}>
              <div className={s.label}>Mã phiếu thu:</div>
            </Col>
            <Col span={16}>
              <Form.Item name="receiptCode" label={false}>
                <Input placeholder="Mã phiếu thu" />
              </Form.Item>
            </Col>
          </Col>
          {!isDetail ? (
            <>
              <Col md={8} xs={12} className={s.formField}>
                <Col span={8}>
                  <div className={s.label}>Từ ngày:</div>
                </Col>
                <Col span={16}>
                  <Form.Item name="fromDate" label={false}>
                    <DatePicker
                      format={dateFormat}
                      showToday={false}
                      allowClear={false}
                    />
                  </Form.Item>
                </Col>
              </Col>
              <Col md={8} xs={12} className={s.formField}>
                <Col span={8}>
                  <div className={s.label}>Đến ngày:</div>
                </Col>
                <Col span={16}>
                  <Form.Item name="toDate" label={false}>
                    <DatePicker
                      format={dateFormat}
                      showToday={false}
                      allowClear={false}
                    />
                  </Form.Item>
                </Col>
              </Col>
            </>
          ) : (
            <>
              <Col md={8} xs={12} className={s.formField}>
                <Col span={8}>
                  <div className={s.label}>Mã chuyến đi:</div>
                </Col>
                <Col span={16}>
                  <Form.Item name="tripCode" label={false}>
                    <Input placeholder="Mã chuyến đi" />
                  </Form.Item>
                </Col>
              </Col>
              <Col md={8} xs={12} className={s.formField}>
                <Col span={8}>
                  <div className={s.label}>Mã đơn hàng:</div>
                </Col>
                <Col span={16}>
                  <Form.Item name="orderCode" label={false}>
                    <Input placeholder="Mã đơn hàng" />
                  </Form.Item>
                </Col>
              </Col>
            </>
          )}

          <Col md={8} xs={12} className={s.formField}>
            <Col span={8}>
              <div className={s.label}>Mã nhân viên:</div>
            </Col>
            <Col span={16}>
              <Form.Item name="driverId" label={false}>
                <Input placeholder="Mã nhân viên" />
              </Form.Item>
            </Col>
          </Col>
          <Col md={8} xs={12} className={s.formField}>
            <Col span={8}>
              <div className={s.label}>Người tạo:</div>
            </Col>
            <Col span={16}>
              <Form.Item name="createdById" label={false}>
                <Input placeholder="Người tạo" />
              </Form.Item>
            </Col>
          </Col>
          <Col md={8} xs={12} className={s.formField}>
            <Col span={8}>
              <div className={s.label}>Trạng thái:</div>
            </Col>
            <Col span={16}>
              <Form.Item name="status" label={false}>
                <Select placeholder="Chọn trạng thái">
                  <Option key="1">Tạo thành công (Đã tạo qua internal)</Option>
                  <Option key="2">Tạo mới (Chưa tạo qua internal)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Col>
          <Col md={8} xs={12} />
          <Col md={8} xs={12} />
          <Col md={8} xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "0 10px",
              }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={s.btnSearch}
                  icon={<SearchOutlined />}
                  loading={loading}
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
              {!isDetail && (
                <Button
                  className={s.btnSearch}
                  style={{ marginLeft: "0.5rem" }}
                  type="primary"
                  icon={<DownloadOutlined />}
                  disabled={isDisableActionExport}
                >
                  Export Excel
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormReceiptSearch;

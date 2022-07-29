import React from "react";
import s from "./index.module.less";
import { Button, Form, InputNumber } from "antd";

const FormSetting: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("values", values);
  };
  return (
    <Form
      className={s.formSetting}
      name="setting-auto-pick"
      onFinish={onFinish}
    >
      <div className={s.viewButtonSubmit}>
        <Button type="primary" className={s.btnSubmit} htmlType="submit">
          Lưu
        </Button>
      </div>
      <div className={s.viewForm}>
        <div className={s.viewRow}>
          <div className={s.viewRow__left}>
            <p className={s.textLabel}>SỐ LƯỢNG CỬA HÀNG CHỈ ĐỊNH TỐI ĐA</p>
            <p className={s.textExtra}>
              Là số lượng cửa hàng tối đa mà bưu cục có thể chỉ định NVPTTT
            </p>
          </div>
          <div className={s.viewRow__right}>
            <Form.Item name="store" rules={[{ required: true }]}>
              <InputNumber placeholder="Nhập số lượng cửa hàng" min={0} />
            </Form.Item>
            <div className={s.textLabel}>Cửa hàng</div>
          </div>
        </div>
        <div className={s.viewRow} style={{ marginTop: "1rem" }}>
          <div className={s.viewRow__left}>
            <p className={s.textLabel}>NGƯNG TỰ ĐỘNG GÁN ĐƠN LẤY CUỐI NGÀY</p>
            <p className={s.textExtra}>
              Thời điểm kết thúc gán đơn lấy tự động của ngày trước khi chuyến
              tải cuối cùng của ngày đến kho
            </p>
          </div>
          <div className={s.viewRow__right}>
            <Form.Item name="minutes" rules={[{ required: true }]}>
              <InputNumber placeholder="Phút" min={0} />
            </Form.Item>
            <div className={s.textLabel}>Phút</div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default FormSetting;

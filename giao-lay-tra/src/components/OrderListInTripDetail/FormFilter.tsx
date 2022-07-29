import React from "react";
import { Form, Button, Select } from "antd";
import s from "./index.module.less";

const { Option, OptGroup } = Select;

const typeList = [
  { label: "Đã cập nhật", value: "Đã cập nhật" },
  { label: "Chưa cập nhật", value: "Chưa cập nhật" },
];

const statusList = [
  {
    group: "Lấy",
    list: [
      { label: "Lấy thành công", value: "Lấy thành công" },
      { label: "Lấy thất bại", value: "Lấy thất bại" },
      { label: "Lấy thất bại - Hủy", value: "Lấy thất bại - Hủy" },
    ],
  },
  {
    group: "Giao",
    list: [
      { label: "Đang giao", value: "Đang giao" },
      { label: "Giao thành công", value: "Giao thành công" },
      { label: "Giao thất bại", value: "Giao thất bại" },
      { label: "Giao thất bại - Trả hàng", value: "Giao thất bại - Trả hàng" },
    ],
  },
  {
    group: "Trả",
    list: [
      { label: "Đang trả", value: "Đang trả" },
      { label: "Trả thành công", value: "Trả thành công" },
      { label: "Trả thất bại", value: "Trả thất bại" },
    ],
  },
];

const FormFilter: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("values", values);
  };
  return (
    <div className={s.formFilter}>
      <Form
        name="customized_form_controls"
        layout="inline"
        onFinish={onFinish}
        initialValues={{}}
      >
        <Form.Item name="status" label={false} style={{ width: "200px" }}>
          <Select placeholder="Trạng thái">
            {statusList.map((item) => {
              const { group = "", list = [] } = item;
              return (
                <OptGroup label={group}>
                  {list.map((option) => (
                    <Option key={option.value}>{option.label}</Option>
                  ))}
                </OptGroup>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="typeList" label={false} style={{ width: "200px" }}>
          <Select placeholder="Chọn loại">
            {typeList.map((item) => (
              <Option key={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lọc
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormFilter;

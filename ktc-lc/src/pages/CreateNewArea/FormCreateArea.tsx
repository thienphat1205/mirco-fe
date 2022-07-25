import React from "react";
import { Form, Input, Select } from "antd";
import { useContextCreateNewArea } from "./index";
import styles from "./index.module.less";
import DndAreaActions from "@/components/DndAreaActions";
import ConfigAreaShift from "@/components/ConfigAreaShift";
import { FaChevronDown } from "react-icons/fa";

const { TextArea } = Input;

const { Option } = Select;

const FormCreateArea: React.FC<{
  onSubmit: (value: any) => void;
  initialValues: any;
  onReloadArea: () => void;
}> = ({ onSubmit, initialValues, onReloadArea }) => {
  const [form] = Form.useForm();
  const { currentStep, hubActions, hubAreaActions } = useContextCreateNewArea();

  const handleValuesChange = (changedFields: any) => {
    const { area_name } = changedFields;
    if (area_name && area_name.length > 100) {
      const value = area_name.substring(0, 100);
      form.setFieldsValue({
        area_name: value,
      });
    }
  };

  const {
    schedules = [],
    hub_area_id = "",
    hub_id = "",
    layout = "",
  } = initialValues;

  return (
    <Form
      className={styles.formCreateArea}
      name="create-area"
      layout="vertical"
      form={form}
      onFinish={onSubmit}
      onValuesChange={handleValuesChange}
      initialValues={{
        ...initialValues,
      }}
      autoComplete="off"
      scrollToFirstError={true}
    >
      {currentStep === 0 && (
        <>
          <Form.Item
            label="Tên khu vực"
            name="area_name"
            rules={[{ required: true, message: "Nhập tên khu vực mới!" }]}
            extra="Tối đa 100 ký tự."
          >
            <Input placeholder="Tên khu vực mới" />
          </Form.Item>
          <Form.Item
            label="Tag khu vực"
            name="tag"
            rules={[{ required: true, message: "Chọn tag khu vực!" }]}
          >
            <Select
              placeholder="Chọn tag khu vực"
              suffixIcon={<FaChevronDown />}
            >
              {hubAreaActions.map((item) => (
                <Option value={item?.id} key={item?.id}>
                  {item?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Nhập mô tả!" }]}
          >
            <TextArea
              className={styles.textArea}
              placeholder="Mô tả"
              allowClear
              rows={5}
            />
          </Form.Item>
        </>
      )}
      {currentStep === 1 && (
        <Form.Item label="Chức năng thao tác" name="actions">
          <DndAreaActions dataList={hubActions} />
        </Form.Item>
      )}
      {currentStep === 2 && (
        <Form.Item
          label={null}
          name="hub_schedule_id"
          rules={[{ required: true, message: "Vui lòng chọn lịch làm việc!" }]}
        >
          <ConfigAreaShift
            schedules={schedules || []}
            dataUploadFile={{ hub_area_id, hub_id, layout }}
            onReloadArea={onReloadArea}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default FormCreateArea;

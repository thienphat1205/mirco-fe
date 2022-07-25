import React, { useState } from "react";
import styles from "./index.module.less";
import { Form, Input, Button, notification } from "antd";
import { createLayoutAPI, PayloadCreateLayoutType } from "@/services/layout";
import { dialog, getLocalStorage } from "@/utils/utils";
import { useNavigate, createSearchParams } from "react-router-dom";

const CreateNewLayout: React.FC = () => {
  const navigate = useNavigate();
  const currentHub = getLocalStorage("CURRENT_HUB") || "";
  const [form] = Form.useForm();

  const [loadingAction, setLoadingAction] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    const payload: PayloadCreateLayoutType = {
      hub_id: currentHub,
      name: values?.name.trim(),
    };
    try {
      setLoadingAction(true);
      const response: any = await createLayoutAPI(payload);
      setLoadingAction(false);
      const { code, message, data } = response;
      if (code !== 200) throw response;
      notification.success({ message });
      navigate({
        pathname: `/create-area/${data?.layout}`,
        search: createSearchParams({
          layoutName: data?.layout_name,
        }).toString(),
      });
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleValuesChange = (changedFields: any) => {
    const { name } = changedFields;
    if (name && name.length > 100) {
      const value = name.substring(0, 100);
      form.setFieldsValue({
        name: value,
      });
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.titlePage}>Tạo layout</div>
      <div className={styles.formCreateNewLayout}>
        <Form
          name="formCreateNewLayout"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          colon={false}
          onValuesChange={handleValuesChange}
          form={form}
        >
          <Form.Item
            label="Tên layout mới"
            name="name"
            rules={[{ required: true, message: "Nhập tên layout mới!" }]}
            extra="Tối đa 100 ký tự."
          >
            <Input placeholder="Tên layout mới" />
          </Form.Item>
          <div className={styles.viewButton}>
            <Button
              loading={loadingAction}
              className={styles.btnConfirm}
              htmlType="submit"
            >
              Tạo
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateNewLayout;

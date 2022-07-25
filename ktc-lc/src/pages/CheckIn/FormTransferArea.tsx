/* eslint-disable react-hooks/exhaustive-deps */
import { getAreaListCheckinAPI } from "@/services/checkin";
import { switchAreaAPI } from "@/services/shift";
import { dialog, getLocalStorage } from "@/utils/utils";
import { Button, Form, Select, notification } from "antd";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IArea } from ".";
import s from "./index.module.less";

const { Option } = Select;

const FormTransferArea: React.FC<{
  onCloseAccept: () => void;
  areaCode: string;
  userId: string;
}> = ({ onCloseAccept, areaCode, userId }) => {
  const currentHub = getLocalStorage("CURRENT_HUB") || "";
  const [areaList, setAreaList] = useState<IArea[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response: any = await switchAreaAPI({
        hub_area_id: values?.hub_area_id,
        user_id: userId,
      });
      setLoading(false);
      const { code, message } = response;
      if (code !== 200) throw response;
      notification.success({ message });
      onCloseAccept();
    } catch (error) {
      dialog(error);
    }
  };

  useEffect(() => {
    handleGetAreaListByLayout();
  }, []);

  const handleGetAreaListByLayout = async () => {
    const payload = { hub_id: currentHub };
    try {
      const response: any = await getAreaListCheckinAPI(payload);
      const { data, code } = response;
      if (code !== 200) throw response;
      const areaListRes = data;
      if (Array.isArray(areaList)) {
        setAreaList(areaListRes);
      }
    } catch (errors) {
      dialog(errors);
    }
  };

  return (
    <div className={s.formTransferArea}>
      <Form
        name="formTransferArea"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        colon={false}
      >
        <Form.Item
          name="hub_area_id"
          label="Tên khu vực"
          rules={[
            {
              required: true,
              message: "Chọn khu vực!",
            },
          ]}
        >
          <Select
            placeholder="Chọn khu vực"
            suffixIcon={<FaChevronDown />}
            allowClear
          >
            {areaList
              .filter((item) => item.hub_area_id !== areaCode)
              .map((item) => (
                <Option value={item.hub_area_id} key={item.hub_area_id}>
                  {item.area_name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <div className={s.viewButton}>
          <Button className={s.btnConfirm} htmlType="submit" loading={loading}>
            Điều chuyển
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormTransferArea;

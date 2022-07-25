/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, Select, DatePicker, Skeleton } from "antd";
import s from "./index.module.less";
import React, { useEffect, useState } from "react";
import Images from "@/constants/images";
import { Filter } from "./CheckinHistory";
import { dialog, datePickerLocale } from "@/utils/utils";
import { getCheckinTypeAPI } from "@/services/checkin";
import { FaChevronDown } from "react-icons/fa";
import type { RangePickerProps } from "antd/es/date-picker";
import moment, { Moment } from "moment";

const { RangePicker } = DatePicker;

const { Option } = Select;

export interface TypeCheckIn {
  id: number | undefined;
  name: string | undefined;
  key?: number | undefined;
}

const FormFilterDisplay: React.FC<{
  onClose: () => void;
  onApply: (data: Filter) => void;
  value: Filter;
  isApplying: boolean;
}> = ({ onClose, onApply, value, isApplying }) => {
  const [form] = Form.useForm();
  const [isLoadingCheckInType, setIsLoadingCheckInType] =
    useState<boolean>(false);
  const [checkInTypes, setCheckInTypes] = useState<TypeCheckIn[]>([]);

  useEffect(() => {
    form.setFieldsValue(value);
    handleGetCheckInType();
  }, [value.checkin_type, value.time, value.user_id]);

  const handleGetCheckInType = async () => {
    try {
      setIsLoadingCheckInType(true);
      const response: any = await getCheckinTypeAPI();
      setIsLoadingCheckInType(false);
      const { data, code } = response;
      if (code !== 200) throw response;
      let listTypeCheckIn = data?.data || [];
      listTypeCheckIn.push({ id: 999, name: "Tất cả" });
      listTypeCheckIn.forEach((element: TypeCheckIn) => {
        element.key = element.id;
      });

      setCheckInTypes(listTypeCheckIn);
    } catch (error) {
      dialog(error);
    }
  };

  const onFinish = async (values: Filter) => {
    const { user_id, time, checkin_type } = values;
    if (!user_id && !time && !checkin_type) handleClickCancel();
    else onApply(values);
  };

  const handleClickCancel = () => {
    form.setFieldsValue({
      user_id: undefined,
      checkin_type: 999,
      time: undefined,
    });
    onClose();
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current: Moment) => {
    const startDate = moment().subtract(90, "days"); //Today.
    const endDate = moment().add(0, "days");
    return current < startDate || current > endDate;
  };

  return (
    <div className={s.formFilterDisplay}>
      <Form
        name="formFilterDisplay"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        colon={false}
        form={form}
      >
        <Form.Item label="Mã nhân viên" name="user_id">
          <Input placeholder="Nhập hoặc gõ nhanh mã NV" />
        </Form.Item>
        {isLoadingCheckInType ? (
          <Skeleton active paragraph={{ rows: 1 }} />
        ) : (
          <Form.Item name="checkin_type" label="Loại thao tác">
            <Select
              suffixIcon={<FaChevronDown />}
              placeholder="Chọn loại thao tác"
            >
              {checkInTypes.map((item: TypeCheckIn) => (
                <Option value={item.id} key={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="time"
          label="Thời gian thực hiện"
          rules={[
            () => ({
              validator(_, value) {
                const [start, end] = value;
                const duration = start.diff(end, "days");
                if (!value || Math.abs(duration) < 7) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Tối đa 7 ngày!"));
              },
            }),
          ]}
        >
          <RangePicker
            suffixIcon={<img src={Images.Suffix} alt="suffix" />}
            placeholder={["Từ ngày", "Đến ngày"]}
            locale={datePickerLocale}
            disabledDate={disabledDate}
            clearIcon={<img src={Images.CloseIcon} alt="close" />}
            format="DD/MM/YYYY"
          />
        </Form.Item>

        <div className={s.viewButton}>
          <Button className={s.btnCancel} onClick={handleClickCancel}>
            {isApplying ? " Xóa bộ lọc" : " Hủy bỏ"}
          </Button>
          <Button className={s.btnConfirm} htmlType="submit">
            Áp dụng
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormFilterDisplay;

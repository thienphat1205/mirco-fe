import React from "react";
import { Form, Row, Col, Input, Select, Button, DatePicker } from "antd";
import s from "./index.module.less";
import { ISearch } from "@/modal/index";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FaChevronDown } from "react-icons/fa";
import CustomTagSelectMultiple from "@/components/CustomTagSelectMultiple";
import Suffix from "@/assets/images/suffix_range_picker.svg";
import IconClear from "@/assets/images/icon_clear.svg";
import moment from "moment";

const { Option } = Select;

const { RangePicker } = DatePicker;

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

  const {
    loading: { loadingGetStatus = true, loadingGetType = true } = {},
    ticketTypeList = [],
    ticketStatusList = [],
    warehouses = [],
  } = useTypedSelector((state) => state.metaData);

  const handleSubmitForm = (values: any) => {
    const { orderCode, ticketType, status, date, hubIds } = values;
    let arrayValuesDate = [];
    if (date) {
      arrayValuesDate = date;
    }
    const [created_from, created_to] = arrayValuesDate;
    const payload = {
      orderCode,
      ticketType: ticketType === "all" ? undefined : ticketType,
      status,
      hubIds,
      created_from: created_from && created_from.startOf("day").toISOString(),
      created_to: created_to && created_to.endOf("day").toISOString(),
    };
    onSubmit(payload);
    onClose();
  };

  const handleReset = () => {
    form.setFieldsValue({
      orderCode: undefined,
      ticketType: "all",
      status: undefined,
      date: undefined,
      hubIds: undefined,
    });
    form.submit();
  };

  if (loadingGetStatus || loadingGetType)
    return <div className={s.formFilter}>Loading...</div>;

  const formatStatus = () => {
    const { status = [] } = defaultValues;
    const defaultStatus = typeof status === "string" ? [status] : status;
    const statusList = defaultStatus.map((item: any) => item * 1);
    return statusList;
  };

  const { ticketType, created_from, created_to } = defaultValues;

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
          ticketType: ticketType || "all",
          status: formatStatus(),
          date:
            created_from && created_to
              ? [moment(created_from), moment(created_to)]
              : undefined,
        }}
      >
        <Row gutter={[20, 10]}>
          <Col span={24}>
            <Form.Item name="orderCode" label="Mã đơn hàng ">
              <Input placeholder="Nhập hoặc gõ nhanh mã đơn hàng" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="ticketType" label="Loại phiếu">
              <Select suffixIcon={<FaChevronDown />}>
                {ticketTypeList.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="hubIds" label="Kho xử lý">
              <Select
                suffixIcon={<FaChevronDown />}
                placeholder="Kho xử lý"
                showSearch
                showArrow
                filterOption={(input, option: any = {}) => {
                  const { children = "" } = option;
                  return (
                    children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
              >
                {warehouses.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="date" label="Thời gian tạo">
              <RangePicker
                suffixIcon={<img src={Suffix} alt="suffix" />}
                placeholder={["Từ ngày", "Đến ngày"]}
                clearIcon={<img src={IconClear} alt="suffix" />}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="status" label="Trạng thái phiếu">
              <Select
                showArrow
                mode="multiple"
                placeholder="Chọn trạng thái cần lọc"
                suffixIcon={<FaChevronDown />}
                tagRender={CustomTagSelectMultiple}
              >
                {ticketStatusList.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
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

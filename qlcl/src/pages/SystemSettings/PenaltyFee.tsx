import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Form, InputNumber, Select, notification } from "antd";
import {
  getPenaltyFeeConfigAPI,
  editPenaltyFeeConfigAPI,
} from "@/services/metaData";
import s from "./index.module.less";
import { dialog } from "@/utils/utils";
import numeral from "numeral";
import CustomModal from "@/components/CustomModal";
import { FaChevronDown } from "react-icons/fa";
import { useTypedSelector } from "@/hooks/useTypedSelector";

interface IType {
  value: number;
  label: string;
}

interface ItemPenaltyFee {
  issue_type_id: string;
  default: number;

  type: number;
}

const { Option } = Select;

const typeList: IType[] = [
  {
    value: 1,
    label: "1 - Chỉ lấy giá trị đơn",
  },
  {
    value: 2,
    label: "2 - Chỉ lấy mức phạt mặc định",
  },
  {
    value: 3,
    label: "3 - Lấy tổng gíá trị đơn và mức phạt mặc định",
  },
];

const PenaltyFee: React.FC = () => {
  const { issueTypes = [] } = useTypedSelector((state) => state.metaData);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [itemSelected, setItemSelected] = useState<ItemPenaltyFee>(
    {} as ItemPenaltyFee
  );
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  useEffect(() => {
    handleGetDataPenaltyFee();
    return () => {};
  }, []);

  const handleGetDataPenaltyFee = async () => {
    try {
      setLoading(true);
      const response: any = await getPenaltyFeeConfigAPI({});
      setLoading(false);
      const { error = 0, data } = response;
      if (error > 0) throw response;
      setDataSource(data?.data || []);
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleCloseModal = useCallback(() => {
    setItemSelected({} as ItemPenaltyFee);
    setOpenModalEdit(false);
  }, []);

  const columns = [
    {
      title: "Loại sự cố",
      dataIndex: "issue_type_id",
      key: "issue_type_id",
      render: (value: string) =>
        issueTypes.find((item) => item?.issue_type_id === value)?.name,
    },
    {
      title: "Mức phạt mặc định",
      dataIndex: "default",
      key: "default",
      render: (value: number) => value && numeral(value).format("0,0"),
    },
    {
      title: "Số tiền truy thu",
      dataIndex: "type",
      key: "type",
      render: (value: number) =>
        typeList?.find((item: IType) => item?.value === value)?.label,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      align: "right" as "right",
      render: (_: any, row: ItemPenaltyFee) => {
        return (
          <Button
            className={s.buttonEdit}
            onClick={() => {
              setItemSelected(row);
              setOpenModalEdit(true);
            }}
          >
            Sửa
          </Button>
        );
      },
    },
  ];

  const onFinish = async (values: IType) => {
    const payload = {
      ...itemSelected,
      ...values,
    };
    try {
      setLoadingUpdate(true);
      const response: any = await editPenaltyFeeConfigAPI(payload);
      setLoadingUpdate(false);
      const { error = 0, message } = response;
      if (error > 0) throw response;
      notification.success({
        message,
      });
      handleCloseModal();
      handleGetDataPenaltyFee();
    } catch (errors) {
      dialog(errors);
    }
  };

  return (
    <>
      <div className={s.penaltyFee}>
        <Table
          className={s.table}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ y: "calc(100vh - 230px)" }}
          loading={loading}
        />
      </div>
      <CustomModal visible={openModalEdit} onCancel={handleCloseModal}>
        <div className={s.editPenaltyFee}>
          <p className={s.textTitle}>Điều chỉnh mức phạt</p>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            initialValues={{ ...itemSelected }}
            onFinish={onFinish}
            autoComplete="off"
            colon={false}
          >
            <Form.Item label="Loại sự cố">
              <div>
                {
                  issueTypes.find(
                    (item) =>
                      item?.issue_type_id === itemSelected?.issue_type_id
                  )?.name
                }
              </div>
            </Form.Item>
            <Form.Item
              label="Mức phạt mặc định"
              name="default"
              rules={[
                { required: true, message: "Nhập số tiền phạt mặc định!" },
              ]}
            >
              <InputNumber
                min={0}
                formatter={(value) => numeral(value).format("0,0")}
              />
            </Form.Item>
            <Form.Item
              label="Số tiền truy thu"
              name="type"
              rules={[{ required: true, message: "Chọn số tiền truy thu!" }]}
            >
              <Select
                suffixIcon={<FaChevronDown />}
                placeholder="Số tiền truy thu"
              >
                {typeList.map((item) => (
                  <Option value={item.value} key={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <div className={s.viewButton}>
              <Button onClick={handleCloseModal} className={s.btnCancel}>
                Huỷ
              </Button>
              <Button
                loading={loadingUpdate}
                className={s.btnConfirm}
                htmlType="submit"
              >
                Xác nhận
              </Button>
            </div>
          </Form>
        </div>
      </CustomModal>
    </>
  );
};

export default PenaltyFee;

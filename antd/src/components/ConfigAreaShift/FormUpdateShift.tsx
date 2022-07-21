import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, Skeleton, Select } from "antd";
import InputTime from "@/components/InputTime";
import { ItemShift } from "./index";
import { FaTrash, FaChevronDown } from "react-icons/fa";
import CustomModal from "@/components/CustomModal";
import ContentModalConfirm from "@/components/ContentModalConfirm";
import s from "./index.module.less";
import _ from "lodash";
import { getHubUsersAPI } from "@/services/shift";
import { dialog, getLocalStorage } from "@/utils/utils";
import CustomTagSelectMultiple from "@/components/CustomTagSelectMultiple";

const { Option } = Select;

interface User {
  user_id: string;
  user_name: string;
  user_type: number;

  name: string;
}

const FormUpdateShift: React.FC<{
  shifts: ItemShift[];
  textWeekday: string | undefined;
  onSubmit: Function;
}> = ({ shifts = [], textWeekday, onSubmit }) => {
  const [form] = Form.useForm();
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [tempData, setTempData] = useState<ItemShift[]>([]);
  const [indexRemove, setIndexRemove] = useState<number | undefined>(undefined);
  const [loadingGetHubUsers, setLoadingGetHubUsers] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([] as User[]);

  useEffect(() => {
    handleGetHubUsers();
  }, []);

  useEffect(() => {
    const cloneShifts = _.cloneDeep(shifts);
    const formatData = cloneShifts.map((item: any) => {
      const userIds = item?.user_ids || [];
      const uniqueUserIds = [...new Set(userIds)];
      return {
        ...item,
        leader_id: item?.leader?.user_id,
        user_ids: uniqueUserIds,
      };
    });
    setTempData(formatData);
    setIsReady(true);
  }, [shifts]);

  const handleGetHubUsers = async () => {
    const hub_id = getLocalStorage("CURRENT_HUB") || "";
    try {
      setLoadingGetHubUsers(true);
      const response: any = await getHubUsersAPI({ hub_id });
      setLoadingGetHubUsers(false);
      const { data, code } = response;
      if (code !== 200) throw response;
      const users = data?.users || [];
      const formatDataUsers = users.map((user: User) => {
        const { user_id, user_name } = user;
        const name = `${user_id} - ${user_name}`;
        return { ...user, name };
      });
      setUsers(formatDataUsers);
    } catch (errors) {
      dialog(errors);
    }
  };

  const onFinish = (values: any) => {
    const { shiftsValue } = values;
    const deleted = shifts
      .filter((shift: any) => {
        return !shiftsValue.some((value: any) => {
          return shift?.shift_id === value?.shift_id;
        });
      })
      .map((item) => item?.shift_id);
    const payloadUpdateShifts = {
      update_shifts: shiftsValue,
      delete_shift_ids: deleted,
    };
    onSubmit(payloadUpdateShifts);
  };

  const handleCloseModalConfirm = useCallback(() => {
    setIndexRemove(undefined);
    setOpenModalConfirm(false);
  }, []);

  const handleRemoveItem = useCallback(() => {
    if (typeof indexRemove === "number") {
      const cloneArr = _.cloneDeep(tempData);
      cloneArr.splice(indexRemove, 1);
      setTempData(cloneArr);
      form.setFieldsValue({ shiftsValue: cloneArr });
      handleCloseModalConfirm();
    }
  }, [indexRemove, handleCloseModalConfirm, tempData, form]);

  if (!isReady) return null;

  if (loadingGetHubUsers) return <Skeleton active />;

  return (
    <>
      <div className={s.formUpdateShifts}>
        <Form
          name="update-shift"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ shiftsValue: tempData }}
          requiredMark={false}
          form={form}
        >
          <Form.List name="shiftsValue">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={[20, 0]} key={name}>
                    <Col span={2}>
                      <Form.Item {...restField} label={name === 0 ? "#" : ""}>
                        <div>{textWeekday}</div>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item {...restField} label={name === 0 ? "Ca" : ""}>
                        <div>Ca {name + 1}</div>
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item
                        {...restField}
                        label={name === 0 ? "Thời gian bắt đầu ca" : ""}
                        name={[name, "start_hour"]}
                        rules={[
                          {
                            required: true,
                            message: "Nhập thời gian!",
                          },
                        ]}
                      >
                        <InputTime />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item
                        {...restField}
                        label={name === 0 ? "Thời gian kết thúc ca" : ""}
                        name={[name, "end_hour"]}
                        rules={[
                          {
                            required: true,
                            message: "Nhập thời gian!",
                          },
                        ]}
                      >
                        <InputTime />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        label={name === 0 ? "Trưởng khu vực" : ""}
                        name={[name, "leader_id"]}
                        rules={[
                          {
                            required: true,
                            message: "Chọn trưởng khu vực!",
                          },
                        ]}
                      >
                        <Select
                          suffixIcon={<FaChevronDown />}
                          showSearch
                          filterOption={(input, option: any = {}) => {
                            const { children = "" } = option;
                            return (
                              children
                                ?.toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            );
                          }}
                          showArrow
                          placeholder="Chọn trưởng khu vực"
                        >
                          {users.map((user: User) => (
                            <Option value={user?.user_id} key={user?.user_id}>
                              {user.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={7} className={s.selectEmployee}>
                      <Form.Item
                        {...restField}
                        label={name === 0 ? "Nhân viên cố định" : ""}
                        name={[name, "user_ids"]}
                      >
                        <Select
                          suffixIcon={<FaChevronDown />}
                          showSearch
                          filterOption={(input, option: any = {}) => {
                            const { children = "" } = option;
                            return (
                              children
                                ?.toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            );
                          }}
                          showArrow
                          mode="multiple"
                          placeholder="Nhân viên cố định"
                          tagRender={CustomTagSelectMultiple}
                        >
                          {users.map((user: User) => (
                            <Option value={user?.user_id} key={user?.user_id}>
                              {user.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col
                      span={1}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Form.Item {...restField}>
                        <FaTrash
                          className={s.iconRemove}
                          style={name === 0 ? { marginTop: "1.5rem" } : {}}
                          onClick={() => {
                            setIndexRemove(name);
                            setOpenModalConfirm(true);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </div>
      <CustomModal
        visible={openModalConfirm}
        onCancel={handleCloseModalConfirm}
        width={375}
      >
        <ContentModalConfirm
          title="Xóa ca làm việc"
          description="Chắc chắn muốn xóa ca làm việc này?"
          btnText="Xác nhận"
          onOk={handleRemoveItem}
        />
      </CustomModal>
    </>
  );
};

export default FormUpdateShift;

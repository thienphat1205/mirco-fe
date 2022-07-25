import React, { useState, useCallback } from "react";
import { Form, Input, Button, Row, Col, Divider, Select } from "antd";
import s from "./index.module.less";
import DndAreaActions from "@/components/DndAreaActions";
import ConfigAreaShift from "@/components/ConfigAreaShift";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import CustomDrawer from "@/components/CustomDrawer";
import ActionsHistory from "./ActionsHistory";
import { FaHistory } from "react-icons/fa";
import PrintQRCode from "@/components/PrintQRCodeArea";
import { FaChevronDown } from "react-icons/fa";

const { TextArea } = Input;
const { Option } = Select;

const defaultScheduleId = "000000000000000000000000";

const FormEditArea: React.FC<{
  onSubmit: (values: any) => void;
  initialValues: any;
  onReloadArea: () => void;
}> = ({ onSubmit, initialValues, onReloadArea }) => {
  const { hubActions = [], hubAreaActions = [] } = useTypedSelector(
    (state) => state.metaData
  );
  const [form] = Form.useForm();

  const [openDrawerHistory, setOpenDrawerHistory] = useState<boolean>(false);

  const handleSubmitForm = (values: any) => {
    onSubmit(values);
  };

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawerHistory(false);
  }, []);

  const {
    schedules = [],
    hub_area_id = "",
    hub_id = "",
    layout = "",
    hub_schedule_id = "",
  } = initialValues;

  return (
    <>
      <Form
        className={s.formConfigArea}
        name="config-area"
        layout="vertical"
        form={form}
        onFinish={handleSubmitForm}
        initialValues={{
          ...initialValues,
          actions: initialValues?.actions || [],
          hub_schedule_id:
            hub_schedule_id === defaultScheduleId ? undefined : hub_schedule_id,
        }}
        autoComplete="off"
        scrollToFirstError={true}
      >
        <div className={s.viewBtnGroup}>
          <Button
            className={s.btnViewHistory}
            onClick={() => setOpenDrawerHistory(true)}
          >
            <FaHistory />
            <span style={{ marginLeft: "4px" }}>Lịch sử thao tác</span>
          </Button>
        </div>
        <Row>
          <Col md={12} sm={24}>
            <Form.Item
              label="Tên khu vực"
              name="area_name"
              rules={[{ required: true, message: "Nhập tên khu vực mới!" }]}
            >
              <Input disabled placeholder="Tên khu vực mới" />
            </Form.Item>
            <div className={s.selectTag}>
              <Form.Item
                label="Tag khu vực"
                name="tag"
                rules={[{ required: true, message: "Chọn tag khu vực!" }]}
              >
                <Select
                  placeholder="Chọn tag khu vực"
                  suffixIcon={<FaChevronDown />}
                  showArrow={false}
                  disabled
                >
                  {hubAreaActions.map((item) => (
                    <Option value={item?.id} key={item?.id}>
                      {item?.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Nhập mô tả!" }]}
            >
              <TextArea
                className={s.textArea}
                placeholder="Mô tả"
                allowClear
                rows={5}
              />
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <PrintQRCode areaId={initialValues?.hub_area_id} />
          </Col>
        </Row>
        <Divider orientation="left" plain>
          Chức năng thao tác
        </Divider>
        <Form.Item label={null} name="actions">
          <DndAreaActions dataList={hubActions} />
        </Form.Item>
        <Divider style={{ margin: "35px 0" }} orientation="left" plain>
          Thiết lập ca làm việc
        </Divider>
        <Form.Item
          label={null}
          name="hub_schedule_id"
          rules={[{ required: true, message: "Vui lòng chọn lịch làm việc!" }]}
        >
          <ConfigAreaShift
            schedules={schedules || []}
            dataUploadFile={{ hub_area_id, hub_id, layout }}
            onReloadArea={onReloadArea}
            label="Chọn lịch làm việc"
            currentScheduleId={hub_schedule_id}
          />
        </Form.Item>
      </Form>
      <CustomDrawer
        visible={openDrawerHistory}
        onClose={handleCloseDrawer}
        footer={
          <div className={s.drawer__footer}>
            <Button className={s.btnCancel} onClick={handleCloseDrawer}>
              Huỷ
            </Button>
          </div>
        }
        title="Lịch sử thao tác"
      >
        <ActionsHistory areaId={initialValues?.hub_area_id} />
      </CustomDrawer>
    </>
  );
};

export default FormEditArea;

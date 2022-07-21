/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { Select, Dropdown, Button, notification, Tooltip } from "antd";
import s from "./index.module.less";
import { FaChevronDown, FaPen, FaTrash, FaCheckCircle } from "react-icons/fa";
import { EllipsisOutlined } from "@ant-design/icons";
import UploadFileConfigShift from "./UploadFileConfigShift";
import {
  getShiftAPI,
  updateShiftsAPI,
  deleteScheduleAPI,
} from "@/services/shift";
import {
  dialog,
  genIndexByWeekday,
  changeWeekdayToVietnamese,
} from "@/utils/utils";
import _ from "lodash";
import FormUpdateShift from "./FormUpdateShift";
import CustomDrawer from "@/components/CustomDrawer";
import CustomModal from "@/components/CustomModal";
import ContentModalConfirm from "@/components/ContentModalConfirm";

const columns: { title: string; dataIndex: number }[] = [
  {
    title: "Thứ 2",
    dataIndex: 0,
  },
  {
    title: "Thứ 3",
    dataIndex: 1,
  },
  {
    title: "Thứ 4",
    dataIndex: 2,
  },
  {
    title: "Thứ 5",
    dataIndex: 3,
  },
  {
    title: "Thứ 6",
    dataIndex: 4,
  },
  {
    title: "Thứ 7",
    dataIndex: 5,
  },
  {
    title: "Chủ nhật",
    dataIndex: 6,
  },
];

export interface ItemShift {
  end_hour: string;

  start_hour: string;

  user_ids: string[];

  hub_id: string;
  hub_schedule_id: string;
  shift_id: string;

  weekday: string;
}

interface IShifts {
  index: number;
  weekday: string;

  shifts: ItemShift[];
}

const { Option } = Select;

const ConfigShift = (props: any) => {
  const {
    value,
    onChange,
    schedules,
    dataUploadFile,
    onReloadArea,
    label = "Thiết lập ca",
    currentScheduleId,
  } = props;
  const [schedulesOption, setSchedulesOption] = useState<any[]>([...schedules]);
  const [shifts, setShifts] = useState<IShifts[]>([] as IShifts[]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [shiftListOfColumnSelected, setShiftListOfColumnSelected] = useState<
    ItemShift[] | undefined
  >(undefined);
  const [textWeekday, setTextWeekday] = useState<string | undefined>(undefined);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [loadingDeleteSchedule, setLoadingDeleteSchedule] =
    useState<boolean>(false);

  useEffect(() => {
    handleGetShiftById();
  }, [value]);

  const handleGetShiftById = useCallback(async () => {
    if (!value) return null;
    try {
      setShifts([] as IShifts[]);
      const response: any = await getShiftAPI({ hub_schedule_id: value });
      const { data, code } = response;
      if (code !== 200) throw response;
      const shifts = data?.shifts || [];
      const formatDataShifts = _.chain(shifts)
        // Group the elements of Array based on `weekday` property
        .groupBy("weekday")
        // `key` is group's name (weekday), `value` is the array of objects
        .map((value: any[], key: string) => ({
          weekday: changeWeekdayToVietnamese(key),
          shifts: value,
          index: genIndexByWeekday(key),
        }))
        .value()
        .sort((a: IShifts, b: IShifts) => a?.index - b?.index);
      setShifts(formatDataShifts);
    } catch (errors) {
      dialog(errors);
    }
  }, [value]);

  const handleEditWeekday = (columnSelected: number) => {
    const shiftListOfColumnSelected: IShifts | undefined = shifts.find(
      (shift: IShifts) => shift?.index === columnSelected
    );
    setShiftListOfColumnSelected(shiftListOfColumnSelected?.shifts);
    setTextWeekday(shiftListOfColumnSelected?.weekday);
    setOpenDrawer(true);
  };

  const handleCloseEditWeekday = useCallback(() => {
    setShiftListOfColumnSelected(undefined);
    setTextWeekday(undefined);
    setOpenDrawer(false);
  }, []);

  const handleSelectFile = (id: string) => {
    onChange?.(id);
  };

  const genViewOption = (
    <div className={s.contentDropdown}>
      <div
        className={`${s.option} ${s.option__delete}`}
        onClick={() => setShowConfirmDelete(true)}
      >
        <FaTrash className={s.icon} />
        <span>Xóa lịch làm việc này</span>
      </div>
    </div>
  );

  const handleRemoveCalendarShift = async () => {
    try {
      setLoadingDeleteSchedule(true);
      const response: any = await deleteScheduleAPI({ hub_schedule_id: value });
      setLoadingDeleteSchedule(false);
      const { code, message } = response;
      if (code !== 200) throw response;
      notification.success({ message });
      onReloadArea();
      handleCloseConfirm();
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleCloseConfirm = useCallback(() => {
    setShowConfirmDelete(false);
  }, []);

  const handleSubmitUpdateShift = useCallback(
    async (payload) => {
      try {
        const { hub_id, layout } = dataUploadFile;
        setLoadingUpdate(true);
        const response: any = await updateShiftsAPI({
          ...payload,
          hub_id,
          layout,
        });
        setLoadingUpdate(false);
        const { code, message } = response;
        if (code !== 200) throw response;
        notification.success({ message });
        handleCloseEditWeekday();
        handleGetShiftById();
      } catch (errors) {
        dialog(errors);
      }
    },
    [value]
  );

  const handlePushNewItemToScheduleList = useCallback(
    (newItem) => {
      setSchedulesOption((prev) => [...prev, newItem]);
      handleSelectFile(newItem?.hub_schedule_id);
    },
    [schedulesOption]
  );

  return (
    <>
      <div className={s.configShift}>
        <div className={s.comboBox}>
          <div className={s.viewSelectFile}>
            <p className={s.label}>{label}</p>
            <div className={s.select}>
              <Select
                value={value}
                suffixIcon={<FaChevronDown />}
                onChange={handleSelectFile}
                placeholder="Chọn lịch làm việc"
              >
                {schedulesOption.map((schedule: any) => {
                  return (
                    <Option
                      value={schedule?.hub_schedule_id}
                      key={schedule?.hub_schedule_id}
                    >
                      <div className={s.option}>
                        <span>{schedule?.display_code}</span>
                        {schedule?.hub_schedule_id === currentScheduleId && (
                          <FaCheckCircle className={s.option__icon} />
                        )}
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </div>
            <Tooltip
              title="Chỉ được phép upload tối đa 5 lịch làm việc"
              placement="topRight"
              color="#000"
            >
              <div>
                <UploadFileConfigShift
                  onCallback={handlePushNewItemToScheduleList}
                  dataUploadFile={dataUploadFile}
                  disabled={schedulesOption.length === 5}
                />
              </div>
            </Tooltip>
            <a
              className={s.textDownload}
              href={"/ktc-lc/file/Lichlamviec_Template.xlsx"}
              download
            >
              <span>Tải file mẫu</span>
            </a>
          </div>
          <div className={s.viewButtonDropdown}>
            {value && value !== currentScheduleId && (
              <Dropdown
                overlay={genViewOption}
                trigger={["click"]}
                placement="bottomLeft"
              >
                <Button
                  className={s.btnDropdown}
                  shape="circle"
                  icon={<EllipsisOutlined />}
                />
              </Dropdown>
            )}
          </div>
        </div>
        <div className={s.viewCalendarShift}>
          {shifts.length === 0 ? null : (
            <>
              {columns.map((item: { title: string; dataIndex: number }) => {
                const { title, dataIndex } = item;
                const shiftListByDataIndex: IShifts =
                  shifts.find((shift: IShifts) => shift?.index === dataIndex) ||
                  ({} as IShifts);
                const shiftList = shiftListByDataIndex?.shifts || [];
                return (
                  <div key={title}>
                    <div className={s.textWeekday}>
                      <p className={s.text}>{title}</p>
                      {shiftList.length > 0 && (
                        <div
                          className={s.btnEdit}
                          onClick={() => handleEditWeekday(dataIndex)}
                        >
                          <FaPen className={s.icon} />
                        </div>
                      )}
                    </div>
                    <div className={s.shifts}>
                      {shiftList.length !== 0 &&
                        shiftList.map((item: ItemShift, idx: number) => {
                          const { end_hour, start_hour, user_ids } = item;
                          const userIds = user_ids || [];
                          const uniqueUserIds = [...new Set(userIds)];
                          return (
                            <div key={idx} className={s.itemShift}>
                              <p className={s.textTime}>
                                {start_hour} ~ {end_hour}
                              </p>
                              <p className={s.textCountEmployee}>
                                {uniqueUserIds.length} NV cố định
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <CustomDrawer
        width={"70vw"}
        onClose={handleCloseEditWeekday}
        visible={openDrawer}
        size="large"
        title="Điều chỉnh lịch làm việc"
        footer={
          <div className={s.drawer__footer}>
            <Button className={s.btnCancel} onClick={handleCloseEditWeekday}>
              Huỷ
            </Button>
            <Button
              className={s.btnSubmit}
              htmlType="submit"
              form="update-shift"
              loading={loadingUpdate}
            >
              Lưu lại
            </Button>
          </div>
        }
      >
        <FormUpdateShift
          shifts={shiftListOfColumnSelected || []}
          textWeekday={textWeekday}
          onSubmit={handleSubmitUpdateShift}
        />
      </CustomDrawer>
      <CustomModal
        visible={showConfirmDelete}
        onCancel={handleCloseConfirm}
        width={375}
      >
        <ContentModalConfirm
          title="Xóa lịch làm việc"
          description="Chắc chắn muốn xóa lịch làm việc này?"
          btnText="Xác nhận"
          onOk={handleRemoveCalendarShift}
          loading={loadingDeleteSchedule}
        />
      </CustomModal>
    </>
  );
};

export default ConfigShift;

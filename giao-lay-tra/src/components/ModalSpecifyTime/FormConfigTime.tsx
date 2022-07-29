import React, { useState } from "react";
import s from "./index.module.less";
import { Select, Row, Col, Divider, Button } from "antd";
import { FaPlusCircle, FaMinusCircle, FaTimesCircle } from "react-icons/fa";
import { weekdays } from "@/utils/utils";

const { Option } = Select;

type ItemTime = string | undefined;

interface IPickTime {
  timeType: string;
  timeValues: ItemTime[];
}

interface FormProps {
  onCancel: () => void;

  onOk: (values: any) => void;

  loading: boolean;

  defaultValues: any[];
}

const dummyValue = [{ timeType: "ALL", timeValues: [undefined] }];

const FormConfigTime: React.FC<FormProps> = ({
  onCancel,
  loading,
  onOk,
  defaultValues,
}) => {
  const [pickTimes, setPickTimes] = useState<IPickTime[]>([]);

  React.useEffect(() => {
    let defaultPickTimes = dummyValue;
    if (Array.isArray(defaultValues) && defaultValues.length > 0) {
      defaultPickTimes = defaultValues.map((item) => {
        const { timeType, timeValuesToString } = item;
        return {
          timeType,
          timeValues: timeValuesToString,
        };
      });
    }
    setPickTimes(defaultPickTimes);
  }, [defaultValues]);

  console.log("defaultValues", defaultValues);

  const handleAddNewDay = (value: string): void => {
    setPickTimes((prevState) => [
      ...prevState,
      { timeType: value, timeValues: [undefined] },
    ]);
  };

  const handleRemoveDay = (dayIndex: number): void => {
    const cloneArrayPickTimes = [...pickTimes];
    cloneArrayPickTimes.splice(dayIndex, 1);
    setPickTimes(cloneArrayPickTimes);
  };

  const handleAddTimeValue = (dayIndex: number): void => {
    const itemChange = pickTimes[dayIndex];
    const cloneArrayPickTimes = [...pickTimes];
    const { timeType, timeValues = [] } = itemChange;
    const newItem = { timeType, timeValues: [...timeValues, undefined] };
    cloneArrayPickTimes.splice(dayIndex, 1, newItem);
    setPickTimes(cloneArrayPickTimes);
  };

  const handleChangeTimeValue = (
    dayIndex: number,
    timeValueIndex: number,
    value: string | undefined
  ): void => {
    const itemChange = pickTimes[dayIndex];
    const cloneArrayPickTimes = [...pickTimes];
    const { timeType, timeValues = [] } = itemChange;
    const timeValuesChange = [...timeValues];
    timeValuesChange.splice(timeValueIndex, 1, value);
    const newItem = { timeType, timeValues: timeValuesChange };
    cloneArrayPickTimes.splice(dayIndex, 1, newItem);
    setPickTimes(cloneArrayPickTimes);
  };

  const handleRemoveTimeValue = (
    dayIndex: number,
    timeValueIndex: number
  ): void => {
    const itemChange = pickTimes[dayIndex];
    const cloneArrayPickTimes = [...pickTimes];
    const { timeType, timeValues = [] } = itemChange;
    const timeValuesChange = [...timeValues];
    timeValuesChange.splice(timeValueIndex, 1);
    const newItem = { timeType, timeValues: timeValuesChange };
    cloneArrayPickTimes.splice(dayIndex, 1, newItem);
    setPickTimes(cloneArrayPickTimes);
  };

  const handleSubmit = () => {
    onOk(pickTimes);
  };

  return (
    <div className={s.formConfigTime}>
      <div className={s.pickTimes}>
        {pickTimes.map((time, dayIndex) => {
          const { timeType = "", timeValues = [] } = time;
          const parseTimeType = weekdays.find(
            (item) => item?.value === timeType
          )?.label;
          return (
            <>
              <Row gutter={[20, 20]} key={dayIndex} className={s.itemPickTime}>
                <Col span={2}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {dayIndex !== 0 && (
                      <FaMinusCircle
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleRemoveDay(dayIndex)}
                      />
                    )}
                  </div>
                </Col>
                <Col span={5}>{parseTimeType}</Col>
                {timeValues.map((timeValue, idx) => {
                  return (
                    <Col span={4}>
                      <div className={s.viewInputTime}>
                        <input
                          type="time"
                          value={timeValue}
                          onChange={(e) => {
                            const { target: { value } = {} } = e;
                            handleChangeTimeValue(dayIndex, idx, value);
                          }}
                        />
                        {idx !== 0 && (
                          <FaTimesCircle
                            className={s.iconRemoveTime}
                            onClick={() => handleRemoveTimeValue(dayIndex, idx)}
                          />
                        )}
                      </div>
                    </Col>
                  );
                })}
                <Col span={2}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FaPlusCircle
                      style={{ color: "#F26522", cursor: "pointer" }}
                      onClick={() => handleAddTimeValue(dayIndex)}
                    />
                  </div>
                </Col>
              </Row>
              <Divider />
            </>
          );
        })}
      </div>
      <div className={s.viewAdd}>
        <div style={{ width: "70%" }}>
          <Select onChange={handleAddNewDay} value="Thêm ngày cố định">
            {weekdays.map((day) => (
              <Option
                value={day?.value}
                key={day?.value}
                disabled={
                  pickTimes.findIndex((time) => time.timeType === day?.value) >
                  -1
                }
              >
                {day?.label}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className={s.viewFooter}>
        <Button key="cancel" onClick={onCancel} className={s.btnCancel}>
          Đóng
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: "8px" }}
          loading={loading}
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
};

export default FormConfigTime;

/* eslint-disable react-hooks/exhaustive-deps */
import ViewEmptyTable from "@/components/ViewEmptyTable";
import {
  getCheckinHistoryAPI,
  PayloadGetCheckinHistory,
} from "@/services/checkin";
import { dialog } from "@/utils/utils";
import { Button, Dropdown, Spin, Table } from "antd";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IUserType } from ".";
import { color, Tag } from "./EmployeeList";
import FormFilterDisplay from "./FormFilterDisplay";
import s from "./index.module.less";

export interface Filter {
  user_id?: string | undefined;
  checkin_type: number | undefined;
  time?: Moment[];
}

interface IUserCheckIn {
  area_name: string;
  content: string;
  key?: string;
  time: string;
  user_id: string;
  user_name: string;
  user_type: number;
}

const CheckinHistory: React.FC<{
  areaCode: string;
  userTypes: IUserType[];
}> = ({ areaCode, userTypes }) => {
  const columns = [
    {
      title: "Nhân viên",
      dataIndex: "employee",
      render: (_: string, record: IUserCheckIn) => {
        const renderTag = () => {
          const { user_id, user_name, user_type } = record;

          const { id = 999, name } =
            userTypes?.find((item) => item.id === user_type) || {};

          const displayName = user_name ? `${user_id} - ${user_name}` : user_id;
          return (
            <>
              <div> {displayName}</div>
              <Tag color={color(id)} title={name} />
            </>
          );
        };
        return renderTag();
      },
    },
    {
      title: "Thời gian checkin",
      dataIndex: "checkin_time",
      render: (_: string, record: IUserCheckIn) => {
        return (
          <div className={s.containerCellRight}>
            <div> {moment(record.time).format("DD/MM/YYYY - HH:mm")}</div>
          </div>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (_: string, record: IUserCheckIn) => {
        return (
          <div className={s.containerCellRight}>
            <div> {record.content}</div>
          </div>
        );
      },
    },
  ];
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employeeList, setEmployeeList] = useState<IUserCheckIn[]>([]);

  const [openFormFilterDisplay, setOpenFormFilterDisplay] =
    useState<boolean>(false);

  const [dataFilter, setDataFilter] = useState<Filter>({ checkin_type: 999 });

  useEffect(() => {
    handleGetCheckInHistory(dataFilter);
  }, [dataFilter.checkin_type, dataFilter.time, dataFilter.user_id]);

  const handleGetCheckInHistory = async (values: Filter) => {
    try {
      setIsLoading(true);
      const { user_id, checkin_type, time } = values;
      const from = time ? moment.utc(time[0]).format() : undefined;
      const to = time ? moment.utc(time[1]).format() : undefined;
      const payload: PayloadGetCheckinHistory = {
        hub_area_id: areaCode,
        checkin_type: checkin_type === 999 ? undefined : checkin_type,
        from,
        to,
        user_id,
        paging: { limit: 0, offset: 0 },
      };
      const response: any = await getCheckinHistoryAPI(payload);
      setIsLoading(false);
      const { data, code } = response;
      if (code !== 200) throw response;
      let employee = data?.data || [];
      employee.forEach((element: IUserCheckIn) => {
        element.key = element?.user_id + element?.time;
      });
      if (Array.isArray(employee)) {
        setEmployeeList(employee);
      }
    } catch (error) {
      dialog(error);
    }
  };

  const handleVisibleChange = (flag: boolean) => {
    setOpenFormFilterDisplay(flag);
  };
  const handleCloseFormFilterDisplay = () => {
    setDataFilter({ checkin_type: 999 });
    setIsApplying(false);
    setOpenFormFilterDisplay(false);
  };

  const onApplyFilter = (values: Filter) => {
    setIsApplying(true);
    setOpenFormFilterDisplay(false);
    setDataFilter(values);
  };

  const genLoading = () => {
    return (
      <div className={s.viewLoading}>
        <Spin size="large" />
      </div>
    );
  };

  return (
    <div className={s.checkinHistory}>
      <div className={s.employeeList}>
        <div className={s.employeeList__title}>
          <p />
          <Dropdown
            overlay={
              <FormFilterDisplay
                onClose={handleCloseFormFilterDisplay}
                onApply={onApplyFilter}
                value={dataFilter}
                isApplying={isApplying}
              />
            }
            placement="bottomLeft"
            trigger={["click"]}
            visible={openFormFilterDisplay}
            onVisibleChange={handleVisibleChange}
          >
            {isApplying ? (
              <Button className={s.btnApplying}>
                <span style={{ marginRight: 4 }}>Đang áp dụng bộ lọc</span>
                <FaAngleDown />
              </Button>
            ) : (
              <Button className={s.btnUpdate}>
                <span style={{ marginRight: 4 }}>Lọc hiển thị</span>
                <FaAngleDown />
              </Button>
            )}
          </Dropdown>
        </div>
        {isLoading ? (
          genLoading()
        ) : (
          <Table
            className={s.table}
            columns={columns}
            pagination={false}
            dataSource={employeeList}
            loading={false}
            scroll={{
              y: "calc(100vh -  250px)",
            }}
            locale={{
              emptyText: (
                <div style={{ height: "calc(100vh -  285px)" }}>
                  <ViewEmptyTable />
                </div>
              ),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CheckinHistory;

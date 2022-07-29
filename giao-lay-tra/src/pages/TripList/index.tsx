/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable radix */
import React, { useEffect } from "react";
import { Tabs } from "antd";
import TableTripList from "./TableTripList";
import {
  convertStatusToNumber,
  convertIsReadyToNumber,
  genPagination,
} from "@/utils/utils";
import styles from "./index.module.less";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

const { TabPane } = Tabs;

const newTrip = [
  {
    tripCode: "2171479CVHQ51",
    dateTime: [{ type: "created", time: "06/07/2021 - 08:52:31" }],
    authorId: "0001",
    author: "Nguyễn Thiên Phát",
    statistical: "10-0-0",
    asigneeId: null,
    isReady: true,
    actStatus: "Chưa chọn CBĐP",
  },
  {
    tripCode: "2171479CVHQ52",
    dateTime: [{ type: "created", time: "06/07/2021 - 09:15:31" }],
    authorId: "0001",
    author: "Nguyen Thien Phat",
    statistical: "10-0-0",
    asignee: "Nguyễn Thanh Sơn",
    asigneeId: "1868571",
    isReady: false,
    actStatus: "Hàng vật lý chưa có sẵn",
  },
];

const TripList: React.FC = () => {
  const navigate = useNavigate();
  const [loadingGetTripList, setLoadingGetTripList] =
    React.useState<boolean>(false);
  const [tripList, setTripList] = React.useState<any>({
    data: [...newTrip],
    total: newTrip.length,
  });

  const { search: searchString } = useLocation();
  const objectSearch: any = queryString.parse(searchString);
  const {
    createdById,
    isReady,
    actStatus,
    size = 20,
    page = 1,
    status = "NEW",
  } = objectSearch;

  useEffect(() => {
    const pagination = genPagination(page, size);
    const payload = {
      status: convertStatusToNumber(status),
      is_ready: convertIsReadyToNumber(isReady),
      service_id: 0,
      pagination,
    };
    // handle get data table;
    console.log("payload", payload);

    return () => {};
  }, [objectSearch]);

  const changeTab = (tab: string) => {
    if (tab === "NEW") {
      setTripList({
        data: [...newTrip],
        total: newTrip.length,
      });
    } else {
      setTripList([]);
    }
    //reset data table
    // history.push({
    //   pathname: "/trip/list",
    //   query: { status: tab, page: 1, size: 20 },
    // });
  };

  const handleTableChange = (option: any) => {
    const { pagination = {}, filters = {} } = option;
    const { current, pageSize } = pagination;
    const params = { status, page: current, size: pageSize, ...filters };
    // history.push({
    //   pathname: "/trip/list",
    //   query: params,
    // });
  };

  const listTabPane = [
    { tabName: "Chưa bắt đầu", tableName: "NEW" },
    {
      tabName: "Đang chạy",
      tableName: "ON_TRIP",
    },
    {
      tabName: "Kết thúc",
      tableName: "FINISHED",
    },
    {
      tabName: "Hủy",
      tableName: "CANCELLED",
    },
  ];

  console.log("tripList", tripList);

  return (
    <div className={styles.root}>
      <div className={styles.viewTitlePage}>
        <p className={styles.title}>Danh sách chuyến đi</p>
      </div>
      <Tabs
        defaultActiveKey={status}
        onChange={changeTab}
        destroyInactiveTabPane
      >
        {listTabPane.map((tab) => {
          const { tabName, tableName } = tab;
          return (
            <TabPane tab={tabName.toUpperCase()} key={tableName}>
              <TableTripList
                tripList={tripList}
                loading={loadingGetTripList}
                handleTableChange={handleTableChange}
                page={parseInt(page)}
                size={parseInt(size)}
                tableName={tableName}
                filtered={{ createdById, isReady, actStatus }}
              />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default TripList;

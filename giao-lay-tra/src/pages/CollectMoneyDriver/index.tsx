/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Tabs } from "antd";
import UnpaidTable from "./UnpaidTable";
import { useLocation } from "react-router-dom";
import styles from "./index.module.less";
import queryString from "query-string";

const { TabPane } = Tabs;

const unpaidList = [
  {
    driverId: "2033898",
    driverName: "Nguyễn Hoàng Tuấn",
    driver: "2033898 - Nguyễn Hoàng Tuấn",
    tripId: "2171479PACW40",
    servicePartner: "GIAOHANGNHANH",
    order: "1",
    amountOrder: "18.700",
  },
  {
    driverId: "2033999",
    driverName: "Nguyễn Thiên Phát",
    driver: "2033999 - Nguyễn Thiên Phát",
    tripId: "2171479PACW49",
    servicePartner: "GIAOHANGNHANH",
    order: "5",
    amountOrder: "20.700",
  },
];

const CollectMoneyDriver = () => {
  const { search: searchString } = useLocation();

  const [status, setStatus] = React.useState<any>("UNPAID");
  const [isReady, setIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    const { status } = queryString.parse(searchString);
    setStatus(status);
    if (!isReady) {
      setIsReady(true);
    }
  }, []);

  if (!isReady) return null;

  return (
    <div className={styles.root}>
      <p className={styles.textTitle}>Quản lý tiền thu</p>
      <Tabs defaultActiveKey={status} destroyInactiveTabPane>
        <TabPane tab="Chưa thu tiền" key="UNPAID">
          <UnpaidTable data={unpaidList} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CollectMoneyDriver;

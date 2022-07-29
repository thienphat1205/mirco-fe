import React from "react";
import s from "./index.module.less";
import { Tabs } from "antd";
import History from "./History";
import Check from "./Check";
import TripList from "./TripList";

const { TabPane } = Tabs;

const AutoDeliver: React.FC = () => {
  return (
    <div className={s.root}>
      <p className={s.textTitle}>CHUYẾN GIAO TỰ ĐỘNG</p>
      <Tabs destroyInactiveTabPane>
        <TabPane tab="Danh sách chuyến" key="1">
          <TripList />
        </TabPane>
        <TabPane tab="Lịch sử thao tác" key="2">
          <History />
        </TabPane>
        <TabPane tab="Kiểm tra tuyến" key="3">
          <Check />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AutoDeliver;

import React from "react";
import s from "./index.module.less";
import { Tabs } from "antd";
import Store from "./Store";
import SpecifyTime from "./SpecifyTime";
import History from "./History";
import FormSetting from "./FormSetting";

const { TabPane } = Tabs;

const AutoPick: React.FC = () => {
  return (
    <div className={s.root}>
      <p className={s.textTitle}>THIẾT LẬP CHUYẾN LẤY TỰ ĐỘNG</p>
      <Tabs destroyInactiveTabPane>
        <TabPane tab="Cửa hàng chỉnh định NVPTTT" key="1">
          <Store />
        </TabPane>
        <TabPane tab="Chỉ định thời điểm lấy" key="2">
          <SpecifyTime />
        </TabPane>
        <TabPane tab="Lịch sử thao tác" key="3">
          <History />
        </TabPane>
        <TabPane tab="Thiết lập" key="4">
          <FormSetting />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AutoPick;

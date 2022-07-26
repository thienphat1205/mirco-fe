/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import s from "./index.module.less";
import SlidingButton, { ItemButtonList } from "@/components/SlidingButton";
import { getValueParamsByKey } from "@/utils/utils";
import { useLocation } from "react-router-dom";
import ContentTab from "./ContentTab";
import PenaltyFee from "./PenaltyFee";

const buttonList: ItemButtonList[] = [
  {
    name: "Thiết lập backlog",
    key: "backlog",
    isShowQuantity: false,
  },
  {
    name: "Thiết lập tỉ lệ gán",
    key: "assignment-rate",
    isShowQuantity: false,
  },
  {
    name: "Thiết lập tiền phạt",
    key: "penalty-fee",
    isShowQuantity: false,
  },
];

const SystemSettings: React.FC = () => {
  const { search } = useLocation();
  const [currentTab, setCurrentTab] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const tab = getValueParamsByKey("tab");
    setCurrentTab(tab || "backlog");
    if (!isReady) {
      setIsReady(true);
    }
    return () => {};
  }, [search]);

  if (!isReady) return null;

  return (
    <div className={s.root}>
      <p className={s.titlePage}>Thiết lập hệ thống QUẢN LÝ CHẤT LƯỢNG</p>
      <div style={{ marginLeft: "13px" }}>
        <SlidingButton tabKey={currentTab} buttonList={buttonList} />
      </div>

      <div className={s.viewContentTab}>
        {currentTab !== "penalty-fee" ? (
          <ContentTab type={currentTab} />
        ) : (
          <PenaltyFee />
        )}
      </div>
    </div>
  );
};

export default SystemSettings;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import styles from "./index.module.less";

export interface ItemButtonList {
  name: string;
  quantity?: number;
  key: string;

  isShowQuantity?: boolean;
}

interface SlidingButtonProps {
  tabKey: string;

  buttonList: ItemButtonList[];
}

const SlidingButton: React.FC<SlidingButtonProps> = ({
  tabKey,
  buttonList,
}) => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<string>(tabKey);

  useEffect(() => {
    setActiveKey(tabKey);
  }, [tabKey]);

  const handleChangeTab = (tab: string) => {
    navigate(`?tab=${tab}`);
  };

  return (
    <div className={styles.wrapper}>
      {buttonList.map((item: ItemButtonList, idx) => {
        const { key, name, quantity = 0, isShowQuantity = true } = item;
        const isActive = activeKey === key;
        return (
          <div
            key={idx}
            className={classnames(styles.btn, {
              [styles.active]: isActive,
            })}
            onClick={() => handleChangeTab(key)}
          >
            {isShowQuantity ? `${name} - ${quantity}` : `${name}`}
          </div>
        );
      })}
    </div>
  );
};

export default SlidingButton;

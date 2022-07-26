import React from "react";
import s from "./index.module.less";
import classnames from "classnames";
import moment from "moment";

interface IItemVersion {
  item: {
    version: string;
    created_at: string;
    isApply?: boolean;
  };
  onSelect: (version: any) => void;
  isActive: boolean;
}

const ItemVersion: React.FC<IItemVersion> = ({ item, onSelect, isActive }) => {
  const { version, created_at, isApply } = item;
  return (
    <div
      className={classnames(s.itemVersion, {
        [s[`itemVersion--active`]]: isActive,
      })}
      onClick={() => onSelect(item)}
    >
      {isApply && <div className={s.apply}>Đang áp dụng</div>}
      <p className={s.textVersion}>{version}</p>
      <p className={s.textTime}>
        {created_at && moment(created_at).format("DD/MM/YYYY HH:mm")}
      </p>
    </div>
  );
};

export default ItemVersion;

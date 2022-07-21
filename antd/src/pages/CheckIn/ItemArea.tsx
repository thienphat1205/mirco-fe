import React from "react";
import s from "./index.module.less";
import classnames from "classnames";
import { IArea } from "./index";

interface ItemAreaProps {
  item: IArea;
  onSelect: (version: any) => void;
  isActive: boolean;
}

const ItemArea: React.FC<ItemAreaProps> = ({ item, onSelect, isActive }) => {
  const { area_name, description, current_user_checkin } = item;
  return (
    <div
      className={classnames(s.itemArea, {
        [s[`itemArea--active`]]: isActive,
      })}
      onClick={() => onSelect(item)}
    >
      <div className={s.containerLeft}>
        <div className={s.textName}>{area_name}</div>
        <div className={s.textCode}>{description}</div>
      </div>
      <div className={s.containerRight}>
        <div className={s.textNum}>{current_user_checkin}</div>
        <div className={s.textCode}>Nhân viên</div>
      </div>
    </div>
  );
};

export default ItemArea;

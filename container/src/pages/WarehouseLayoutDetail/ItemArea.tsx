import React, { useState } from "react";
import s from "./index.module.less";
import classnames from "classnames";
import { IArea } from "@/modal";
import { Switch, notification } from "antd";
import { activeAreaAPI } from "@/services/layout";
import { dialog } from "@/utils/utils";
import CustomModal from "@/components/CustomModal";
import ContentModalConfirm from "@/components/ContentModalConfirm";

interface ItemAreaProps {
  item: IArea;
  onSelect: (version: any) => void;
  isActive: boolean;
}

const ItemArea: React.FC<ItemAreaProps> = ({ item, onSelect, isActive }) => {
  const {
    area_name,
    area_code,
    active = false,
    hub_id,
    layout,
    description,
  } = item;

  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<boolean>(active);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [statusCheck, setStatusCheck] = useState<boolean>(false);

  const onChange = async (checked: boolean) => {
    setOpenModal(true);
    setStatusCheck(checked);
  };

  const handleCloseModalConfirm = () => {
    setOpenModal(false);
  };

  const handleAcceptModalConfirm = async () => {
    setOpenModal(false);
    const payload = {
      layout,
      area_code,
      hub_id,
      active: statusCheck,
    };
    try {
      setLoading(true);
      const response: any = await activeAreaAPI(payload);
      setLoading(false);
      const { code, message } = response;
      if (code !== 200) throw response;
      notification.success({ message });
      setValue(statusCheck);
    } catch (errors) {
      dialog(errors);
    }
  };
  return (
    <>
      <div
        className={classnames(s.itemArea, {
          [s[`itemArea--active`]]: isActive,
        })}
        onClick={() => onSelect(item)}
      >
        <div className={s.itemAreaViewLeft}>
          <div className={s.textName}>{area_name}</div>
          <div className={s.textCode}>{description}</div>
        </div>
        <div className={s.itemAreaViewRight}>
          <Switch
            size="small"
            checked={value}
            onChange={onChange}
            loading={loading}
          />

          <p
            className={s.label}
            style={{ width: "fit-content", marginTop: "4px" }}
          >
            {value ? "Đang bật" : "Đã tắt"}
          </p>
        </div>
      </div>
      <CustomModal
        visible={openModal}
        onCancel={handleCloseModalConfirm}
        width={375}
      >
        <ContentModalConfirm
          title={statusCheck ? "Kích hoạt khu vực" : "Ngừng kích hoạt khu vực"}
          description={
            statusCheck
              ? "Chắc chắn muốn kích hoạt khu vực này?"
              : "Chắc chắn muốn ngừng kích hoạt khu vực này?"
          }
          btnText="Xác nhận"
          onOk={handleAcceptModalConfirm}
        />
      </CustomModal>
    </>
  );
};

export default ItemArea;

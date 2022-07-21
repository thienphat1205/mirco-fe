import React from "react";
import { Button } from "antd";
import s from "./index.module.less";

interface ContentModalConfirmProps {
  title: string;
  description: string;
  btnText: string;

  onOk: () => void;

  loading?: boolean;
}

const ContentModalConfirm: React.FC<ContentModalConfirmProps> = (props) => {
  const { title, description, onOk, btnText, loading } = props;
  return (
    <div className={s.root}>
      <p className={s.textTitle}>{title}</p>
      <p className={s.textDesc}>{description}</p>
      <div className={s.viewBtn}>
        <Button className={s.btnOk} onClick={onOk} loading={loading}>
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default ContentModalConfirm;

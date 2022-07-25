import React from "react";
import s from "./index.module.less";

const InputTime: React.FC<any> = ({ value, onChange }) => {
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } = {} } = e;
    onChange?.(value);
  };

  return (
    <div className={s.viewInputTime}>
      <input type="time" value={value} onChange={onChangeValue} />
    </div>
  );
};

export default InputTime;

import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./index.module.less";
import { FaAngleLeft } from "react-icons/fa";

const ButtonBack: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={s.btnBack} onClick={() => navigate(-1)}>
      <FaAngleLeft style={{ marginRight: "8px" }} />
      Quay lại
    </div>
  );
};

export default ButtonBack;

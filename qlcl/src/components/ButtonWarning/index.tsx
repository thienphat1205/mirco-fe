/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import s from "./index.module.less";
import { Button, Modal } from "antd";
import { getEarlyWarningsAPI } from "@/services/ticket";
import closeIcon from "@/assets/images/closeIcon.png";
import alarm from "@/assets/images/alarm.svg";

const ButtonWarning: React.FC = () => {
  const [isShowWarning, setIsShowWarning] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [assignmentsList, setAssignmentsList] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    handleGetDataWarning();
    const interval = setInterval(handleGetDataWarning, 60 * 1000);
    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, []);

  const countDown = (deadline: any) => {
    setInterval(() => {
      let days = 0;
      let hours = 0;
      let minutes = 0;
      let sec = 0;
      const countDownDate = new Date(deadline).getTime();
      const now = new Date().getTime();
      const distance = countDownDate - now;

      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      sec = Math.floor((distance % (1000 * 60)) / 1000);
      const textHour = hours < 10 ? `0${hours}` : hours;
      const textMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const textSec = sec < 10 ? `0${sec}` : sec;
      const totalHours = days * 24 + hours;
      if (totalHours < 0) {
        if (!isShowWarning) return;
        setIsShowWarning(false);
        return;
      } else {
        if (!isShowWarning) {
          setIsShowWarning(true);
        }
      }
      setDeadline(`Còn ${textHour}:${textMinutes}:${textSec}`);
    }, 1000);
  };

  const handleGetDataWarning = async () => {
    const payload = {
      pagingRequest: { offset: 0, limit: 100 },
    };
    const rs: any = await getEarlyWarningsAPI(payload);
    const assignments = rs?.data?.assignments || [];
    if (!isMounted.current) return;
    if (!Array.isArray(assignments) || assignments.length === 0) return;
    setAssignmentsList(assignments);
    const today = new Date().toISOString();
    const currentTime: any = new Date(today);
    const timesWarningStart = assignments.map(
      (item) => new Date(item?.warningStartAt)
    );
    const closestWarning = timesWarningStart.reduce((a: any, b: any) =>
      a - currentTime < b - currentTime ? a : b
    );
    const isShowWarning = closestWarning.getTime() < currentTime.getTime();
    if (!isShowWarning) {
      setIsShowWarning(false);
      return;
    }
    const timesTriggerAt = assignments.map((item) => new Date(item?.triggerAt));
    const closestTrigger = timesTriggerAt.reduce((a: any, b: any) =>
      a - currentTime < b - currentTime ? a : b
    );
    countDown(closestTrigger);
  };

  const handleCancel = () => setOpenModal(false);

  if (!isShowWarning) return null;
  return (
    <>
      <div className={s.root}>
        <Button
          className={s.btnWarning}
          type="primary"
          shape="circle"
          icon={<img className={s.icon_alarm} src={alarm} alt="icon-alarm" />}
          onClick={() => setOpenModal(true)}
        />
        <p className={s.textTimer}>{deadline}</p>
      </div>
      <Modal
        visible={openModal}
        onCancel={handleCancel}
        className={s.modal}
        footer={null}
        closeIcon={<img src={closeIcon} alt="close" />}
      >
        <div className={s.contentModal}>
          <div className={s.contentModal__header}>Thông báo</div>
          <div className={s.contentModal__body}>
            {assignmentsList.map((item: any, idx: number) => {
              return (
                <div className={s.itemStation} key={idx}>
                  <p className={s.textStation}>
                    Bưu cục{" "}
                    <span className={s.textStation__bold}>
                      {item?.hubId} - {item?.hubName}
                    </span>
                  </p>
                  <p className={s.textStation}>
                    Tỉ lệ gán hiện tại:{" "}
                    <span style={{ color: "red" }}>Chưa đạt</span>
                  </p>
                  <div className={s.viewProgress}>
                    <progress max="100" value={item?.currentRatio}></progress>
                    <p
                      className={s.textStation__ratio}
                      style={{ color: "#00476F" }}
                    >
                      100%
                    </p>
                  </div>
                  <p
                    className={s.textStation__ratio}
                    style={{ textAlign: "center" }}
                  >
                    {item?.currentRatio}%
                  </p>
                  <div className={s.textStation}>
                    Vui lòng gán đơn đầy đủ trước khi bị truy thu
                  </div>
                  <div className={s.bottomBlock}>
                    <div className={s.line}></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={s.contentModal__footer}>
            <Button type="primary" onClick={handleCancel}>
              Đóng
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ButtonWarning;

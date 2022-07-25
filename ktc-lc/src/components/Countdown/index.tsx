/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Tooltip } from "antd";

interface TimerState {
  days: number;
  hours: number;
  minutes: number;
  sec: number;
}

const Countdown: React.FC<{
  deadline: string;
  tooltipText: string;
  extraText?: string | undefined;
}> = ({ deadline, tooltipText, extraText }) => {
  const [timer, setTimer] = React.useState<TimerState>({
    days: 0,
    hours: 0,
    minutes: 0,
    sec: 0,
  });

  const [isReady, setIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const countDownDate = new Date(deadline).getTime();
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((distance % (1000 * 60)) / 1000);
      if (!isReady) {
        setIsReady(true);
      }
      setTimer({
        days,
        hours,
        minutes,
        sec,
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes, sec } = timer;

  const totalHours = days * 24 + hours;

  if (!isReady) return <span>Đang tính...</span>;

  return (
    <Tooltip title={tooltipText}>
      {totalHours < 0 ? (
        <span>Đã quá hạn</span>
      ) : (
        <span>
          {extraText}
          {totalHours}h {minutes} phút {sec} giây
        </span>
      )}
    </Tooltip>
  );
};

export default Countdown;

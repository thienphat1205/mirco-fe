import React from "react";
import s from "./index.module.less";

const ReadMore: React.FC<{ text: string }> = ({ text }) => {
  const [showReadMore, setShowReadMore] = React.useState<boolean>(true);
  const collapsedText = text && text.slice(0, 21);
  return (
    <div className={s.viewReadMore}>
      <p className={s.textContent}>{showReadMore ? collapsedText : text}</p>
      <p
        onClick={() => {
          setShowReadMore((prev) => !prev);
        }}
        className={s.readMore}
      >
        {showReadMore ? "Xem thêm" : "Thu gọn"}
      </p>
    </div>
  );
};

export default ReadMore;

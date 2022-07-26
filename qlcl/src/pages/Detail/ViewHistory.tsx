/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import s from "./index.module.less";
import { Empty, Spin, Button } from "antd";
import { genPagination } from "@/utils/utils";
import { getActionHistoryAPI } from "@/services/ticket";
import moment from "moment";
import { formatTime } from "@/utils/utils";
import { dialog } from "@/utils/utils";

interface ResponseType {
  error?: number;

  data?: {
    historyData?: any[];
    total?: number;
  };
  message?: string;
}
export const ViewHistory: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [historyList, setHistoryList] = useState<string[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const isMounted = React.useRef(true);

  useEffect(() => {
    if (ticketId) {
      handleGetHistoryList();
    }
    return () => {
      isMounted.current = false;
    };
  }, [ticketId]);

  const handleGetHistoryList = async () => {
    setLoading(true);
    const pagingRequest = genPagination(page, 20);
    const payload = {
      pagingRequest,
      ticketId,
    };
    try {
      const response: ResponseType = await getActionHistoryAPI(payload);
      if (isMounted.current) {
        setLoading(false);
        const { error = 0, data = {} } = response;
        if (error > 0) {
          setHasMore(false);
          throw response;
        }
        setPage((prev) => prev + 1);
        const { historyData = [], total = 0 } = data;
        const formatHistory = historyData.map((item: any) => {
          const { time, message, source: { id = "", name = "" } = {} } = item;
          let textInfoSource = " ";
          if (!id.startsWith("ghn.")) {
            textInfoSource = ` - ${id} - ${name} `;
          }
          const timeText = moment(time).format(formatTime);
          return `${timeText}${textInfoSource}- ${message}`;
        });
        const newList = [...historyList, ...formatHistory];
        setHistoryList(newList);
        if (newList.length >= total) {
          setHasMore(false);
        }
      }
    } catch (errors) {
      dialog(errors);
    }
  };

  const genViewHistoryList = (): JSX.Element => {
    if (historyList.length === 0 && !hasMore) {
      return <Empty style={{ marginTop: "1.5rem" }} />;
    }
    return (
      <>
        {historyList.map((item, idx) => (
          <p key={idx} className={s.textHistory}>
            {item}
          </p>
        ))}
      </>
    );
  };

  const isFirstRender = historyList.length === 0 && loading;

  const genButtonLoadMore = (): null | JSX.Element => {
    if (!hasMore) return null;
    return (
      <Button type="text" loading={loading} onClick={handleGetHistoryList}>
        Xem thêm
      </Button>
    );
  };

  return (
    <>
      <p style={{ marginBottom: "4px" }}>Lịch sử thao tác</p>
      {genViewHistoryList()}
      <div className={s.viewBtnLoadMore}>
        {isFirstRender ? <Spin size="large" /> : genButtonLoadMore()}
      </div>
    </>
  );
};
export default ViewHistory;

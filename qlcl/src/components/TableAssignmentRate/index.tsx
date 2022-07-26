/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import s from "./index.module.less";
import { Row, Col, Spin } from "antd";
import ItemTableRow from "./ItemTableRow";
import InfiniteScroll from "react-infinite-scroll-component";
import { ISearch } from "@/modal/index";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { genPagination } from "@/utils/utils";
import ViewEmptyTable from "@/components/ViewEmptyTable";

interface TableProps {
  search: ISearch;
}

const TableAssignmentRate: React.FC<TableProps> = ({ search }) => {
  const {
    assignmentRateList: { tickets = [], total = 0, isEmpty = false } = {},
  } = useTypedSelector((state) => state.ticket);
  const { getAssingmentRateList, setDataTicketReducer } = useActions();
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setHasMore(!isEmpty);
  }, [isEmpty]);

  useEffect(() => {
    handleGetData(0);
    return () => {
      setHasMore(true);
      setDataTicketReducer({
        assignmentRateList: {
          tickets: [],
          total: 1,
          isEmpty: false,
        },
      });
    };
  }, [search]);

  const fetchMoreData = () => {
    if (tickets.length >= total) return setHasMore(false);
    handleGetData(page);
  };

  const handleGetData = async (currentPage: number) => {
    const pagingRequest = genPagination(currentPage, 10);
    const { orderCode, status, ticketType, created_from, created_to, hubIds } =
      search;
    const formatStatus = typeof status === "string" ? [status] : status || [];
    const numberStatusList = formatStatus.map((item: any) => item * 1);
    const filter = {
      orderCode,
      ticketType,
      status: numberStatusList,
      created_from,
      created_to,
      hubIds: hubIds ? [hubIds] : undefined,
    };
    setPage(currentPage + 1);
    const payload = {
      pagingRequest,
      filter,
    };
    getAssingmentRateList(payload);
  };

  const genViewLoading = (): JSX.Element => {
    return (
      <div className={s.viewLoading}>
        <Spin size="large" />
      </div>
    );
  };

  return (
    <div className={s.tableWrapper}>
      <div className={s.table}>
        <div className={s.viewHeaderTable}>
          <Row>
            <Col span={1} style={{ paddingLeft: "1rem" }}></Col>
            <Col span={3}>Phiếu phạt</Col>
            <Col span={7}>Thông tin</Col>
            <Col span={5}>Trạng thái</Col>
            <Col span={6}>Thông tin giải trình hiện tại</Col>
            <Col span={2} />
          </Row>
        </div>
        <div className={s.bodyTable}>
          {isEmpty ? (
            <div style={{ height: "calc(100vh - 225px)" }}>
              <ViewEmptyTable />
            </div>
          ) : (
            <InfiniteScroll
              dataLength={tickets.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={genViewLoading()}
              height={"calc(100vh - 225px)"}
            >
              {tickets.map((item, idx) => {
                const { ticketId = "" } = item;
                return (
                  <div key={ticketId}>
                    <ItemTableRow item={item} index={idx} />
                  </div>
                );
              })}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableAssignmentRate;

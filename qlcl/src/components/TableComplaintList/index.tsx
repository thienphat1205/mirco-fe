/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import s from "./index.module.less";
import { Row, Col, Spin, Checkbox, Button } from "antd";
import ItemTableRow from "./ItemTableRow";
import InfiniteScroll from "react-infinite-scroll-component";
import { ISearch } from "@/modal/index";
import ModalExplanation from "@/components/ModalExplanation";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { genPagination } from "@/utils/utils";
import ViewEmptyTable from "@/components/ViewEmptyTable";
import CustomTooltip from "@/components/CustomTooltip";
interface TableProps {
  search: ISearch;
}

const TableComplaintList: React.FC<TableProps> = ({ search }) => {
  const {
    ticketsComplaint: { tickets = [], total = 0, isEmpty = false } = {},
  } = useTypedSelector((state) => state.ticket);
  const { setDataTicketReducer, getTicketsComplaint } = useActions();
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [dataSelectedList, setDataSelectedList] = useState<string[] | []>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setHasMore(!isEmpty);
  }, [isEmpty]);

  useEffect(() => {
    handleGetData(0);
    setDataSelectedList([]);
    return () => {
      setHasMore(true);
      setDataTicketReducer({
        ticketsComplaint: {
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
    getTicketsComplaint(payload);
  };

  const genViewLoading = (): JSX.Element => {
    return (
      <div className={s.viewLoading}>
        <Spin size="large" />
      </div>
    );
  };

  const genViewHasItemSelected = (): JSX.Element | null => {
    const disabled = handleCheckDisable();
    return (
      <>
        <div className={s.footerLeft}>
          <p className={s.footerLeft__text}>Đang chọn</p>
          <p className={s.footerLeft__number}>{dataSelectedList.length}</p>
        </div>
        <div className={s.footerRight}>
          <Button
            className={s.btnRemove}
            onClick={() => setDataSelectedList([])}
          >
            Bỏ chọn
          </Button>
          <div className={s.viewBtnExplanation}>
            {disabled && (
              <div className={s.viewTooltip}>
                <CustomTooltip />
              </div>
            )}
            <Button
              className={s.btnExplanation}
              onClick={() => setOpenModal(true)}
              disabled={disabled}
            >
              Giải trình hàng loạt
            </Button>
          </div>
        </div>
      </>
    );
  };

  const handleCheckDisable = (): boolean => {
    const mapToObjectSelected = dataSelectedList.map((item) => {
      const findItem = tickets.find((ticket) => ticket?.ticketId === item);
      return findItem;
    });
    if (mapToObjectSelected.length > 0) {
      const [firstTicketIdSelected] = mapToObjectSelected;
      const { hubId, ticketType } = firstTicketIdSelected;
      const checkItem = mapToObjectSelected.find(
        (item) => item?.hubId !== hubId || item?.ticketType !== ticketType
      );
      if (checkItem) return true;
    }

    return false;
  };

  const handleSelectItem = useCallback((value: boolean, idSelected: string) => {
    if (value) {
      setDataSelectedList((prev) => {
        return [...prev, idSelected];
      });
    } else {
      setDataSelectedList((prev) => {
        const newList = prev.filter((item) => item !== idSelected);
        return newList;
      });
    }
  }, []);

  const handleCancelModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const query = () => {
    const { orderCode, status, ticketType } = search;
    const formatStatus = typeof status === "string" ? [status] : status || [];
    const numberStatusList = formatStatus.map((item: any) => item * 1);
    const filter = {
      orderCode,
      ticketType,
      status: numberStatusList,
    };
    const payload = {
      pagingRequest: {
        offset: 0,
        limit: page * 10,
      },
      filter,
    };
    return payload;
  };

  const handleChangeAll = (event: any) => {
    const value = event.target.checked;
    if (value) {
      const idTicketList = tickets
        .filter((ticket) => ticket?.status === "50")
        .map((item) => {
          const { ticketId = "" } = item;
          return ticketId;
        });
      setDataSelectedList(idTicketList);
    } else {
      setDataSelectedList([]);
    }
  };

  return (
    <>
      <div className={s.tableWrapper}>
        <div className={s.table}>
          <div className={s.viewHeaderTable}>
            <Row>
              <Col span={1} style={{ paddingLeft: "1rem" }}>
                <Checkbox
                  onChange={handleChangeAll}
                  disabled={tickets.length === 0}
                  checked={
                    dataSelectedList.length !== 0 &&
                    dataSelectedList.length ===
                      tickets.filter((ticket) => ticket?.status === "50").length
                  }
                />
              </Col>

              <Col span={3}>Phiếu phạt</Col>
              <Col span={7}>Thông tin</Col>
              <Col span={5}>Trạng thái</Col>
              <Col span={6}>Thông tin giải trình hiện tại</Col>
              <Col span={2} />
            </Row>
          </div>
          <div className={s.bodyTable}>
            {isEmpty ? (
              <div style={{ height: "calc(100vh - 250px)" }}>
                <ViewEmptyTable />
              </div>
            ) : (
              <InfiniteScroll
                dataLength={tickets.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={genViewLoading()}
                height={"calc(100vh - 250px)"}
              >
                {tickets.map((item, index) => {
                  const { ticketId = "", status } = item;
                  const isSelected =
                    dataSelectedList.findIndex((item) => item === ticketId) >
                    -1;
                  const disabled = status !== "50";
                  return (
                    <div key={ticketId}>
                      <ItemTableRow
                        item={item}
                        index={index}
                        isSelected={isSelected}
                        onSelected={handleSelectItem}
                        disabled={disabled}
                      />
                    </div>
                  );
                })}
              </InfiniteScroll>
            )}
          </div>
          {dataSelectedList.length !== 0 && (
            <div className={s.viewFooterTable}>{genViewHasItemSelected()}</div>
          )}
        </div>
      </div>
      <ModalExplanation
        visible={openModal}
        handleCancel={handleCancelModal}
        dataListSelected={dataSelectedList}
        query={query}
      />
    </>
  );
};

export default TableComplaintList;

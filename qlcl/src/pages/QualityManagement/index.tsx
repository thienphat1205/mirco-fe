/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import s from "./index.module.less";
import { Dropdown } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import TableBacklogList from "@/components/TableBacklogList";
import TableComplaintList from "@/components/TableComplaintList";
import TableAssignmentRate from "@/components/TableAssignmentRate";
import SlidingButton, { ItemButtonList } from "@/components/SlidingButton";
import queryString from "query-string";
import { FaChevronDown } from "react-icons/fa";
import FormFilter from "@/components/FormFilter";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { genPagination } from "@/utils/utils";
import {
  getTicketsBacklogAPI,
  getTicketsComplaintAPI,
  getAssingmentRateListAPI,
} from "@/services/ticket";
import { ISearch } from "@/modal/index";

const Home: React.FC = () => {
  const history = useHistory();
  const {
    totalBacklog = 0,
    totalComplaint = 0,
    totalAssignmentRate,
  } = useTypedSelector((state) => state.ticket);
  const { search: searchString } = useLocation();

  const [search, setSearch] = useState<ISearch>({});

  const [visible, setVisible] = useState<boolean>(false);

  const [isReady, setIsReady] = useState<boolean>(false);

  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const { getTicketStatusList, getTicketTypeList, setDataTicketReducer } =
    useActions();

  const { tab = "backlogs" } = search;

  useEffect(() => {
    getTicketStatusList();
    getTicketTypeList();
  }, []);

  useEffect(() => {
    getCountDefault();
  }, [tab, isReady]);

  useEffect(() => {
    const objectSearch = queryString.parse(searchString);
    setSearch(objectSearch);
    if (!isReady) {
      setIsReady(true);
    }
  }, [searchString]);

  useEffect(() => {
    const { ticketType, orderCode, status, created_from, created_to, hubIds } =
      search;
    let check = false;
    if (
      (ticketType && ticketType !== "all") ||
      orderCode ||
      status ||
      created_from ||
      created_to ||
      hubIds
    ) {
      check = true;
    }
    setIsFiltered(check);
  }, [search]);

  const handleShowFormFilter = (value: boolean) => {
    setVisible(value);
  };

  const handleCloseFormFilter = React.useCallback((value: boolean) => {
    setVisible(false);
  }, []);

  const handleSubmitFormFilter = React.useCallback(
    (values: any) => {
      const params = { tab: search?.tab, ...values };
      const paramsString = queryString.stringify(params);
      history.push(`?${paramsString}`);
    },
    [search]
  );

  const paramSearch = React.useMemo(() => {
    return search;
  }, [search]);

  const genExtra = () => {
    return (
      <Dropdown
        destroyPopupOnHide
        placement="bottomRight"
        trigger={["click"]}
        overlay={
          <FormFilter
            defaultValues={search}
            onClose={() => handleCloseFormFilter(false)}
            onSubmit={handleSubmitFormFilter}
            isFiltered={isFiltered}
          />
        }
        onVisibleChange={handleShowFormFilter}
        visible={visible}
      >
        {!isFiltered ? (
          <div className={s.textFilter}>
            <span>Lọc hiển thị </span>
            <FaChevronDown style={{ fontSize: "11px", marginLeft: "5px" }} />
          </div>
        ) : (
          <div className={s.viewFiltered}>
            <span>Đang áp dụng bộ lọc </span>
            <FaChevronDown style={{ fontSize: "11px", marginLeft: "5px" }} />
          </div>
        )}
      </Dropdown>
    );
  };

  const getCountDefault = async () => {
    const pagingRequest = genPagination(0, 1);
    const payload = {
      pagingRequest,
    };
    if (!isReady) return null;
    const rsComplaint: any = await getTicketsComplaintAPI(payload);
    const totalComplaint = rsComplaint?.data?.total || 0;
    const rsAssingmentRateList: any = await getAssingmentRateListAPI(payload);
    const totalAssignmentRate = rsAssingmentRateList?.data?.total || 0;
    const rsBacklog: any = await getTicketsBacklogAPI(payload);
    const totalBacklog = rsBacklog?.data?.total || 0;
    switch (tab) {
      case "backlogs":
        setDataTicketReducer({ totalComplaint, totalAssignmentRate });
        break;
      case "ePODs":
        setDataTicketReducer({ totalBacklog, totalAssignmentRate });
        break;
      case "assignment-rate":
        setDataTicketReducer({ totalBacklog, totalComplaint });
        break;
    }
  };

  if (!isReady) return null;

  const buttonList: ItemButtonList[] = [
    {
      name: "Backlogs",
      quantity: totalBacklog,
      key: "backlogs",
    },
    {
      name: "ePODs & Call logs",
      quantity: totalComplaint,
      key: "ePODs",
    },
    {
      name: "Tỉ lệ gán đơn",
      quantity: totalAssignmentRate,
      key: "assignment-rate",
    },
  ];

  const genViewTable = () => {
    switch (tab) {
      case "backlogs":
        return <TableBacklogList search={paramSearch} />;
      case "ePODs":
        return <TableComplaintList search={paramSearch} />;
      case "assignment-rate":
        return <TableAssignmentRate search={paramSearch} />;
      default:
        return <TableBacklogList search={paramSearch} />;
    }
  };

  return (
    <div className={s.root}>
      <div style={{ padding: "1rem 0 0 1rem" }}>
        <p className={s.titlePage}>Quản lý chất lượng</p>
      </div>
      <div className={s.viewBtnSliding}>
        <SlidingButton tabKey={tab || "backlogs"} buttonList={buttonList} />
        {genExtra()}
      </div>
      {genViewTable()}
    </div>
  );
};

export default Home;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import s from "./index.module.less";
import { Dropdown } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import TableArrearsList from "./Table";
import queryString from "query-string";
import { FaChevronDown } from "react-icons/fa";
import FormFilter from "@/components/FormFilter";
import { useActions } from "@/hooks/useActions";
import { ISearch } from "@/modal/index";

const ArrearsList: React.FC = () => {
  const navigate = useNavigate();

  const { search: searchString } = useLocation();

  const [search, setSearch] = useState<ISearch>({});

  const [visible, setVisible] = useState<boolean>(false);

  const [isReady, setIsReady] = useState<boolean>(false);

  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const { getTicketStatusList, getTicketTypeList } = useActions();

  useEffect(() => {
    getTicketStatusList();
    getTicketTypeList();
  }, []);

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
      const params = { ...values };
      const paramsString = queryString.stringify(params);
      navigate(`?${paramsString}`);
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

  if (!isReady) return null;

  return (
    <div className={s.root}>
      <div style={{ padding: "1rem 0 0 1rem" }}>
        <p className={s.titlePage}>Danh sách phiếu theo dõi</p>
      </div>
      <div className={s.viewFilter}>{genExtra()}</div>
      <TableArrearsList search={paramSearch} />
    </div>
  );
};

export default ArrearsList;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import s from "./index.module.less";
import { Dropdown, Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import TableReturn from "./TableReturn";
import queryString from "query-string";
import { FaChevronDown } from "react-icons/fa";
import FormFilter from "./FormFilter";
// import { useActions } from "@/hooks/useActions";

export interface ISearch {
  orderCode?: string;

  phone?: string;
}

const Return: React.FC = () => {
  const navigate = useNavigate();

  const { search: searchString } = useLocation();

  const [search, setSearch] = useState<ISearch>({});
  const [visible, setVisible] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [tempOrderCode, setTempOrderCode] = useState<string | undefined>(
    undefined
  );
  const [orderCodeSelected, setOrderCodeSelected] = useState<
    string | undefined
  >(undefined);

  // const { getTicketStatusList, getTicketTypeList } = useActions();

  // useEffect(() => {
  //   getTicketStatusList();
  //   getTicketTypeList();
  // }, []);

  useEffect(() => {
    const objectSearch = queryString.parse(searchString);
    setSearch(objectSearch);
    if (!isReady) {
      setIsReady(true);
    }
  }, [searchString]);

  useEffect(() => {
    const { orderCode, phone } = search;
    let check = false;
    if (orderCode || phone) {
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
      const paramsString = queryString.stringify(values);
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
          <div className={s.viewExtraFiltered}>
            <span>Đang áp dụng bộ lọc </span>
            <FaChevronDown style={{ fontSize: "11px", marginLeft: "5px" }} />
          </div>
        )}
      </Dropdown>
    );
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempOrderCode(event.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === "Enter" && tempOrderCode) {
      const orderCodeSelected = tempOrderCode.replace(/\s/g, "");
      setOrderCodeSelected(orderCodeSelected);
    }
  };

  const handleResetInputOrderCode = React.useCallback(() => {
    setOrderCodeSelected(undefined);
    setTempOrderCode(undefined);
  }, []);

  if (!isReady) return null;

  return (
    <div className={s.root}>
      <div style={{ padding: "1rem 0 0 1rem" }}>
        <p className={s.titlePage}>Trả hàng cho khách hàng</p>
      </div>
      <div className={s.viewFilter}>
        <div className={s.inputOrderCode}>
          <Input
            placeholder="Nhập hoặc scan barcode"
            value={tempOrderCode}
            onPressEnter={handleSearch}
            onChange={handleChangeInput}
            allowClear
          />
        </div>
        {genExtra()}
      </div>
      <TableReturn
        search={paramSearch}
        orderCodeSelected={orderCodeSelected}
        handleResetInputOrderCode={handleResetInputOrderCode}
      />
    </div>
  );
};

export default Return;

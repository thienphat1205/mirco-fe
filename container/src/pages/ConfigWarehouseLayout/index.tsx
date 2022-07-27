/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import s from "./index.module.less";
import ItemVersionLayout from "./ItemVersionLayout";
import { useNavigate } from "react-router-dom";
import { getLayoutListAPI, PayloadGetLayoutListType } from "@/services/layout";
import { dialog, genPagination, getLocalStorage } from "@/utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewEmptyTable from "@/components/ViewEmptyTable";

const limit = 100;

const ConfigWarehouseLayout: React.FC = () => {
  const navigate = useNavigate();
  const currentHub = getLocalStorage("CURRENT_HUB") || "";
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [dataLayouts, setDataLayouts] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetLayoutList(0);
    setHasMore(true);
    setDataLayouts([]);
    setTotal(0);
  }, []);

  const handleGetLayoutList = async (currentPage: number) => {
    const paging = genPagination(currentPage, limit);
    const payload: PayloadGetLayoutListType = {
      hub_id: currentHub,
      paging,
    };
    try {
      setLoading(true);
      setPage(currentPage + 1);
      const response: any = await getLayoutListAPI(payload);
      setLoading(false);
      const { data, code } = response;
      const currentLayout = data?.current_layout;
      const total = data?.total;
      setTotal(total);
      if (code !== 200) throw response;
      const layouts = data?.data;
      if (Array.isArray(layouts)) {
        const formatData = layouts.map((item: any) => {
          return { ...item, isApply: currentLayout === item?.layout };
        });
        setDataLayouts((prev: any) => {
          return [...prev, ...formatData];
        });
      }
    } catch (errors) {
      dialog(errors);
    }
  };

  const fetchMoreData = () => {
    if (dataLayouts.length >= total) return setHasMore(false);
    handleGetLayoutList(page);
  };

  const handleReloadLayoutList = async () => {
    const paging = genPagination(0, (page < 1 ? 1 : page) * limit);
    const payload: PayloadGetLayoutListType = {
      hub_id: currentHub,
      paging,
    };
    try {
      setDataLayouts([]);
      setLoading(true);
      const response: any = await getLayoutListAPI(payload);
      setLoading(false);
      const { data, code } = response;
      const currentLayout = data?.current_layout;
      const total = data?.total;
      setTotal(total);
      if (code !== 200) throw response;
      const layouts = data?.data;
      if (Array.isArray(layouts)) {
        const formatData = layouts.map((item: any) => {
          return { ...item, isApply: currentLayout === item?.layout };
        });
        setDataLayouts([...formatData]);
      }
    } catch (errors) {
      dialog(errors);
    }
  };

  const genViewLoading = (): JSX.Element => {
    return (
      <div className={s.viewLoading}>
        <Spin size="large" />
      </div>
    );
  };

  const genViewEmpty = (): JSX.Element => {
    if (loading) return genViewLoading();
    return (
      <div className={s.viewLoading}>
        <ViewEmptyTable />
      </div>
    );
  };

  return (
    <div className={s.root}>
      <div className={s.viewTitlePage}>
        <p className={s.title}>THIẾT LẬP KHU VỰC KHO</p>
        <Button
          className={s.buttonCreateLayout}
          onClick={() => navigate("/create-layout")}
        >
          Tạo layout mới
        </Button>
      </div>
      <div className={s.viewLayoutList}>
        {dataLayouts.length === 0 ? (
          genViewEmpty()
        ) : (
          <InfiniteScroll
            dataLength={dataLayouts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={genViewLoading()}
            height={"calc(100vh - 155px)"}
            className={s.infiniteScroll}
          >
            {dataLayouts.map((item, idx) => (
              <div
                style={{
                  padding: "1px",
                  marginTop: idx !== 0 ? "12px" : "0",
                }}
                key={idx}
              >
                <ItemVersionLayout
                  item={item}
                  onReloadLayoutList={handleReloadLayoutList}
                />
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default ConfigWarehouseLayout;

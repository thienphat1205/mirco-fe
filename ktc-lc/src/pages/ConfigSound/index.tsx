/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import { Button, Table, Spin } from "antd";
import styles from "./index.module.less";
import { getLocalStorage, genPagination, dialog } from "@/utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewEmptyTable from "@/components/ViewEmptyTable";
import { FaFileImport, FaPen } from "react-icons/fa";
import { getLayoutListAPI } from "@/services/layout";
import CustomDrawer from "@/components/CustomDrawer";

interface Sound {
  name: string;
}

const limit = 30;

const ConfigSound: React.FC = () => {
  const currentHub = getLocalStorage("CURRENT_HUB") || "";
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [dataSoundList, setDataSoundList] = useState<Sound[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<Sound>({} as Sound);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  useEffect(() => {
    handleGetSoundList(0);
  }, []);

  useEffect(() => {
    if (!openDrawer) setItemSelected({} as Sound);
  }, [openDrawer]);

  const handleGetSoundList = async (currentPage: number) => {
    const paging = genPagination(currentPage, limit);
    const payload: any = {
      hub_id: currentHub,
      paging,
    };
    try {
      setLoading(true);
      setPage(currentPage + 1);
      const response: any = await getLayoutListAPI(payload);
      setLoading(false);
      const { data, code } = response;
      const total = data?.total || 0;
      const dataList = data?.data || [];
      if (code !== 200) throw response;
      if (Array.isArray(dataList)) {
        const newArr = [...dataSoundList, ...dataList];
        setDataSoundList(newArr);
        setHasMore(newArr.length < total);
      }
    } catch (errors) {
      dialog(errors);
    }
  };

  const genViewLoading = (): JSX.Element => {
    return (
      <div className={styles.viewLoading}>
        <Spin size="large" />
      </div>
    );
  };

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const columns = [
    {
      title: "Khu vực áp dụng",
      dataIndex: "name",
    },
    {
      title: "Dữ liệu âm thanh",
      dataIndex: "sound",
      render: () => <div className={styles.contentColumn}>1.mp3</div>,
    },
    {
      title: "Thông tin hiển thị",
      dataIndex: "sound",
      render: () => <div className={styles.contentColumn}>1</div>,
    },
    {
      title: "Điều kiện kèm theo",
      dataIndex: "sound",
      render: () => <div className={styles.contentColumn}>Hàng cồng kềnh</div>,
    },
    {
      title: "DS Kho đến",
      dataIndex: "sound",
      render: () => <div className={styles.contentColumn}>20</div>,
    },
    {
      title: "",
      dataIndex: "x",
      render: (value: string, row: Sound) => (
        <div className={styles.contentColumn}>
          <Button
            className={styles.btnEdit}
            onClick={() => {
              setOpenDrawer(true);
              setItemSelected(row);
            }}
          >
            <FaPen className={styles.icon} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={styles.configSound}>
        <div className={styles.viewTitlePage}>
          <p className={styles.title}>Thiết lập âm thanh</p>
          <div className={styles.viewBtn}>
            <Button type="primary">
              <FaFileImport />
              <span>Tải DS hiện tại</span>
            </Button>
            <Button className={styles.btnUpload}>
              <FaFileImport />
              <span>Upload DS âm thanh</span>
            </Button>
          </div>
        </div>
        <InfiniteScroll
          dataLength={dataSoundList.length}
          next={() => handleGetSoundList(page)}
          hasMore={hasMore}
          loader={genViewLoading()}
          height={"calc(100vh - 150px)"}
          className={styles.infiniteScroll}
        >
          <Table
            className={styles.table}
            dataSource={dataSoundList}
            columns={columns}
            pagination={false}
            loading={false}
            sticky
            scroll={{
              x: "max-content",
            }}
            locale={{
              emptyText: !loading ? <ViewEmptyTable /> : <div />,
            }}
          />
        </InfiniteScroll>
      </div>
      <CustomDrawer
        visible={openDrawer}
        title={`${itemSelected?.name} - 1.mp3`}
        onClose={handleCloseDrawer}
        footer={
          <div className={styles.drawer__footer}>
            <Button className={styles.btnCancel} onClick={handleCloseDrawer}>
              Đóng
            </Button>
          </div>
        }
      >
        <div>Content</div>
      </CustomDrawer>
    </>
  );
};

export default ConfigSound;

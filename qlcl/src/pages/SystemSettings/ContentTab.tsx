/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import s from "./index.module.less";
import ItemVersion from "./ItemVersion";
import { FaFileImport } from "react-icons/fa";
import { Button, Spin, Empty, notification } from "antd";
import UploadFileSystemSettings from "@/components/UploadFileSystemSettings";
import { DeleteFilled, CheckOutlined } from "@ant-design/icons";
import {
  getVersionsAPI,
  getDetailBacklogConfigAPI,
  deleteVersionAPI,
  setCurrentVersionAPI,
  getDetailAsignIssueConfigAPI,
} from "@/services/metaData";
import { downloadFileAPI } from "@/services/uploadFile";
import { dialog } from "@/utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { genPagination } from "@/utils/utils";
import ReadMore from "./ReadMore";
import TableSettingDetail from "./TableSettingDetail";
import CustomModal from "@/components/CustomModal";
import numeral from "numeral";
import { useTypedSelector } from "@/hooks/useTypedSelector";

interface IVersion {
  created_at: string;
  metadata: number;
  version: string;

  isApply: boolean;
}

const ContentTab: React.FC<{ type: string }> = ({ type }) => {
  const metadata = type === "backlog" ? 1 : 2;
  const { issueTypes = [], allWarehouses = [] } = useTypedSelector(
    (state) => state.metaData
  );
  const [versionSelected, setVersionSelected] = useState<IVersion>(
    {} as IVersion
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [dataVersions, setDataVersions] = useState<IVersion[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [dataSettingDetail, setDataSettingDetail] = useState<any>({});
  const [loadingSettingDetail, setLoadingSettingDetail] =
    useState<boolean>(false);
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] =
    useState<boolean>(false);
  const [loadingApply, setLoadingApply] = useState<boolean>(false);

  useEffect(() => {
    handleGetVersionList(0);
    setHasMore(true);
    setDataVersions([]);
    setTotal(0);
    setVersionSelected({} as IVersion);
    setDataSettingDetail({});
  }, [type]);

  useEffect(() => {
    if (versionSelected?.version) {
      handleGetSettingDetail();
    }
  }, [versionSelected]);

  const isApply = useMemo(() => {
    return versionSelected?.isApply;
  }, [versionSelected]);

  const handleGetSettingDetail = async () => {
    const payload = {
      metadata,
      version: versionSelected?.version,
    };
    try {
      setDataSettingDetail({});
      setLoadingSettingDetail(true);
      const response: any =
        type === "backlog"
          ? await getDetailBacklogConfigAPI(payload)
          : await getDetailAsignIssueConfigAPI(payload);
      setLoadingSettingDetail(false);
      const { error = 0, data } = response;
      if (error > 0) throw response;
      setDataSettingDetail(data);
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleGetVersionList = async (currentPage: number) => {
    const pagingRequest = genPagination(currentPage, 10);
    const payload = {
      metadata,
      pagingRequest,
    };
    try {
      setLoading(true);
      setPage(currentPage + 1);
      const response: any = await getVersionsAPI(payload);
      setLoading(false);
      const { error = 0, data } = response;
      const dataList = data?.data;
      const currentVersion = data?.current_version;
      const total = data?.total;
      setTotal(total);
      if (error > 0) throw response;
      if (Array.isArray(dataList)) {
        const formatData = dataList.map((item: IVersion) => {
          return { ...item, isApply: currentVersion === item?.version };
        });
        setDataVersions((prev: any) => {
          return [...prev, ...formatData];
        });
        if (currentPage === 0 && dataList.length > 0) {
          setVersionSelected(formatData[0]);
        }
      }
    } catch (errors) {
      dialog(errors);
    }
  };

  const fetchMoreData = () => {
    if (dataVersions.length >= total) return setHasMore(false);
    handleGetVersionList(page);
  };

  const handleClickItemVersion = useCallback((version: IVersion): void => {
    setVersionSelected(version);
  }, []);

  const handleReloadVersionList = async (applicableVersion = "") => {
    const pagingRequest = genPagination(0, page * 10);
    const payload = {
      metadata,
      pagingRequest,
    };
    try {
      setLoading(true);
      const response: any = await getVersionsAPI(payload);
      setLoading(false);
      const { error = 0, data } = response;
      const dataList = data?.data;
      const currentVersion = data?.current_version;
      const total = data?.total;
      setTotal(total);
      if (error > 0) throw response;
      if (Array.isArray(dataList)) {
        const formatData = dataList.map((item: IVersion) => {
          return { ...item, isApply: currentVersion === item?.version };
        });
        setDataVersions([...formatData]);
        if (page === 0 && dataList.length > 0) {
          setVersionSelected(formatData[0]);
        }
        if (applicableVersion) {
          const findItem =
            formatData.find(
              (item: IVersion) => item?.version === applicableVersion
            ) || ({} as IVersion);
          setVersionSelected(findItem);
        }
      }
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleDownloadFile = async () => {
    setLoadingDownload(true);
    await downloadFileAPI({
      fileId: dataSettingDetail?.file_id,
      ticketId: "",
    });
    setLoadingDownload(false);
  };

  const genViewLoading = (): JSX.Element => {
    return (
      <div className={s.viewLoading}>
        <Spin />
      </div>
    );
  };

  const genViewEmpty = (): JSX.Element => {
    if (loading) return genViewLoading();
    return (
      <div className={s.viewLoading}>
        <Empty description="Không có dữ liệu" />
      </div>
    );
  };

  const handleDeleteVersion = async () => {
    const payload = {
      metadata,
      version: versionSelected?.version,
    };
    try {
      setLoadingDelete(true);
      const response: any = await deleteVersionAPI(payload);
      setLoadingDelete(false);
      const { error = 0, message } = response;
      if (error > 0) throw response;
      notification.success({
        message,
      });
      handleCloseModalConfirm();
      handleReloadVersionList();
      setVersionSelected({} as IVersion);
      setDataSettingDetail({});
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleApplyVersion = async () => {
    const payload = {
      metadata,
      version: versionSelected?.version,
    };
    try {
      setLoadingApply(true);
      const response: any = await setCurrentVersionAPI(payload);
      setLoadingApply(false);
      const { error = 0, message } = response;
      if (error > 0) throw response;
      notification.success({
        message,
      });
      handleReloadVersionList(versionSelected?.version);
    } catch (errors) {
      dialog(errors);
    }
  };

  const genViewButton = (): JSX.Element | null => {
    if (!versionSelected?.version) return null;
    return (
      <>
        <Button
          className={s.btnDownloadCurrentVersion}
          onClick={handleDownloadFile}
          loading={loadingDownload}
        >
          Tải PB hiện tại
        </Button>
        <div className={s.viewBottom__right}>
          <Button
            disabled={isApply}
            className={s.btnRemove}
            icon={<DeleteFilled />}
            onClick={() => setOpenModalConfirmDelete(true)}
          >
            Xoá phiên bản
          </Button>
          <Button
            disabled={isApply}
            className={s.btnApply}
            icon={isApply ? <CheckOutlined /> : null}
            onClick={handleApplyVersion}
            loading={loadingApply}
          >
            {isApply ? "Đã áp dụng" : "Áp dụng"}
          </Button>
        </div>
      </>
    );
  };

  const handleCloseModalConfirm = useCallback(() => {
    setOpenModalConfirmDelete(false);
  }, []);

  const columnsBacklog = [
    {
      title: "Bưu cục",
      dataIndex: "hub_id",
      render: (value: string) => (
        <span>
          {allWarehouses.find((item) => item?.id === value)?.name || value}
        </span>
      ),
    },
    {
      title: "Loại sự cố",
      dataIndex: "issue_type_id",
      render: (value: string) =>
        issueTypes.find((item) => item?.issue_type_id === value)?.name,
    },
    {
      title: "Thời gian kích hoạt",
      dataIndex: "backlog_hour",
    },
    {
      title: "Thời gian giải trình",
      dataIndex: "deadline_hour",
    },
    {
      title: "Chức danh giải trình",
      dataIndex: "titles",
      render: (value: any) => {
        const formatValue = value && value.toString().replaceAll(",", "|");
        return <ReadMore text={formatValue} />;
      },
    },
  ];

  const columnsAssignmentRate = [
    {
      title: "Bưu cục",
      dataIndex: "hub_id",
      render: (value: string) => (
        <span>
          {allWarehouses.find((item) => item?.id === value)?.name || value}
        </span>
      ),
    },
    {
      title: "Loại sự cố",
      dataIndex: "issue_type_id",
      render: (value: string) =>
        issueTypes.find((item) => item?.issue_type_id === value)?.name,
    },
    {
      title: "Thời gian kích hoạt",
      dataIndex: "time",
      render: (_: any, row: any) => {
        const { trigger_hour, warn_minute } = row;
        return (
          <div className={s.viewDataRow}>
            <p>
              <strong className={s.label}>Cảnh báo:</strong>
              <span className={s.value}>{warn_minute} phút</span>
            </p>
            <p>
              <strong className={s.label}>Phiếu phạt:</strong>
              <span className={s.value}>{trigger_hour} giờ</span>
            </p>
          </div>
        );
      },
    },
    {
      title: "Mốc ngừng gán của ngày",
      dataIndex: "end_trigger_time",
      width: 150,
    },
    {
      title: "Thiết lập tỉ lệ/tiền phạt",
      dataIndex: "id",
      render: (_: any, row: any) => {
        const { penalty_amount, ratio } = row;
        return (
          <div className={s.viewDataRow}>
            <p>
              <strong className={s.label}>Tỉ lệ gán:</strong>
              <span className={s.value}>{ratio * 1}%</span>
            </p>
            <p>
              <strong className={s.label}>Tiền phạt:</strong>
              <span className={s.value}>
                {numeral(penalty_amount).format("0,0")}
              </span>
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className={s.contentTab}>
        <div className={s.viewLeft}>
          <div className={s.viewTitleLeft}>
            <p>Danh sách phiên bản</p>
            <a
              className={s.textDownload}
              href={
                type === "backlog"
                  ? "/qlcl/file/[TTTD] CONFIG_20220302.xlsx"
                  : "/qlcl/file/[TTTD] CONFIG_TI_LE_GAN_20220302.xlsx"
              }
              download
            >
              <span>Tải file mẫu</span>
              <FaFileImport style={{ marginLeft: "4px" }} />
            </a>
          </div>
          <div className={s.wrapperContentLeft}>
            <InfiniteScroll
              dataLength={dataVersions.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={genViewLoading()}
              height={"calc(100vh - 220px)"}
              className={s.infiniteScroll}
            >
              {dataVersions.length === 0
                ? genViewEmpty()
                : dataVersions.map((item, idx) => (
                    <div style={{ padding: "1px" }} key={idx}>
                      <ItemVersion
                        item={item}
                        onSelect={handleClickItemVersion}
                        isActive={versionSelected?.version === item?.version}
                      />
                    </div>
                  ))}
              <UploadFileSystemSettings
                onCallback={handleReloadVersionList}
                type={type}
              />
            </InfiniteScroll>
          </div>
        </div>
        <div className={s.viewRight}>
          <div className={s.contentRight}>
            <div className={s.contentRight__title}>Chi tiết thiết lập</div>
            <TableSettingDetail
              columns={
                type === "backlog" ? columnsBacklog : columnsAssignmentRate
              }
              dataSource={dataSettingDetail?.data || []}
              loading={loadingSettingDetail}
              version={versionSelected?.version}
              type={type}
            />
          </div>
          <div className={s.viewBottom}>{genViewButton()}</div>
        </div>
      </div>
      <CustomModal
        visible={openModalConfirmDelete}
        onCancel={handleCloseModalConfirm}
      >
        <div className={s.contentModalConfirm}>
          <p className={s.textTitle}>
            Xoá phiên bản <span>{versionSelected?.version}</span>
          </p>
          <p className={s.textDesc}>Bạn có chắc muốn xóa phiên bản này?</p>
          <div className={s.viewButton}>
            <Button onClick={handleCloseModalConfirm} className={s.btnCancel}>
              Huỷ
            </Button>
            <Button
              onClick={handleDeleteVersion}
              loading={loadingDelete}
              className={s.btnConfirm}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default memo(ContentTab);

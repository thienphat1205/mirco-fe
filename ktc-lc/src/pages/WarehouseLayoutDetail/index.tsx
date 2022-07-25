/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo, lazy } from "react";
import s from "./index.module.less";
import { Spin, Button, Skeleton, notification } from "antd";
import ItemArea from "./ItemArea";
import { FaPlusCircle } from "react-icons/fa";
import FormEditArea from "./FormEditArea";
import { createSearchParams, useParams, useNavigate } from "react-router-dom";
import {
  getAreaListByLayoutAPI,
  PayloadGetAreaByLayout,
  getAreaByIdAPI,
  updateAreaAPI,
} from "@/services/layout";
import { dialog, getLocalStorage, getParamUrl } from "@/utils/utils";
import { IArea } from "@/modal";
const NotFound = lazy(() => import("@/pages/NotFound"));

const WarehouseLayoutDetail: React.FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const currentHub = getLocalStorage("CURRENT_HUB") || "";
  const [areaSelected, setAreaSelected] = useState<IArea>({} as IArea);
  const [loadingAreaList, setLoadingAreaList] = useState<boolean>(false);
  const [areaList, setAreaList] = useState<IArea[]>([]);
  const [loadingViewRight, setLoadingViewRight] = useState<boolean>(false);
  const [loadingUpdateArea, setLoadingUpdateArea] = useState<boolean>(false);
  const [isDifferentHub, setIsDifferentHub] = useState<boolean>(false);

  const layoutName = getParamUrl("name") || "";

  useEffect(() => {
    if (id) {
      handleGetAreaListByLayout();
    }
  }, []);

  const handleGetAreaListByLayout = async () => {
    const payload: PayloadGetAreaByLayout = {
      hub_id: currentHub,
      layout: id,
      paging: { limit: 0, offset: 0 },
    };
    try {
      setLoadingAreaList(true);
      const response: any = await getAreaListByLayoutAPI(payload);
      setLoadingAreaList(false);
      const { data, code } = response;
      if (code === 45001) {
        setIsDifferentHub(true);
        throw response;
      }
      if (code !== 200) throw response;
      const areaList = data?.data;
      if (Array.isArray(areaList)) {
        setAreaList(areaList);
        if (!areaSelected?.hub_area_id) {
          const [firstItem] = areaList;
          handleGetAreaById(firstItem?.hub_area_id);
        }
      }
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleClickItemShift = useCallback(
    (area: IArea): void => {
      if (area?.hub_area_id !== areaSelected?.hub_area_id) {
        handleGetAreaById(area?.hub_area_id);
      }
    },
    [areaSelected]
  );

  const handleGetAreaById = async (hub_area_id: string) => {
    try {
      setAreaSelected({} as IArea);
      setLoadingViewRight(true);
      const response: any = await getAreaByIdAPI({ hub_area_id });
      setLoadingViewRight(false);
      const { data, code } = response;
      if (code !== 200) throw response;
      setAreaSelected(data);
    } catch (errors) {
      dialog(errors);
    }
  };

  const genViewEmpty = (): JSX.Element | null => {
    if (loadingAreaList) return genViewLoading();
    return null;
  };

  const genViewLoading = (): JSX.Element => {
    return (
      <div className={s.viewLoading}>
        <Spin />
      </div>
    );
  };

  const genViewRightEmpty = (): JSX.Element => {
    if (loadingAreaList || loadingViewRight)
      return (
        <div
          className={s.viewRightEmpty}
          style={{ padding: "1rem", justifyContent: "flex-start" }}
        >
          <Skeleton active />
        </div>
      );
    return (
      <div className={s.viewRightEmpty}>
        {areaList.length === 0 ? (
          <>
            <p>⚠️ Kho chưa có khu làm việc nào ⚠️</p>
            <p>Vui lòng tạo các khu vực làm việc cùng các thao tác tương ứng</p>
            <p style={{ fontSize: "3rem" }}>👈</p>
          </>
        ) : (
          <>
            <p>⚠️ Chọn khu làm việc ⚠️</p>
            <p style={{ fontSize: "3rem" }}>👈</p>
          </>
        )}
      </div>
    );
  };

  const handleSubmitConfigArea = async (values: any) => {
    try {
      setLoadingUpdateArea(true);
      const response: any = await updateAreaAPI({
        ...areaSelected,
        ...values,
      });
      setLoadingUpdateArea(false);
      const { code, message } = response;
      if (code !== 200) throw response;
      notification.success({ message });
      handleGetAreaById(areaSelected?.hub_area_id);
      handleGetAreaListByLayout();
    } catch (errors) {
      dialog(errors);
    }
  };

  const initialValuesForm = useMemo(() => areaSelected, [areaSelected]);

  const isShowForm = areaSelected?.area_code;

  if (isDifferentHub) return <NotFound />;

  return (
    <div className={s.root}>
      <div className={s.titlePage}>
        <span>THIẾT LẬP KHU VỰC KHO - {layoutName}</span>
      </div>
      <div className={s.viewContentTab}>
        <div className={s.contentTab}>
          <div className={s.viewLeft}>
            <div className={s.wrapperContentLeft}>
              {areaList.length === 0
                ? genViewEmpty()
                : areaList.map((item, idx) => (
                    <div style={{ padding: "1px" }} key={idx}>
                      <ItemArea
                        item={item}
                        onSelect={handleClickItemShift}
                        isActive={
                          areaSelected?.hub_area_id === item?.hub_area_id
                        }
                      />
                    </div>
                  ))}
              <div
                className={s.btnAddNewArea}
                onClick={() =>
                  navigate({
                    pathname: `/create-area/${id}`,
                    search: createSearchParams({
                      layoutName,
                    }).toString(),
                  })
                }
              >
                <FaPlusCircle className={s.icon} />
                <span>Thêm khu vực mới</span>
              </div>
            </div>
          </div>
          <div className={s.viewRight}>
            <div className={s.contentRight}>
              {isShowForm ? (
                <FormEditArea
                  onSubmit={handleSubmitConfigArea}
                  initialValues={initialValuesForm}
                  onReloadArea={() =>
                    handleGetAreaById(areaSelected?.hub_area_id)
                  }
                />
              ) : (
                genViewRightEmpty()
              )}
            </div>
            <div className={s.footerRight}>
              <div className={s.viewButton}>
                {isShowForm && (
                  <>
                    <div className={s.buttonAction}>
                      <Button
                        className={s.btnRemove}
                        onClick={() => {
                          setAreaSelected({} as IArea);
                          navigate("/config-layout");
                        }}
                      >
                        Bỏ qua
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        form="config-area"
                        loading={loadingUpdateArea}
                      >
                        Lưu lại
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WarehouseLayoutDetail;

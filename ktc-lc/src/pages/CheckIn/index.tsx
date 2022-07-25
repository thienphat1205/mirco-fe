/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import s from "./index.module.less";
import { Empty, Spin } from "antd";
import ItemArea from "./ItemArea";
import EmployeeList from "./EmployeeList";
import { dialog, getLocalStorage } from "@/utils/utils";
import { getAreaListCheckinAPI, getUserTypesAPI } from "@/services/checkin";

export interface IArea {
  area_name: string;
  area_code: string;
  description: string;
  current_user_checkin: string;
  hub_area_id: string;
}

export interface IUserType {
  id: number;
  name: string;
}

const CheckIn: React.FC = () => {
  const currentHub = getLocalStorage("CURRENT_HUB") || "";
  const [areaSelected, setAreaSelected] = useState<IArea>({} as IArea);
  const [loadingAreaList, setLoadingAreaList] = useState<boolean>(false);
  const [areaList, setAreaList] = useState<IArea[]>([]);
  const [userTypes, setUserTypes] = useState<IUserType[]>([]);

  useEffect(() => {
    handleGetAreaListByLayout();
    handleGetUserTypes();
  }, []);

  const handleGetUserTypes = useCallback(async () => {
    try {
      const response: any = await getUserTypesAPI();
      const { data, code } = response;
      if (code !== 200) throw response;
      const userTypes = data?.data;
      if (Array.isArray(userTypes)) {
        setUserTypes(userTypes);
      }
    } catch (error) {
      dialog(error);
    }
  }, []);

  const handleGetAreaListByLayout = async () => {
    const payload = { hub_id: currentHub };
    try {
      setLoadingAreaList(true);
      const response: any = await getAreaListCheckinAPI(payload);
      setLoadingAreaList(false);
      const { data, code } = response || {};
      if (code !== 200) throw response;
      const areaListRes = data;
      if (Array.isArray(areaListRes)) {
        setAreaList(areaListRes);
        if (!areaSelected?.hub_area_id) {
          setAreaSelected(areaListRes[0] || ({} as IArea));
        }
      }
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleClickItemShift = useCallback(
    (area: IArea): void => {
      setAreaSelected(area);
    },
    [areaSelected]
  );

  const genViewEmpty = (): JSX.Element => {
    if (loadingAreaList) return genViewLoading();
    return (
      <div className={s.viewLoading}>
        <Empty description="Không có dữ liệu" />
      </div>
    );
  };

  const genViewLoading = (): JSX.Element => {
    return (
      <div className={s.viewLoading}>
        <Spin />
      </div>
    );
  };

  return (
    <div className={s.root}>
      <div className={s.titlePage}>CHECK-IN KHU VỰC LÀM VIỆC</div>
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
                        isActive={areaSelected?.hub_area_id === item?.hub_area_id}
                      />
                    </div>
                  ))}
            </div>
          </div>
          <div className={s.viewRight}>
            {areaSelected?.hub_area_id && (
              <div className={s.contentRight}>
                <EmployeeList
                  areaItem={areaSelected}
                  userTypes={userTypes}
                  onReloadAreaList={handleGetAreaListByLayout}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckIn;

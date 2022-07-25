import React, { useState, useCallback } from "react";
import s from "./index.module.less";
import { Row, Col, Button } from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { dialog, getLocalStorage } from "@/utils/utils";
import {
  deleteLayoutAPI,
  applyLayoutAPI,
  PayloadUpdateLayoutType,
} from "@/services/layout";
import CustomModal from "@/components/CustomModal";
import ContentModalConfirm from "@/components/ContentModalConfirm";

interface IItemVersion {
  item: any;

  onReloadLayoutList: Function;
}

const ItemVersionLayout: React.FC<IItemVersion> = ({
  item,
  onReloadLayoutList,
}) => {
  const navigate = useNavigate();
  const { layout, name, created_at, area_number, isApply } = item;
  const currentHub = getLocalStorage("CURRENT_HUB") || "";
  const [loadingApply, setLoadingAction] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);

  const hanldeApply = async (layout: string) => {
    const payload: PayloadUpdateLayoutType = {
      hub_id: currentHub,
      layout,
    };
    try {
      setLoadingAction(true);
      const response: any = await applyLayoutAPI(payload);
      setLoadingAction(false);
      const { code } = response;
      if (code !== 200) throw response;
      onReloadLayoutList();
    } catch (errors) {
      dialog(errors);
    }
  };

  const hanldeRemove = async (layout: string) => {
    const payload: PayloadUpdateLayoutType = {
      hub_id: currentHub,
      layout,
    };
    try {
      setLoadingDelete(true);
      const response: any = await deleteLayoutAPI(payload);
      setLoadingDelete(false);
      const { code } = response;
      if (code !== 200) throw response;
      handleCloseModalConfirm();
      onReloadLayoutList();
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleCloseModalConfirm = useCallback(() => {
    setOpenModalConfirm(false);
  }, []);

  return (
    <>
      <Row className={s.itemVersionLayout}>
        {isApply && <div className={s.apply}>Đang áp dụng</div>}

        <Col span={4}>
          <div className={s.blockInfo}>
            <p className={s.blockInfo__label}>Mã layout</p>
            <p className={s.blockInfo__value}>{layout}</p>
          </div>
        </Col>
        <Col span={6}>
          <div className={s.blockInfo}>
            <p className={s.blockInfo__label}>Tên layout</p>
            <div className={s.blockInfo__value}>{name}</div>
          </div>
        </Col>
        <Col span={4}>
          <div className={s.blockInfo}>
            <p className={s.blockInfo__label}>Ngày tạo</p>
            <p className={s.blockInfo__value}>
              {created_at && moment(created_at).format("DD/MM/YYYY")}
            </p>
          </div>
        </Col>
        <Col span={4}>
          <div className={s.blockInfo}>
            <p className={s.blockInfo__label}>Số lượng khu vực</p>
            <p className={s.blockInfo__value}>{area_number}</p>
          </div>
        </Col>
        <Col span={6}>
          <div className={s.viewButtonGroup}>
            <Button
              className={s.btn}
              onClick={() =>
                navigate({
                  pathname: `/config-layout/${layout}`,
                  search: createSearchParams({
                    name,
                  }).toString(),
                })
              }
            >
              Xem
            </Button>
            {!isApply && (
              <>
                <Button
                  className={s.btn}
                  loading={loadingApply}
                  onClick={() => hanldeApply(layout)}
                >
                  Áp dụng
                </Button>
                <Button
                  className={s.btnRemove}
                  onClick={() => setOpenModalConfirm(true)}
                >
                  Xoá
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
      <CustomModal
        visible={openModalConfirm}
        onCancel={handleCloseModalConfirm}
      >
        <ContentModalConfirm
          title="Xóa layout"
          description={`Chắc chắn muốn xóa layout ${name}`}
          btnText="Xác nhận"
          onOk={() => hanldeRemove(layout)}
          loading={loadingDelete}
        />
      </CustomModal>
    </>
  );
};

export default ItemVersionLayout;

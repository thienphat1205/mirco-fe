import React, { createContext, useContext, useState, useCallback } from "react";
import { useParams, useNavigate, createSearchParams } from "react-router-dom";
import FormCreateArea from "./FormCreateArea";
import styles from "./index.module.less";
import { Steps, Button } from "antd";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { dialog, getLocalStorage, getParamUrl } from "@/utils/utils";
import {
  getAreaByIdAPI,
  createAreaAPI,
  updateAreaAPI,
  deleteAreaAPI,
} from "@/services/layout";
import { IArea } from "@/modal";
import PrintQRCode from "@/components/PrintQRCodeArea";
import CustomModal from "@/components/CustomModal";

const { Step } = Steps;

interface ICreateNewAreaContext {
  currentStep: number;
  layout: string;

  hubActions: any[];

  hubAreaActions: any[];
}

const CreateNewAreaContext = createContext({} as ICreateNewAreaContext);

export const useContextCreateNewArea = () => useContext(CreateNewAreaContext);

const CreateNewArea: React.FC = () => {
  const { layout = "" } = useParams();
  const navigate = useNavigate();
  const currentHub = getLocalStorage("CURRENT_HUB") || "";
  const layoutName = getParamUrl("layoutName") || "";
  const { hubActions = [], hubAreaActions = [] } = useTypedSelector(
    (state) => state.metaData
  );
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [commonState, setCommonState] = useState<IArea>({} as IArea);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmitForm = async (values: any) => {
    if (currentStep === 0) {
      handleCreateArea(values);
    } else {
      handleUpdateArea(values);
    }
  };

  const handleGetAreaById = async (hub_area_id: string) => {
    try {
      setCommonState({} as IArea);
      const response: any = await getAreaByIdAPI({ hub_area_id });
      const { data, code } = response;
      if (code !== 200) throw response;
      setCommonState(data);
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleCreateArea = async (values: any) => {
    const payload = {
      ...values,
      hub_id: currentHub,
      layout,
      name: values?.area_name.trim(),
      code: values?.area_code,
    };
    try {
      setLoading(true);
      const response: any = await createAreaAPI(payload);
      setLoading(false);
      const { data, code } = response;
      if (code !== 200) throw response;
      handleGetAreaById(data?.hub_area_id);
      handleNext();
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleUpdateArea = async (values: any) => {
    try {
      setLoading(true);
      const response: any = await updateAreaAPI({
        ...commonState,
        ...values,
      });
      setLoading(false);
      const { code } = response;
      if (code !== 200) throw response;
      handleGetAreaById(commonState?.hub_area_id);
      handleNext();
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleSubmitModalConfirm = () => {
    if (currentStep < 1) {
      handleBackToAreaList();
    } else if (currentStep === 3) {
      handleResetForm();
    } else {
      handleRemoveArea();
    }
  };

  const handleRemoveArea = async () => {
    try {
      const { hub_area_id } = commonState;
      setLoadingDelete(true);
      const response: any = await deleteAreaAPI({
        hub_area_id,
      });
      setLoadingDelete(false);
      const { code } = response;
      if (code !== 200) throw response;
      handleBackToAreaList();
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleBackToAreaList = () =>
    navigate({
      pathname: `/config-layout/${layout}`,
      search: createSearchParams({
        name: layoutName,
      }).toString(),
    });

  const handleResetForm = () => {
    setCommonState({} as IArea);
    setCurrentStep(0);
    handleCloseModal();
  };

  const handleCloseModal = useCallback(() => {
    setOpenModalConfirm(false);
  }, []);

  const isFinalStep = currentStep === 3;

  return (
    <>
      <div className={styles.createNewArea}>
        <div className={styles.viewTop}>
          <div className={styles.viewTitle}>
            <span className={styles.title}>
              Thiết lập khu vực kho - {layoutName}
            </span>
          </div>
          <div style={{ padding: "0 5rem" }}>
            <Steps current={currentStep}>
              <Step title="Tạo khu vực mới" />
              <Step title="Thiết lập chức năng" />
              <Step title="Thiết lập ca & nhân viên" />
              <Step title="In QR code " />
            </Steps>
          </div>
        </div>
        <div className={styles.viewForm}>
          {isFinalStep ? (
            <PrintQRCode
              areaId={commonState?.hub_area_id}
              showInfoArea={true}
            />
          ) : (
            <CreateNewAreaContext.Provider
              value={{ currentStep, layout, hubActions, hubAreaActions }}
            >
              <FormCreateArea
                onSubmit={handleSubmitForm}
                initialValues={commonState}
                onReloadArea={() => handleGetAreaById(commonState?.hub_area_id)}
              />
            </CreateNewAreaContext.Provider>
          )}
        </div>
        <div className={styles.footer}>
          <Button
            className={styles.btnCancel}
            onClick={() =>
              isFinalStep ? handleBackToAreaList() : setOpenModalConfirm(true)
            }
          >
            {currentStep < 3 ? "Huỷ" : "Về ds khu vực"}
          </Button>
          {isFinalStep ? (
            <Button type="primary" onClick={() => setOpenModalConfirm(true)}>
              Kết thúc
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              form="create-area"
              loading={loading}
            >
              Tiếp tục
            </Button>
          )}
        </div>
      </div>
      <CustomModal
        visible={openModalConfirm}
        onCancel={handleCloseModal}
        width={375}
      >
        <div className={styles.contentModalConfirm}>
          <p className={styles.textTitle}>
            {isFinalStep ? "Hoàn tất thiết lập" : "Xác nhận"}
          </p>
          <p className={styles.textDesc}>
            {isFinalStep
              ? "Tạo khu vực thành công. Bạn có muốn tạo thêm khu vực mới?"
              : "Quá trình tạo khu vực chưa hoàn tất. Xác nhận quay về danh sách khu vực"}
          </p>
          <div className={styles.viewBtn}>
            {isFinalStep && (
              <Button className={styles.btnBack} onClick={handleBackToAreaList}>
                Về ds khu vực
              </Button>
            )}

            <Button
              className={styles.btnOk}
              onClick={handleSubmitModalConfirm}
              loading={loadingDelete}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default CreateNewArea;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, forwardRef } from "react";
import s from "./index.module.less";
import { getAreaByIdAPI } from "@/services/layout";
import { refreshCheckinCodeAPI } from "@/services/shift";
import { IArea } from "@/modal";
import { Spin, Button, notification } from "antd";
import { dialog } from "@/utils/utils";
import ReactToPrint from "react-to-print";
import { QRCode } from "react-qrcode-logo";
import logo from "../../assets/images/logo_qr_code.svg";
import { FaPrint } from "react-icons/fa";

interface ViewToPrintProps {
  areaCode: string;

  areaName: string;
  checkinCode: string;
}

const ViewToPrint = forwardRef<HTMLDivElement, ViewToPrintProps>(
  (props, ref) => {
    const { areaCode, areaName, checkinCode } = props;
    return (
      <div ref={ref} className={s.viewToPrint}>
        <QRCode
          value={checkinCode}
          size={400}
          eyeRadius={5}
          logoImage={logo}
          logoHeight={100}
          logoWidth={100}
        />
        <div className={s.areaName}>{areaName}</div>
        <p className={s.areaCode}>{areaCode}</p>
      </div>
    );
  }
);

const PrintQRCode: React.FC<{ areaId: string; showInfoArea?: boolean }> = ({
  areaId,
  showInfoArea = false,
}) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [areaSelected, setAreaSelected] = useState<IArea>({} as IArea);
  const [loadingRefresh, setLoadingRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (areaId) {
      handleGetAreaById();
    }
  }, [areaId]);

  const handleGetAreaById = async () => {
    try {
      const response: any = await getAreaByIdAPI({
        hub_area_id: areaId,
      });
      const { data, code } = response;
      if (code !== 200) throw response;
      setAreaSelected(data);
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleRefreshCheckinCode = async () => {
    const { hub_id, layout, area_code } = areaSelected;
    try {
      setLoadingRefresh(true);
      const response: any = await refreshCheckinCodeAPI({
        hub_id,
        layout,
        area_code,
      });
      setLoadingRefresh(false);
      const { code, message } = response;
      if (code !== 200) throw response;
      notification.success({ message });
      handleGetAreaById();
    } catch (errors) {
      dialog(errors);
    }
  };

  const { area_code, area_name, checkin_code } = areaSelected;

  const pageStyleA4 = `
  @page {
    size: A4;
    margin: 0;
  }
  @media print {
    html, body {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 210mm;
      height: 297mm;
    }
  }
`;

  const pageStyleA5 = `
@page {
  size: A5;
  margin: 0;
}
@media print {
  html, body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210mm;
    height: 297mm;
  }
}
`;

  return (
    <div className={s.printQRCode}>
      {!areaSelected?.area_code ? (
        <Spin size="large" />
      ) : (
        <>
          <div style={{ display: "none" }}>
            <ViewToPrint
              ref={componentRef}
              areaCode={area_code}
              areaName={area_name}
              checkinCode={checkin_code}
            />
          </div>
          <Button
            type="primary"
            onClick={handleRefreshCheckinCode}
            loading={loadingRefresh}
          >
            Gen mã mới
          </Button>
          <QRCode
            value={checkin_code}
            size={200}
            eyeRadius={5}
            logoImage={logo}
            logoHeight={60}
            logoWidth={60}
          />
          {showInfoArea && (
            <>
              <p className={s.areaName}>{area_name}</p>
              <p className={s.areaCode}>{area_code}</p>
            </>
          )}

          <div
            className={s.viewButton}
            style={!showInfoArea ? { marginTop: "1rem" } : {}}
          >
            <ReactToPrint
              trigger={() => {
                return (
                  <Button className={s.btnPrint}>
                    <FaPrint className={s.btnPrint__icon} />
                    <span>In A4</span>
                  </Button>
                );
              }}
              content={() => componentRef.current}
              pageStyle={pageStyleA4}
            />
            <ReactToPrint
              trigger={() => {
                return (
                  <Button className={s.btnPrint}>
                    <FaPrint className={s.btnPrint__icon} />
                    <span>In A5</span>
                  </Button>
                );
              }}
              content={() => componentRef.current}
              pageStyle={pageStyleA5}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PrintQRCode;

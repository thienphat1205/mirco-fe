import Images from "@/constants/images";
import { getCheckInCodeAPI } from "@/services/checkin";
import { dialog, getLocalStorage } from "@/utils/utils";
import { Button, Form, Spin } from "antd";
import { forwardRef, useRef, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { QRCode } from "react-qrcode-logo";
import { useReactToPrint } from "react-to-print";
import s from "./index.module.less";

interface ViewToPrintProps {
  session_code: string;
  user_name: string;
}

const ViewToPrint = forwardRef<HTMLDivElement, ViewToPrintProps>((props, ref) => {
  const { session_code, user_name } = props;
  return (
    <div ref={ref} className={s.viewToPrint}>
      <QRCode
        value={session_code}
        size={200}
        eyeRadius={5}
        logoImage={Images.logo}
        logoHeight={60}
        logoWidth={60}
      />
      <p>{user_name}</p>
    </div>
  );
});

function EmployeeQR() {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [dataCode, setDataCode] = useState<ViewToPrintProps>({} as ViewToPrintProps);
  const [isLoadingCode, setIsLoadingCode] = useState<boolean>(false);

  const pageStyle = `
  @page {
    size: 80mm;
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

  const onFinish = (values: { code: string }) => {
    handleGetCheckInCode(values.code);
  };

  const handleGetCheckInCode = async (user_id: string) => {
    try {
      const hub_id = getLocalStorage("CURRENT_HUB") || "";
      setIsLoadingCode(true);
      const response: any = await getCheckInCodeAPI({ user_id, hub_id });
      setIsLoadingCode(false);
      const { data, code } = response;
      if (code !== 200) {
        setDataCode({} as ViewToPrintProps);
        throw response;
      }
      setDataCode(data || {});
      let timeOut = setTimeout(function () {
        handlePrint();
      }, 1000);

      return () => {
        clearTimeout(timeOut);
      };
    } catch (error) {
      dialog(error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
  });

  const genLoading = () => {
    return (
      <div className={s.viewLoading}>
        <div className={s.viewSkeleton}>
          <Spin size="large" />
        </div>
      </div>
    );
  };

  return (
    <div className={s.root}>
      <div className={s.titlePage}>TẠO MÃ QR CÁ NHÂN</div>
      <div className={s.viewContentTab}>
        <div className={s.formInputUserId}>
          <Form
            name="formInputUserId"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            colon={false}
          >
            <div className={s.viewSearch}>
              <Form.Item
                label="Nhập số điện thoại"
                name="code"
                rules={[{ required: true, message: "Nhập số điện thoại nhân viên!" }]}
              >
                <div className={s.viewItem}>
                  <input
                    placeholder="Nhập số điện thoại nhân viên để in mã"
                    className={s.input}
                    type="number"
                  />
                  <div className={s.viewButton} style={{ marginLeft: 10 }}>
                    <Button className={s.btnConfirm} htmlType="submit">
                      <FaPrint />
                      <span style={{ marginLeft: 4 }}>In Qr-code</span>
                    </Button>
                  </div>
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
        {isLoadingCode
          ? genLoading()
          : dataCode.session_code && (
              <ViewToPrint
                ref={componentRef}
                session_code={dataCode.session_code}
                user_name={dataCode.user_name}
              />
            )}
      </div>
    </div>
  );
}

export default EmployeeQR;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import styles from "./index.module.less";
import { Row, Col } from "antd";
import { CSSTransition } from "react-transition-group";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { setPreviousUrl, getPreviousURL, getEnv } from "@/utils/utils";

interface ViewProps {
  isOpen: boolean;
}

interface ItemApp {
  indexApp: number;
  key: string;
  name: string;
  className: string;
  link: {
    LOCAL: string;
    STAGING: string;
    BETA: string;
    PRODUCTION: string;
  };
}

type UiAppListType = ItemApp[];

const renderUiAppList: UiAppListType = [
  {
    indexApp: 1,
    key: "giao_lay_tra",
    name: "Giao-Lấy-Trả",
    className: "app-lastmile",
    link: {
      LOCAL: "https://nhanh.ghn.dev",
      STAGING: "https://nhanh.ghn.dev",
      BETA: "https://beta-nhanh.ghn.vn",
      PRODUCTION: "https://nhanh.ghn.vn",
    },
  },
  {
    indexApp: 2,
    key: "khach_hang_lon",
    name: "Kho khách hàng lớn",
    className: "app-megahub",
    link: {
      LOCAL: "https://nhanh.ghn.dev/khach-hang-lon",
      STAGING: "https://nhanh.ghn.dev/khach-hang-lon",
      BETA: "https://beta-nhanh.ghn.vn/khach-hang-lon",
      PRODUCTION: "https://nhanh.ghn.vn/khach-hang-lon",
    },
  },
  {
    indexApp: 3,
    key: "nhan_hang_tai_bc",
    name: "Nhận hàng tại BC",
    className: "app-station",
    link: {
      LOCAL: "https://nhanh.ghn.dev/giao-lay-tra",
      STAGING: "https://nhanh.ghn.dev/giao-lay-tra",
      BETA: "https://beta-nhanh.ghn.vn/giao-lay-tra",
      PRODUCTION: "https://nhanh.ghn.vn/giao-lay-tra",
    },
  },
  {
    indexApp: 4,
    key: "ktc_van_tai",
    name: "KTC và Vận tải",
    className: "app-inside",
    link: {
      LOCAL: "https://nhanh.ghn.dev/ktc-van-tai",
      STAGING: "https://nhanh.ghn.dev/ktc-van-tai",
      BETA: "https://beta-nhanh.ghn.vn/ktc-van-tai",
      PRODUCTION: "https://nhanh.ghn.vn/ktc-van-tai",
    },
  },
  {
    indexApp: 5,
    key: "quan_ly_kho_tuyen",
    name: "Quản lý Kho và Tuyến",
    className: "app-hub",
    link: {
      LOCAL: "https://nhanh.ghn.dev/quan-ly-kho-tuyen",
      STAGING: "https://nhanh.ghn.dev/quan-ly-kho-tuyen",
      BETA: "https://beta-nhanh.ghn.vn/quan-ly-kho-tuyen",
      PRODUCTION: "https://nhanh.ghn.vn/quan-ly-kho-tuyen",
    },
  },
];

const ViewSelectApp: React.FC<ViewProps> = ({ isOpen }) => {
  const { allowedAppList } = useTypedSelector((state) => state.user);

  const [appDataDisplay, setAppDataDisplay] = useState<any[]>([]);

  useEffect(() => {
    const ENV = getEnv();
    const formatData = allowedAppList
      .map((item) => {
        const findItem: any = renderUiAppList.find(
          (itemApp) => itemApp.key === item
        );
        return {
          name: findItem?.name,
          className: findItem?.className,
          link: findItem?.link[ENV],
          indexApp: findItem?.indexApp,
          key: findItem?.key,
        };
      })
      .sort((a: any, b: any) => a?.indexApp - b?.indexApp);
    const perChunk = 4;
    const result = formatData.reduce((resultArray: any, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
    setAppDataDisplay(result);
  }, [allowedAppList]);

  const genListApp = (list: any): JSX.Element => {
    return (
      <>
        {list.map((app: any, idx: number) => {
          const { name, className } = app;
          return (
            <Col md={6} sm={12} xs={24} key={idx}>
              <div
                className={`${styles.itemApp} ${styles[className]}`}
                onClick={() => openNewPage(app)}
              >
                <div className={styles.viewTitleApp}>
                  <p className={styles.textTitle}>{name}</p>
                </div>
              </div>
            </Col>
          );
        })}
      </>
    );
  };

  const openNewPage = (appSelected: any) => {
    const { pathname, search } = window.location;
    const { link, key } = appSelected;
    const prevUrl = getPreviousURL();
    const pathReplace = pathname
      .replace("/giao-lay-tra/", "/")
      .replace("/giao-lay-tra", "/");
    const newObjUrl = {
      ...prevUrl,
      truy_thu_tu_dong: !search ? pathReplace : `${pathReplace}${search}`,
    };
    setPreviousUrl(newObjUrl);
    const prevPathAppSelected = prevUrl[key];
    let href = link;
    if (prevPathAppSelected) {
      href = `${link}${prevPathAppSelected}`;
    }
    window.location.href = href;
  };

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={isOpen}
      timeout={{
        enter: 400,
        exit: 700,
      }}
      classNames={{
        enterActive: `${styles.viewSelectApp__open}`,
        exitActive: `${styles.viewSelectApp__closed}`,
      }}
    >
      <div className={styles.viewSelectApp}>
        <div className={styles.viewTop}></div>
        {appDataDisplay.map((appList, idx) => (
          <Fragment key={idx}>
            <Row gutter={[20, 20]}>{genListApp(appList)}</Row>
            <div className={styles.divider} />
          </Fragment>
        ))}
      </div>
    </CSSTransition>
  );
};

export default React.memo(ViewSelectApp);

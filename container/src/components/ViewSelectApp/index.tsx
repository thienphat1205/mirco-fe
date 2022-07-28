/* eslint-disable react-hooks/exhaustive-deps */
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { appList, getEnv } from "@/utils/utils";
import { Col, Row } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./index.module.less";

interface ViewProps {
  isOpen: boolean;

  onClose: () => void;
}

const ViewSelectApp: React.FC<ViewProps> = ({ isOpen, onClose }) => {

  const { allowedAppList } = useTypedSelector((state) => state.user);

  const [appDataDisplay, setAppDataDisplay] = useState<any[]>([]);

  useEffect(() => {
    const ENV = getEnv();
    const formatData = allowedAppList
      .map((item: any) => {
        const findItem: any = appList.find((itemApp) => itemApp.key === item);
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
    const result = formatData.reduce((resultArray: any, item: any, index: any) => {
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
          const { name, className, key } = app;
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
    // const { pathname, search } = window.location;
    const { link, key } = appSelected;
    // const prevUrl = getPreviousURL();
    // const pathReplace = pathname
    //   .replace("/ktc-lc/", "/")
    //   .replace("/ktc-lc", "/");
    // const newObjUrl = {
    //   ...prevUrl,
    //   ktc_lc: !search ? pathReplace : `${pathReplace}${search}`,
    // };
    // setPreviousUrl(newObjUrl);
    // const prevPathAppSelected = prevUrl[key];
    // let href = link;
    // if (prevPathAppSelected) {
    //   href = `${link}${prevPathAppSelected}`;
    // }
    // navigate(link);
    window.location.href = link;
    onClose();
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

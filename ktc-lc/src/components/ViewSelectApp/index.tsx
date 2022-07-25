/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import styles from "./index.module.less";
import { Row, Col } from "antd";
import { CSSTransition } from "react-transition-group";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { setPreviousUrl, getPreviousURL, getEnv, appList } from "@/utils/utils";

interface ViewProps {
  isOpen: boolean;
}

const ViewSelectApp: React.FC<ViewProps> = ({ isOpen }) => {
  const { allowedAppList } = useTypedSelector((state) => state.user);

  const [appDataDisplay, setAppDataDisplay] = useState<any[]>([]);

  useEffect(() => {
    const ENV = getEnv();
    const formatData = allowedAppList
      .map((item) => {
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
        {list.map((app: any) => {
          const { name, className, key } = app;
          return (
            <Col md={6} sm={12} xs={24} key={key}>
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
      .replace("/ktc-lc/", "/")
      .replace("/ktc-lc", "/");
    const newObjUrl = {
      ...prevUrl,
      ktc_lc: !search ? pathReplace : `${pathReplace}${search}`,
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

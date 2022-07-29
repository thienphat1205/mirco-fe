import React, { useState, useCallback } from "react";
import { Row, Col } from "antd";
import s from "./index.module.less";
import GHNtext from "@/assets/images/ghn-text.png";
import numeral from "numeral";
import { denominationsList } from "@/utils/utils";
import ModalDepositMoney from "@/components/ModalDepositMoney";

const DepositMoney: React.FC = () => {
  const [itemSelected, setItemSelected] = useState<object>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [keyModal, setkeyModal] = useState(Date.now());

  const handleCloseModal = useCallback((): void => {
    setItemSelected({});
    setOpenModal(false);
  }, []);

  return (
    <>
      <Row gutter={[10, 10]}>
        {denominationsList.map((item) => {
          const { background, amount, endow, endowAmount, name } = item;
          return (
            <Col xl={6} lg={12} md={12} sm={12} xs={24} key={name}>
              <div
                className={s.itemDenominations}
                style={{ background }}
                onClick={() => {
                  setItemSelected(item);
                  setOpenModal(true);
                  setkeyModal(Date.now());
                }}
              >
                <div className={s.itemDenominations__viewLogo}>
                  <img src={GHNtext} alt="GHN" />
                  <div>STATION PLATFORM</div>
                </div>
                <div className={s.itemDenominations__viewEndow}>
                  {endow && <p>Ưu đãi {endow}</p>}
                </div>
                <p className={s.itemDenominations__textAmountEndow}>
                  {numeral(amount).format("0,0")}
                </p>
                <div className={s.itemDenominations__endowAmount}>
                  {endowAmount && <p>+ {numeral(endowAmount).format("0,0")}</p>}
                </div>
                <div className={s.itemDenominations__footer}>
                  Chỉ áp dụng tại điểm giao dịch
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <ModalDepositMoney
        visible={openModal}
        handleCancel={handleCloseModal}
        itemSelected={itemSelected}
        keyModal={keyModal}
      />
    </>
  );
};

export default DepositMoney;

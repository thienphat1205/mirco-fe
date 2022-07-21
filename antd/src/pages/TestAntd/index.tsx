import React from "react";
import { Result, Button, Modal, Image } from "antd";
import s from "./index.module.less";
import logo from "../../assets/images/logo.svg";

const TestAntd: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOk = () => {
    console.log("ok ok");
  };
  const env = process.env.NODE_ENV;
  return (
    <>
      <div className={s.root}>
        <Result
          status="success"
          title={`Successfully ${env} server!`}
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => setOpenModal(true)}
            >
              Go Console
            </Button>,
          ]}
        />
      </div>
      <Modal
        title="Basic Modal"
        visible={openModal}
        onOk={handleOk}
        onCancel={() => setOpenModal(false)}
      >
        <Image src={logo} />
      </Modal>
    </>
  );
};

export default TestAntd;

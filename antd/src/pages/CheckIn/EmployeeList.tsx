import React, { useEffect, useState, useCallback } from "react";
import s from "./index.module.less";
import { FaHistory } from "react-icons/fa";
import { Button, Spin, Table, notification } from "antd";
import { SendOutlined } from "@ant-design/icons";
import ViewEmptyTable from "@/components/ViewEmptyTable";
import CustomDrawer from "@/components/CustomDrawer";
import CheckinHistory from "./CheckinHistory";
import Images from "@/constants/images";
import { getUserInAreaAPI } from "@/services/checkin";
import { dialog } from "@/utils/utils";
import moment from "moment";
import CustomModal from "@/components/CustomModal";
import FormTransferArea from "./FormTransferArea";
import { IArea, IUserType } from "./index";
import ContentModalConfirm from "@/components/ContentModalConfirm";
import { forceCheckOutAPI } from "@/services/shift";

interface IItemEmployee {
  user_id: string;
  user_name: string;
  user_type: number;
  checkin_at: string;
  key?: string;

  is_leader?: boolean;
}

export const color = (id: number) => {
  const colors = {
    0: "#fff",
    1: "#14AE5C",
    2: "#FFC700",
  }[id];
  return colors || "#fff";
};

export const Tag: React.FC<{ color: string; title: string | undefined }> = ({ color, title }) => {
  return (
    <div className={s.tag} style={{ backgroundColor: color }}>
      <span>{title}</span>
    </div>
  );
};

const EmployeeList: React.FC<{
  areaItem: IArea;
  userTypes: IUserType[];
  onReloadAreaList: () => void;
}> = ({ areaItem, userTypes, onReloadAreaList }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [employeeList, setEmployeeList] = useState<IItemEmployee[]>([]);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState<boolean>(false);
  const [employeeSelected, setEmployeeSelected] = useState<IItemEmployee>({} as IItemEmployee);
  const [openModalConfirmCheckOut, setOpenModalConfirmCheckOut] = useState<boolean>(false);
  const [loadingCheckOut, setLoadingCheckOut] = useState<boolean>(false);

  const { hub_area_id, area_name } = areaItem;

  useEffect(() => {
    handleGetUserInArea(hub_area_id);
  }, [hub_area_id]);

  const renderIsLeader = (): JSX.Element => {
    return (
      <div className={s.viewTagLeader}>
        <img src={Images.CircleWavyCheck} alt="icon-check" />
        <span>Trưởng nhóm</span>
      </div>
    );
  };

  const columns = [
    {
      title: "Nhân viên",
      dataIndex: "employee",
      render: (_: string, record: IItemEmployee) => {
        const renderTag = () => {
          const { id = 999, name } = userTypes.find((item) => item.id === record.user_type) || {};
          return <Tag color={color(id)} title={name} />;
        };
        return (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{`${record.user_id} - ${record.user_name}`}</span>
              {record?.is_leader && renderIsLeader()}
            </div>
            {renderTag()}
          </>
        );
      },
    },
    {
      title: "Thời gian check-in",
      dataIndex: "checkin_at",
      render: (value: string) => {
        return <span>{value && moment(value).format("DD/MM/YYYY - HH:mm")}</span>;
      },
    },
    {
      title: "",
      dataIndex: "user_type",
      render: (_: string, record: IItemEmployee) => {
        return (
          <div className={s.containerCellRight}>
            <Button
              className={s.btnChange}
              onClick={() => {
                setOpenModal(true);
                setEmployeeSelected(record);
              }}
            >
              <img src={Images.Repeat} alt="Repeat" />
              <span style={{ marginLeft: 5 }}>Điều chuyển khu vực</span>
            </Button>
            <Button
              type="primary"
              danger
              icon={<SendOutlined />}
              onClick={() => {
                setOpenModalConfirmCheckOut(true);
                setEmployeeSelected(record);
              }}
            >
              Check-out
            </Button>
          </div>
        );
      },
    },
  ];

  const handleGetUserInArea = async (areaCode: string) => {
    try {
      setIsLoadingEmployee(true);
      const response: any = await getUserInAreaAPI({
        hub_area_id: areaCode,
      });
      setIsLoadingEmployee(false);
      const { data, code } = response;
      if (code !== 200) throw response;
      let employee = data?.users || [];
      employee.forEach((element: IItemEmployee) => {
        element.key = element.user_id;
      });
      if (Array.isArray(employee)) {
        setEmployeeList(employee);
      }
    } catch (error) {
      dialog(error);
    }
  };

  const handleOpenCheckinHistory = () => {
    setOpenDrawer(true);
  };

  const handleCloseCheckinHistory = () => {
    setOpenDrawer(false);
  };

  const handleCloseModal = useCallback(
    (isReloadUserListAndAreaList: boolean = false) => {
      setOpenModal(false);
      setOpenModalConfirmCheckOut(false);
      setEmployeeSelected({} as IItemEmployee);
      if (isReloadUserListAndAreaList) {
        onReloadAreaList();
        handleGetUserInArea(hub_area_id);
      }
    },
    [hub_area_id, onReloadAreaList]
  );

  const handleCheckOutEmployee = async () => {
    try {
      setLoadingCheckOut(true);
      const response: any = await forceCheckOutAPI({
        user_id: employeeSelected?.user_id,
      });
      setLoadingCheckOut(false);
      const { code, message } = response;
      if (code !== 200) throw response;
      notification.success({ message });
      handleCloseModal(true);
    } catch (error) {
      dialog(error);
    }
  };

  const genLoading = () => (
    <div className={s.viewLoading}>
      <Spin size="large" />
    </div>
  );

  return (
    <div className={s.employeeList}>
      <div className={s.employeeList__title}>
        <p>Danh sách nhân viên làm việc</p>
        <Button className={s.btnHistory} onClick={handleOpenCheckinHistory}>
          <FaHistory />
          <span>Lịch sử check-in KV</span>
        </Button>
      </div>
      {isLoadingEmployee ? (
        genLoading()
      ) : (
        <Table
          className={s.table}
          columns={columns}
          pagination={false}
          dataSource={employeeList}
          loading={false}
          scroll={{
            y: "calc(100vh -  250px)",
            x: "max-content",
          }}
          locale={{
            emptyText: (
              <div style={{ height: "calc(100vh -  285px)" }}>
                <ViewEmptyTable />
              </div>
            ),
          }}
        />
      )}
      <CustomDrawer
        onClose={handleCloseCheckinHistory}
        visible={openDrawer}
        size="large"
        title={`Lịch sử Check-in khu vực - ${area_name}`}
        footer={
          <div className={s.drawer__footer}>
            <Button className={s.btnCancel} onClick={handleCloseCheckinHistory}>
              Đóng
            </Button>
          </div>
        }
      >
        <CheckinHistory areaCode={hub_area_id} userTypes={userTypes} />
      </CustomDrawer>
      <CustomModal visible={openModal} onCancel={() => handleCloseModal(false)} width={375}>
        <div className={s.modal}>
          <div className={s.textTitle}>Chọn khu vực cần điều chuyển đến</div>
          <FormTransferArea
            onCloseAccept={() => handleCloseModal(true)}
            areaCode={hub_area_id}
            userId={employeeSelected?.user_id}
          />
        </div>
      </CustomModal>
      <CustomModal
        visible={openModalConfirmCheckOut}
        onCancel={() => handleCloseModal(false)}
        width={375}
      >
        <ContentModalConfirm
          title="Check-out nhân viên"
          description="Chắc chắn muốn check-out cho nhân viên này?"
          btnText="Xác nhận"
          onOk={handleCheckOutEmployee}
          loading={loadingCheckOut}
        />
      </CustomModal>
    </div>
  );
};

export default EmployeeList;

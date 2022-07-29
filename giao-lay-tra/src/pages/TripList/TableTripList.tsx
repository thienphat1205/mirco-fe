import { Table, Button } from "antd";
import React, { useState } from "react";
import ActionTable from "@/components/ActionTable";
import ModalSelectDriver from "@/components/SelectDriver";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import s from "./index.module.less";
import { Link } from "react-router-dom";

const TableTripList: React.FC<any> = (props) => {
  const {
    loading,
    tripList: { data = [], total = 0 } = {},
    page,
    size,
    tableName,
    // filtered = {},
    handleTableChange = () => {},
  } = props;

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const changePage = (pagination: any, filters: any) => {
    const { createdById, isReady, actStatus } = filters;
    const valueFilter = {
      createdById: Array.isArray(createdById) ? createdById[0] : undefined,
      isReady: Array.isArray(isReady) ? isReady[0] : undefined,
      actStatus: Array.isArray(actStatus) ? actStatus[0] : undefined,
    };
    handleTableChange({ pagination, filters: valueFilter });
  };

  const renderColumnsTable = () => {
    const type: any = {
      created: "Tạo",
      start: "Bắt đầu",
      finished: "Kết thúc",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const listActStatus = {
      NO_PARTNER: "Chưa chọn đối tác",
      NO_SERVICE: "Chưa chọn dich vụ",
      NO_DRIVER: "Chưa có CBĐP",
      CAN_START: "Có thể bắt đầu",
    };
    const columns = [
      {
        title: "Mã CĐ",
        dataIndex: "tripCode",
        key: "tripCode",
        width: 200,
        render: (value: string) => (
          <Link to={`/trip-detail/${value}`}>{value}</Link>
        ),
      },
      {
        title: "Thời gian",
        dataIndex: "dateTime",
        key: "dateTime",
        width: 300,
        render: (value: any) =>
          Array.isArray(value) &&
          value.map((e: any) => {
            return (
              e?.time && (
                <div className={s.viewDateTime} key={e.type}>
                  <div className={s.viewDateTime__textType}>{type[e.type]}</div>
                  <span>{e.time}</span>
                </div>
              )
            );
          }),
      },
      {
        title: "Người tạo",
        dataIndex: "createdById",
        key: "createdById",
        render: (_: any, record: any) => (
          <>
            <p>{record.createdById}</p>
            <p>{record.createdByName}</p>
          </>
        ),
      },
      {
        title: "Lấy-Giao-Trả",
        dataIndex: "statistical",
        key: "statistical",
      },
      {
        title: "Tiến độ cập nhật",
        dataIndex: "progress",
        key: "progress",
        render: (_: any, record: any = {}) =>
          record.progress && (
            <>
              <strong>{record?.progress?.percent}</strong>
              <p>{record?.progress?.detail}</p>
            </>
          ),
      },
      {
        title: "CBĐP",
        dataIndex: "driverId",
        key: "driverId",
        width: 200,
        render: (_: any, record: any) =>
          record.driverId &&
          tableName !== "CANCELLED" && (
            <>
              <p>{record.driverId}</p>
              <p>{record.driverName}</p>
            </>
          ),
      },
      {
        title: "Thao tác",
        dataIndex: "id",
        key: "id",
        render: (_: any, row: any) => {
          let listMenu = [
            {
              text: "Chi tiết",
              onClick: () => alert(`Chi tiết ${row.tripCode}`),
            },
            {
              text: "Bắn kiểm",
              onClick: () => alert(`Bắn kiểm ${row.tripCode}`),
            },
            {
              text: "Xem POD",
              onClick: () => alert(`Xem POD ${row.tripCode}`),
            },
          ];
          if (tableName === "CANCELLED") {
            listMenu = [
              {
                text: "Chi tiết",
                onClick: () => alert(`Chi tiết ${row.tripCode}`),
              },
              {
                text: "Bắn kiểm",
                onClick: () => alert(`Bắn kiểm ${row.tripCode}`),
              },
              {
                text: "In bàn giao",
                onClick: () => alert(`In bàn giao ${row.tripCode}`),
              },
              {
                text: "In chuyến đi",
                onClick: () => alert(`In chuyến đi ${row.tripCode}`),
              },
              {
                text: "In chuyến đi & bàn giao",
                onClick: () => alert(`In chuyến đi & bàn giao ${row.tripCode}`),
              },
            ];
          }
          if (tableName === "NEW") {
            listMenu = [
              {
                text: "Chi tiết",
                onClick: () => alert(`Chi tiết ${row.tripCode}`),
              },
              {
                text: "Hủy chuyến đi",
                onClick: () => alert(`Hủy chuyến đi ${row.tripCode}`),
              },
            ];
          }
          return <ActionTable listMenu={listMenu} />;
        },
      },
    ];
    let columnsTable = columns;
    if (tableName !== "ON_TRIP") {
      columnsTable = columns.filter(
        (item) => item.title !== "Tiến độ cập nhật"
      );
    }
    if (tableName === "NEW") {
      columnsTable.splice(
        4,
        1,
        {
          title: "CBĐP",
          dataIndex: "driverId",
          key: "driverId",
          render: (_: any, record: any) =>
            record.driverId ? (
              <>
                <p>{record.driverId}</p>
                <p>{record.driverName}</p>
              </>
            ) : (
              <Button type="primary" onClick={handleModal}>
                Chọn CBĐP
              </Button>
            ),
        },
        {
          title: "Sẵn sàng",
          dataIndex: "isReady",
          key: "isReady",
          // filters: [
          //   { text: "Chưa sẵn sàng", value: "false" },
          //   { text: "Đã sẵn sàng", value: "true" },
          // ],
          // filterMultiple: false,
          // filteredValue:
          //   filtered?.isReady !== undefined && filtered?.isReady !== null
          //     ? [JSON.parse(filtered?.isReady)]
          //     : undefined,
          render: (value: any) =>
            value ? (
              <CheckOutlined style={{ fontSize: "20px", color: "#52C41A" }} />
            ) : (
              <CloseOutlined style={{ fontSize: "20px", color: "#FF4D4F" }} />
            ),
        },
        {
          title: "Trạng thái",
          dataIndex: "actStatus",
          key: "actStatus",
          // filters: [
          //   { text: 'Chưa chọn đối tác', value: 'NO_PARTNER' },
          //   { text: 'Chưa chọn dich vụ', value: 'NO_SERVICE' },
          //   { text: 'Chưa có CBĐP', value: 'NO_DRIVER' },
          //   { text: 'Có thể bắt đầu', value: 'CAN_START' },
          // ],
          // filterMultiple: false,
          // filteredValue: filtered?.actStatus ? [filtered?.actStatus] : undefined,
          // render: (value: any, row: any) =>
          //   value !== "CAN_START" ? (
          //     `${listActStatus[value]}`
          //   ) : (
          //     <Button
          //       type="primary"
          //       onClick={() => alert(`Bắt đầu chuyến đi ${row.tripCode}`)}
          //     >
          //       {formatMessage({ id: "button.startTrip" })}
          //     </Button>
          //   ),
        }
      );
    }
    return columnsTable;
  };

  const columnsTable = renderColumnsTable() || [];
  return (
    <>
      <Table
        loading={loading}
        rowKey="tripCode"
        dataSource={data}
        columns={columnsTable}
        pagination={{
          current: page,
          pageSize: size,
          showSizeChanger: true,
          total,
          hideOnSinglePage: true,
        }}
        onChange={changePage}
        scroll={{ x: "max-content" }}
      />

      <ModalSelectDriver show={showModal} handleCancel={handleModal} />
    </>
  );
};

export default TableTripList;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import { ISearch } from "./index";
import { genPagination } from "@/utils/utils";
import { Table, Button, notification } from "antd";
import s from "./index.module.less";
import { dataTable } from "@/utils/dummyData";
import ModalReturn from "@/components/ModalReturn";

interface TableProps {
  search: ISearch;

  orderCodeSelected: string | undefined;

  handleResetInputOrderCode: () => void;
}

interface IPagination {
  page: number;
  limit: number;
}

const TableReturn: React.FC<TableProps> = ({
  search,
  orderCodeSelected,
  handleResetInputOrderCode,
}) => {
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: 10,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<any>({
    list: [...dataTable],
    total: dataTable.length,
  });
  const [rowSelected, setRowSelected] = useState<any>({});
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    handleGetDataTable();
  }, [search, pagination]);

  useEffect(() => {
    if (orderCodeSelected) {
      const dataList = data?.list || [];
      const findItem = dataList.find(
        (item: any) => item?.orderCode === orderCodeSelected
      );
      if (!findItem) {
        notification.error({
          message: `Không tìm thấy đơn hàng ${orderCodeSelected}`,
        });
      }

      if (findItem) {
        handleOpenModalReturn(findItem);
      }
      handleResetInputOrderCode();
    }
  }, [orderCodeSelected]);

  const handleGetDataTable = (): void => {
    const { page, limit } = pagination;
    const pagingRequest = genPagination(page - 1, limit);
    const { orderCode, phone } = search;
    const payload = {
      pagingRequest,
      filter: { orderCode, phone },
    };
    // get data with payload.
    // setData
    console.log("payload", payload);
  };

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination({ limit: pageSize, page: current });
  };

  const handleOpenModalReturn = (record: any) => {
    setRowSelected(record);
    setOpenModal(true);
  };

  const handleCloseModalReturn = useCallback(() => {
    setRowSelected({});
    setOpenModal(false);
  }, []);

  const columns = [
    {
      title: "Mã đơn gốc",
      dataIndex: "root",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      render: (value: string = "") => (
        <span className={s.textOrderCode}>{value}</span>
      ),
    },
    {
      title: "Người gửi",
      dataIndex: "sender",
    },
    {
      title: "Người nhận",
      dataIndex: "recieve",
    },
    {
      title: "Nội dung",
      dataIndex: "desc",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
    },
    {
      title: null,
      dataIndex: "x",
      render: (_: any, row: any) => (
        <Button onClick={() => handleOpenModalReturn(row)} type="primary">
          Trả hàng
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className={s.viewTable}>
        <Table
          loading={false}
          rowKey="orderCode"
          dataSource={data?.list}
          columns={columns}
          scroll={{ x: "max-content" }}
          pagination={{
            current: pagination?.page,
            pageSize: pagination?.limit,
            showSizeChanger: true,
            total: data?.total,
            showTotal: (total, range) =>
              `Hiển thị ${range[0]}-${range[1]} trong tổng ${total} kết quả`,
          }}
          onChange={handleTableChange}
        />
      </div>
      <ModalReturn
        visible={openModal}
        handleCancel={handleCloseModalReturn}
        rowSelected={rowSelected}
      />
    </>
  );
};

export default TableReturn;

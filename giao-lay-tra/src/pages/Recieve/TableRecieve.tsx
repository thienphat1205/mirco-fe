/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import { ISearch } from "./index";
import { genPagination } from "@/utils/utils";
import { Table, Button, notification } from "antd";
import s from "./index.module.less";
import { dataTable } from "@/utils/dummyData";
import ModalRecieve from "@/components/ModalRecieve";
import ModalUpdateDimension from "@/components/ModalUpdateDimension";
import numeral from "numeral";
import { FaEdit } from "react-icons/fa";

interface TableProps {
  search: ISearch;

  orderCodeSelected: string | undefined;

  handleResetInputOrderCode: () => void;
}

interface IPagination {
  page: number;
  limit: number;
}

const TableRecieve: React.FC<TableProps> = ({
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
  const [openModalUpdateDimension, setOpenModalUpdateDimension] =
    useState<boolean>(false);

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
        handleOpenModal(findItem);
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

  const handleOpenModal = (record: any) => {
    setRowSelected(record);
    setOpenModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setRowSelected({});
    setOpenModal(false);
  }, []);

  const handleCloseModalUpdateDimension = useCallback(() => {
    setRowSelected({});
    setOpenModalUpdateDimension(false);
  }, []);

  const handleOpenModalUpdateDimension = (rowSelected: any) => {
    setRowSelected(rowSelected);
    setOpenModalUpdateDimension(true);
  };

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
      title: "Khối lượng",
      dataIndex: "mass",
      render: (_: any, row: any) => (
        <div className={s.viewEditMass}>
          <p>10</p>
          <FaEdit
            className={s.iconEdit}
            onClick={() => handleOpenModalUpdateDimension(row)}
          />
        </div>
      ),
    },
    {
      title: "Cước phí",
      dataIndex: "postage",
    },
    {
      title: "COD",
      dataIndex: "cod",
      render: (value: number = 0) => numeral(value).format("0,0"),
    },
    {
      title: null,
      dataIndex: "x",
      render: (_: any, row: any) => (
        <Button onClick={() => handleOpenModal(row)} type="primary">
          Nhận hàng
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
      <ModalRecieve
        visible={openModal}
        handleCancel={handleCloseModal}
        rowSelected={rowSelected}
      />
      <ModalUpdateDimension
        visible={openModalUpdateDimension}
        defaultValue={rowSelected}
        handleCancel={handleCloseModalUpdateDimension}
      />
    </>
  );
};

export default TableRecieve;

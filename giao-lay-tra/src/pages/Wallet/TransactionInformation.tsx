/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import FormTransactionInformationSearch from "@/components/FormTransactionInformationSearch";
import queryString from "query-string";
import { Table, Pagination, Tag } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { genPagination, genTextStatus } from "@/utils/utils";
import ModalConfirmTransaction from "@/components/ModalConfirmTransaction";
import numeral from "numeral";
import s from "./index.module.less";

const data = [
  {
    no: "1",
    createdBy: "1004 - Mai Hoàng Test Tên Hơi Dài",
    client: "John Brown",
    phone: "0336708668",
    amount: 1000000,
    code: "T2224V6NX8",
    coins: 0,
    createdAt: "09/02/2022 11:13",
    status: "CANCELLED",
  },
  {
    no: "2",
    createdBy: "1004 - Mai Hoàng Test Tên Hơi Dài",
    client: "Jim Green",
    phone: "0336708668",
    amount: 1000000,
    code: "T2224V6NX9",
    coins: 0,
    createdAt: "09/02/2022 11:13",
    status: "WAITING",
  },
  {
    no: "3",
    createdBy: "1004 - Mai Hoàng Test Tên Hơi Dài",
    client: "Joe Black",
    phone: "0336708668",
    amount: 1000000,
    code: "T2224V6NY8",
    coins: 0,
    createdAt: "09/02/2022 11:13",
    status: "SUCCESS",
  },
  {
    no: "4",
    createdBy: "1004 - Mai Hoàng Test Tên Hơi Dài",
    client: "Jim Red",
    phone: "0336708668",
    amount: 1000000,
    code: "T2224V6N10",
    coins: 0,
    createdAt: "09/02/2022 11:13",
    status: "SUCCESS",
  },
];

export interface ISearch {
  page?: number;
  limit?: number;
  fromDate?: string;

  toDate?: string;

  status?: string;

  payerId?: string;
  code?: string;
}

const TransactionInformation: React.FC = () => {
  const [search, setSearch] = useState<ISearch>({ page: 1, limit: 10 });
  const [isReady, setIsReady] = useState<boolean>(false);
  const { search: searchString } = useLocation();
  const [transactionSelected, setTransactionSelected] = useState<object>({});
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const objectSearch = queryString.parse(searchString);
    const { page, limit } = objectSearch;
    setSearch({
      ...objectSearch,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });
    if (!isReady) {
      setIsReady(true);
    }
  }, [searchString]);

  useEffect(() => {
    const { page = 1, limit = 10 } = search;
    if (isReady) {
      const pagingRequest = genPagination(page - 1, limit);
      const filter = { ...search };
      delete filter.page;
      delete filter.limit;
      const payload = {
        pagingRequest,
        filter,
      };
      // payload fetch data list
      console.log("payload", payload);
    }
  }, [search]);

  const handleSubmitSearch = useCallback((values: ISearch): void => {
    const params = queryString.stringify({ ...search, ...values, page: 1 });
    navigate(`?${params}`);
  }, []);

  const onChangePagination = (page: number, pageSize: number): void => {
    let newPage = page;
    if (pageSize !== search?.limit) {
      newPage = 1;
    }
    const params = queryString.stringify({
      ...search,
      page: newPage,
      limit: pageSize,
    });
    navigate(`?${params}`);
  };

  const handleClickRow = (row: object): void => {
    setTransactionSelected(row);
    setOpenModalConfirm(true);
  };

  const handleCloseModalConfirm = useCallback((): void => {
    setTransactionSelected({});
    setOpenModalConfirm(false);
  }, []);

  const genTagStatus = (status: string) => {
    const text = genTextStatus(status);
    switch (status) {
      case "CANCELLED":
        return <Tag color="error">{text}</Tag>;
      case "SUCCESS":
        return <Tag color="success">{text}</Tag>;
      case "WAITING":
        return <Tag color="warning">{text}</Tag>;
      default:
        return <Tag color="error">{text}</Tag>;
    }
  };

  if (!isReady) return null;

  const columns = [
    {
      title: "STT",
      dataIndex: "no",
    },
    {
      title: "Nhân viên",
      dataIndex: "createdBy",
      width: "200px",
    },
    {
      title: "Khách hàng",
      dataIndex: "client",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Tiền giao dịch",
      dataIndex: "amount",
      render: (value: number = 0) => numeral(value).format("0,0"),
    },
    {
      title: "Mã giao dịch",
      dataIndex: "code",
    },
    {
      title: "Tổng xu",
      dataIndex: "coins",
    },
    {
      title: "Ngày nộp",
      dataIndex: "createdAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value: string) => genTagStatus(value),
    },
  ];

  return (
    <>
      <FormTransactionInformationSearch
        defaultValues={search}
        onSubmit={handleSubmitSearch}
      />
      <div className={s.viewTable}>
        <Table
          rowKey="no"
          columns={columns}
          dataSource={data}
          bordered={false}
          scroll={{ x: "max-content" }}
          rowClassName={(_, index) => (!(index % 2) ? s.rowColor : "")}
          onRow={(record) => {
            return {
              onClick: () => handleClickRow(record),
            };
          }}
          pagination={false}
          summary={(pageData) => {
            let totalAmount = 0;
            pageData.forEach(({ amount }) => {
              totalAmount += amount;
            });

            return (
              <Table.Summary.Row className={s.viewTableSummary}>
                <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={3} />
                <Table.Summary.Cell index={3} colSpan={1}>
                  {numeral(totalAmount).format("0,0")}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={1} />
                <Table.Summary.Cell index={2} colSpan={1}>
                  0
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={2} />
              </Table.Summary.Row>
            );
          }}
        />
      </div>
      <div className={s.viewPagination}>
        <Pagination
          responsive
          current={search?.page}
          pageSize={search?.limit}
          onChange={onChangePagination}
          total={data.length}
          pageSizeOptions={[10, 20, 50, 100]}
          showSizeChanger
          showTotal={(total, range) =>
            `Hiển thị ${range[0]}-${range[1]} trong tổng ${total} kết quả`
          }
        />
      </div>
      <ModalConfirmTransaction
        visible={openModalConfirm}
        transactionSelected={transactionSelected}
        handleCancel={handleCloseModalConfirm}
        query={queryString.stringify(search)}
      />
    </>
  );
};

export default TransactionInformation;

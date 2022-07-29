/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Table, Switch } from "antd";
import FormReceiptSearch from "@/components/FormReceiptSearch";
import ActionTable from "@/components/ActionTable";
import s from "./index.module.less";
import { Link } from "react-router-dom";

const dataReceiptSearch = [
  {
    no: "1",
    receiptCode: "2178B120LC",
    createdBy: "0001 - Nguyễn Thiên Phát",
    paidUser: "1705438 - Nguyễn Việt Anh",
    created: "08/07/2021 - 11:12:21",
    type: "Phiếu thu tạm",
    totalAmount: "29.700",
  },
  {
    no: "2",
    receiptCode: "2176408E1F",
    createdBy: "0001 - Nguyễn Thiên Phát",
    paidUser: "1816092 - Nguyễn Tri Dũng",
    created: "04/07/2021 - 15:57:24",
    type: "Phiếu thu thường",
    totalAmount: "37.400",
  },
];

const ReceiptSearch: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [isSearchDetail, setIsSearchDetail] = useState(false);

  React.useEffect(() => {
    setData([]);
  }, [isSearchDetail]);

  const onSubmit = (values: any) => {
    console.log("values ReceiptSearch", values);
    setData([...dataReceiptSearch]);
  };

  const columnsDefault = [
    {
      title: "STT",
      dataIndex: "no",
    },
    {
      title: "Mã phiếu thu",
      dataIndex: "receiptCode",
      render: (value: string) => (
        <Link to={`/receipt-detail/${value}`}>{value}</Link>
      ),
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
    },
    {
      title: "Người nộp tiền ",
      dataIndex: "paidUser",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created",
    },
    {
      title: "Loại",
      dataIndex: "type",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "",
      render: (_: any, row: any) => {
        const listMenu = [
          {
            text: "Chi tiết",
            onClick: () => alert(`Chi tiết ${row.receiptCode}`),
          },
          {
            text: "In phiếu thu",
            onClick: () => alert(`In phiếu thu ${row.receiptCode}`),
          },
        ];
        return <ActionTable listMenu={listMenu} />;
      },
    },
  ];

  const columnsSearchDetail = [
    {
      title: "STT",
      dataIndex: "no",
    },
    {
      title: "Mã phiếu thu",
      dataIndex: "receiptCode",
      render: (value: string) => (
        <Link to={`/receipt-detail/${value}`}>{value}</Link>
      ),
    },
    {
      title: "Mã PT Internal",
      dataIndex: "receiptCodeInternal",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
    },
    {
      title: "Mã chuyến đi",
      dataIndex: "tripCode",
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
    },
    {
      title: "Người nộp tiền",
      dataIndex: "paidUser",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created",
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
    },
  ];

  return (
    <div className={s.root}>
      <div className={s.viewTitle}>
        <p className={s.textTitle}>Tìm kiếm phiếu thu</p>
        <div className={s.viewSwitchSearchDetail}>
          <span>Tìm kiếm chi tiết:</span>
          <Switch
            checked={isSearchDetail}
            onChange={(checked: boolean) => setIsSearchDetail(checked)}
          />
        </div>
      </div>
      <FormReceiptSearch
        onSubmit={onSubmit}
        loading={loading}
        isDetail={isSearchDetail}
        isDisableActionExport={data.length === 0}
      />
      <Table
        loading={loading}
        columns={!isSearchDetail ? columnsDefault : columnsSearchDetail}
        dataSource={!loading ? data : []}
        pagination={{ showSizeChanger: true }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ReceiptSearch;

import React, { useState, useEffect } from "react";
import s from "./index.module.less";
import { Table } from "antd";
import ViewEmptyTable from "@/components/ViewEmptyTable";

interface ITableSettingDetail {
  columns: any[];
  dataSource: any[];

  loading: boolean;
  version: string;
  type: string;
}
const TableSettingDetail: React.FC<ITableSettingDetail> = ({
  columns,
  dataSource,
  loading,
  version,
  type,
}) => {
  const [pagination, setPagination] = useState<{
    page: number;
    size: number;
  }>({ page: 1, size: 50 });

  useEffect(() => {
    setPagination({
      page: 1,
      size: 50,
    });
  }, [version]);

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination({
      page: current,
      size: pageSize,
    });
  };

  return (
    <Table
      className={s.table}
      columns={columns}
      dataSource={dataSource}
      onChange={handleTableChange}
      pagination={{
        current: pagination?.page,
        pageSize: pagination?.size,
        pageSizeOptions: [50, 100],
      }}
      loading={loading}
      scroll={{
        y: `calc(100vh - ${type === "backlog" ? 380 : 400}px)`,
      }}
      locale={{
        emptyText: <ViewEmptyTable />,
      }}
    />
  );
};

export default TableSettingDetail;

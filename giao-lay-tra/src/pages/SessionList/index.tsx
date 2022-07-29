/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import s from "./index.module.less";
import { Button, Select, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { Link } from "react-router-dom";

const { Option } = Select;

interface IFilter {
  page?: number;

  limit?: number;
  partner?: string;
  status?: string;
}

interface IDataList {
  list: any[];
  total: number;
}

const dummyDataList = [
  {
    code: "S45RNX83CY",
    partner: "113370 - Tuan MegaHub",
    status: "Đang lấy",
    createdAt: "20/05 14:22",
    employee: "	1004 - Mai Hoàng Test Tên Hơi Dài",
    amountOrder: 0,
  },
];

const dummyOptions: any[] = [];

const SessionList: React.FC = () => {
  const navigate = useNavigate();
  const { search: searchString } = useLocation();
  const [filter, setFilter] = React.useState<IFilter>({});
  const [isReady, setIsReady] = React.useState<boolean>(false);
  const [data, setData] = React.useState<IDataList>({
    list: [...dummyDataList],
    total: dummyDataList.length,
  });

  React.useEffect(() => {
    const objectSearch = queryString.parse(searchString);
    setFilter({ page: 1, limit: 10, ...objectSearch });
    if (!isReady) {
      setIsReady(true);
    }
  }, []);

  const handleChangeSelect = (name: string, value: string) => {
    setFilter((prev) => {
      return { ...prev, [name]: value, page: 1 };
    });
  };

  React.useEffect(() => {
    const paramsString = queryString.stringify(filter);
    navigate(`?${paramsString}`);
    if (isReady) {
      handleFetchDataTable();
    }
  }, [filter]);

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setFilter((prev) => {
      return { ...prev, limit: pageSize, page: current };
    });
  };

  const handleFetchDataTable = () => {
    console.log("Filter", filter);
  };

  if (!isReady) return null;

  const columns = [
    {
      title: "Mã phiên",
      dataIndex: "code",
      render: (value: string) => (
        <Link to={`/session-detail/${value}`}>{value}</Link>
      ),
    },
    {
      title: "Đối tác",
      dataIndex: "partner",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "TG Tạo",
      dataIndex: "createdAt",
    },
    {
      title: "TG kết thúc",
      dataIndex: "finishAt",
    },
    {
      title: "Nhân viên",
      dataIndex: "employee",
    },
    {
      title: "Số đơn",
      dataIndex: "amountOrder",
    },
    {
      title: "Thao tác",
      dataIndex: "x",
    },
  ];

  return (
    <div className={s.root}>
      <div className={s.viewTitlePage}>
        <p className={s.title}>Danh sách phiên giao / lấy hàng</p>
        <div className={s.viewButton}>
          <Button icon={<PlusOutlined />} type="primary">
            Tạo phiên lấy hàng
          </Button>
          <Button icon={<PlusOutlined />} type="primary">
            Tạo phiên giao hàng
          </Button>
        </div>
      </div>
      <div className={s.viewContent}>
        <div className={s.viewFilter}>
          Lọc theo:
          <div className={s.select}>
            <Select
              placeholder="Chọn đối tác"
              value={filter?.partner}
              onChange={(value: string) => handleChangeSelect("partner", value)}
            >
              {dummyOptions.map((item, idx) => (
                <Option key={idx} value={item?.value}>
                  {item?.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className={s.select}>
            <Select
              placeholder="Chọn trạng thái"
              value={filter?.status}
              onChange={(value: string) => handleChangeSelect("status", value)}
            >
              {dummyOptions.map((item, idx) => (
                <Option key={idx} value={item?.value}>
                  {item?.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className={s.viewTable}>
          <Table
            loading={false}
            rowKey="orderCode"
            dataSource={data?.list}
            columns={columns}
            scroll={{ x: "max-content" }}
            pagination={{
              current: filter?.page,
              pageSize: filter?.limit,
              showSizeChanger: true,
              total: data?.total,
              hideOnSinglePage: true,
              showTotal: (total, range) =>
                `Hiển thị ${range[0]}-${range[1]} trong tổng ${total} kết quả`,
            }}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionList;

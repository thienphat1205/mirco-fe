/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import s from "./index.module.less";
import { Input, Row, Col, Select, Table, Tag } from "antd";
import ModalSpecifyTime from "@/components/ModalSpecifyTime";
import ModalConfirmRemove from "@/components/ModalConfirmRemove";
import { weekdays } from "@/utils/utils";
import { FaEdit, FaTrash } from "react-icons/fa";

const { Option } = Select;

const dummyData = [
  {
    id: "12345",
    storeInfo: "500383 - ***************** hãng",
    phone: "*****37005",
    areaPick: "Phường Hiệp Phú - Quận 9",
    picktimes: [
      {
        timeType: "ALL",
        timeValues: [480, 510],
      },
      {
        timeType: "TUE",
        timeValues: [540, 1259],
      },
    ],
  },
];

interface IPagination {
  page: number;
  limit: number;
}

const Store: React.FC = () => {
  const [pagination, setPagination] = React.useState<IPagination>({
    page: 1,
    limit: 10,
  });

  const [visible, setVisible] = React.useState<boolean>(false);

  const [visibleModalConfirm, setVisibleModalConfirm] =
    React.useState<boolean>(false);

  const [itemSelected, setItemSelected] = React.useState<any>({});

  const [data, setData] = React.useState<any>({
    list: [],
    total: 0,
  });

  React.useEffect(() => {
    const dataSource = dummyData.map((item) => {
      const { picktimes = [] } = item;
      const formatPickTimes = picktimes.map((time) => {
        const { timeValues = [] } = time;
        const timeValuesToString = timeValues.map((item) => {
          const hour = Math.floor(item / 60);
          const minute = item % 60;
          return `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
        });
        return {
          ...time,
          timeValuesToString,
        };
      });
      return {
        ...item,
        picktimes: formatPickTimes,
      };
    });
    setData({
      list: dataSource,
      total: dataSource.length,
    });
  }, []);

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination({ limit: pageSize, page: current });
  };

  const handleChangeSpecifyTime = (record: any) => {
    setItemSelected(record);
    setVisible(true);
  };

  const handleCancelModal = React.useCallback(() => {
    setItemSelected({});
    setVisible(false);
  }, []);

  const handleOpenModalConfirm = (record: any) => {
    setItemSelected(record);
    setVisibleModalConfirm(true);
  };

  const handleCancelModalConfirm = React.useCallback(() => {
    setItemSelected({});
    setVisibleModalConfirm(false);
  }, []);

  const handleSubmit = React.useCallback((values: any) => {
    console.log("values", values);
    handleCancelModal();
  }, []);

  const handleRemove = React.useCallback(() => {
    handleCancelModalConfirm();
  }, []);

  const genViewPickTimes = (picktime: any) => {
    return (
      <div>
        {picktime.map((item: any, idx: number) => {
          const { timeType = "", timeValuesToString = [] } = item;
          const parseTimeType = weekdays.find(
            (item) => item?.value === timeType
          )?.label;
          return (
            <Row key={idx} style={idx > 0 ? { marginTop: "8px" } : {}}>
              <Col span={6}>
                <span style={{ marginRight: "8px" }}>{parseTimeType}</span>
              </Col>
              {timeValuesToString.map((value: string) => (
                <Col>
                  <Tag color="orange">{value}</Tag>
                </Col>
              ))}
            </Row>
          );
        })}
      </div>
    );
  };

  const columns = [
    {
      title: "Cửa hàng",
      dataIndex: "storeInfo",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Khu vực lấy hàng",
      dataIndex: "areaPick",
    },
    {
      title: "Thời điểm lấy hàng",
      dataIndex: "picktimes",
      width: 350,
      render: (value: any) => genViewPickTimes(value),
    },
    {
      title: null,
      dataIndex: "x",
      render: (_: any, row: any) => (
        <div className={s.viewActionTable}>
          <FaEdit
            onClick={() => handleChangeSpecifyTime(row)}
            className={s.viewActionTable__edit}
          />
          <FaTrash
            onClick={() => handleOpenModalConfirm(row)}
            className={s.viewActionTable__remove}
          />
        </div>
      ),
    },
  ];

  const picktimes = React.useMemo(() => {
    let picktimesList = [];
    if (Array.isArray(itemSelected?.picktimes)) {
      picktimesList = itemSelected.picktimes;
    }
    return picktimesList;
  }, [itemSelected]);

  return (
    <>
      <div className={s.store}>
        <div className={s.viewFilter}>
          <Row gutter={[20, 20]}>
            <Col lg={8} md={8} sm={24}>
              <div className={s.inputOrderCode}>
                <Input placeholder="Nhập hoặc scan barcode" allowClear />
              </div>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <div className={s.selectAction}>
                <Select placeholder="Thao tác" allowClear>
                  <Option key="210908">210908 - Nguyễn Thanh Khanh</Option>
                </Select>
              </div>
            </Col>
          </Row>
        </div>
        <div className={s.viewTable}>
          <Table
            loading={false}
            rowKey="id"
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
      </div>
      <ModalSpecifyTime
        visible={visible}
        onCancel={handleCancelModal}
        onOk={handleSubmit}
        loading={false}
        defaultValues={picktimes}
      />
      <ModalConfirmRemove
        visible={visibleModalConfirm}
        onCancel={handleCancelModalConfirm}
        onOk={handleRemove}
        loading={false}
        description="Bạn có chắc chắn muốn xoá cài đặt này ?"
      />
    </>
  );
};

export default Store;

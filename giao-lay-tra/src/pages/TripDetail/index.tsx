import React, { useState, useEffect } from "react";
import {
  Tag,
  Row,
  Col,
  Input,
  Button,
  Tooltip,
  Tabs,
  // Skeleton,
  Divider,
} from "antd";
import {
  CalendarOutlined,
  DeploymentUnitOutlined,
  ContainerOutlined,
  EditOutlined,
  DownloadOutlined,
  PrinterOutlined,
  FolderAddOutlined,
  CalculatorOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import History from "./History";
import OrderListInTripDetail from "@/components/OrderListInTripDetail";
import ModalAddOrderToTrip from "@/components/ModalAddOrderToTrip";
import s from "./index.module.less";
import { useParams, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

const dummyHistory = [
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
  {
    dateTime: "12/07/2021 - 14:22:05",
    updateBy: "8888 - Hệ Thống Auto",
    description: "Thêm đơn hàng ZH0VT vào chuyến đi 2171479HZ4358",
  },
];

const orderList = [
  {
    no: "23",
    orderCode: "ZHTDO",
    address: "3 Thanh Đa, Phường 27, Bình Thạnh, Hồ Chí Minh, Việt Nam",
    coordinates: "10.8154888 / 106.7205384",
    sender: "1479_THUY PHAM_P27 - ******7009",
    receiver: "Phường 1 - Quận 3 - ******9972",
    amount: 0,
    status: "PICKING",
  },
  {
    no: "23",
    orderCode: "ZHTDO",
    address: "3 Thanh Đa, Phường 27, Bình Thạnh, Hồ Chí Minh, Việt Nam",
    coordinates: "10.8154888 / 106.7205384",
    sender: "1479_THUY PHAM_P27 - ******7009",
    receiver: "Phường 1 - Quận 3 - ******9972",
    amount: 0,
    status: "PICKING",
  },
  {
    no: "23",
    orderCode: "ZHTDO",
    address: "3 Thanh Đa, Phường 27, Bình Thạnh, Hồ Chí Minh, Việt Nam",
    coordinates: "10.8154888 / 106.7205384",
    sender: "1479_THUY PHAM_P27 - ******7009",
    receiver: "Phường 1 - Quận 3 - ******9972",
    amount: 0,
    status: "PICKING",
  },
  {
    no: "23",
    orderCode: "ZHTDO",
    address: "3 Thanh Đa, Phường 27, Bình Thạnh, Hồ Chí Minh, Việt Nam",
    coordinates: "10.8154888 / 106.7205384",
    sender: "1479_THUY PHAM_P27 - ******7009",
    receiver: "Phường 1 - Quận 3 - ******9972",
    amount: 0,
    status: "PICKING",
  },
  {
    no: "23",
    orderCode: "ZHTDO",
    address: "3 Thanh Đa, Phường 27, Bình Thạnh, Hồ Chí Minh, Việt Nam",
    coordinates: "10.8154888 / 106.7205384",
    sender: "1479_THUY PHAM_P27 - ******7009",
    receiver: "Phường 1 - Quận 3 - ******9972",
    amount: 0,
    status: "PICKING",
  },
];

const { Search } = Input;
const { TabPane } = Tabs;

const TripDetail: React.FC<any> = (props) => {
  const { id: tripCode = "" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (tripCode) {
      // handle get detail by tripCode
      console.log("tripCode", tripCode);
    }
    return () => {
      // cleanup
    };
  }, [tripCode]);

  // const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onSearch = (value: any) => {
    console.log("value", value);
  };

  const genStatus = (
    <Tag color="#00467F" style={{ margin: "-20px 0 0 10px" }}>
      Đang chạy
    </Tag>
  );

  const tripInfo = [
    {
      icon: <CalendarOutlined />,
      data: [
        {
          label: "Người tạo",
          value: "8888 - Hệ Thống Auto",
        },
        {
          label: "Ngày tạo",
          value: "12/07/2021 - 14:17:55",
        },
        {
          label: "Bắt đầu",
          value: "12/07/2021 - 14:17:55",
        },
        {
          label: "Kết thúc",
          value: "",
        },
      ],
    },
    {
      icon: <DeploymentUnitOutlined />,
      data: [
        {
          label: "Đối tác",
          value: "GHN",
        },
        {
          label: "Dịch vụ",
          value: "",
        },
        {
          label: "Mã đối tác",
          value: "",
        },
        {
          label: "CBĐP",
          value: "1705438 - Nguyễn Việt Anh",
        },
      ],
    },
    {
      icon: <ContainerOutlined />,
      data: [
        {
          label: "Tổng giá trị",
          value: "0 VND",
        },
        {
          label: "Tổng cần thu",
          value: "0 VND",
        },
        {
          label: "Chưa thu",
          value: "0 VND",
        },
        {
          label: "Đã thu",
          value: "0 VND",
        },
      ],
    },
  ];

  const listBtn = [
    {
      icon: <EditOutlined />,
      text: "Cập nhật trạng thái",
      onClick: () => console.log("1"),
    },
    {
      icon: <DownloadOutlined />,
      text: "Xuất Excel",
      onClick: () => console.log("2"),
    },
    {
      icon: <PrinterOutlined />,
      text: "In",
      onClick: () => console.log("3"),
    },
    {
      icon: <NodeIndexOutlined />,
      text: "Đổi địa chỉ",
      onClick: () => console.log("4"),
    },
    {
      icon: <CalculatorOutlined />,
      text: "Tính tiền lại",
      onClick: () => console.log("5"),
    },
    {
      icon: <FolderAddOutlined />,
      text: "Thêm đơn hàng",
      onClick: () => setOpenModal(true),
    },
  ];

  // if (loading) return <Skeleton active paragraph={{ rows: 6 }} />;
  return (
    <>
      <div className={s.root}>
        <div className={s.titlePage}>
          <div className={s.viewRight}>
            <div className={s.btnBack} onClick={() => navigate(-1)}>
              <FaAngleLeft style={{ marginRight: "8px" }} />
              Quay lại
            </div>
            <span>Chi tiết chuyến đi</span>
            <span className={s.tripCode}>{tripCode}</span>
          </div>
          {genStatus}
        </div>
        <div className={s.content}>
          <Row>
            {tripInfo.map((item) => {
              const { icon, data = [] } = item;
              return (
                <Col xs={24} md={8}>
                  <Row gutter={[20, 20]}>
                    <Col span={4}>
                      <div className={s.viewIcon}>{icon}</div>
                    </Col>
                    <Col span={20}>
                      {data.map((e) => (
                        <Row gutter={[0, 20]}>
                          <Col span={8}>
                            <p style={{ color: "#808080" }}>{e.label}</p>
                          </Col>
                          <Col span={16}>
                            <p>{e.value}</p>
                          </Col>
                        </Row>
                      ))}
                    </Col>
                  </Row>
                </Col>
              );
            })}
          </Row>
        </div>
        <Divider />
        <div className={s.content} style={{ marginTop: "1rem" }}>
          <Row justify="space-between" align="middle" gutter={[20, 20]}>
            <Col xs={24} md={6}>
              <Search
                placeholder="Tìm kiếm bằng mã đơn hàng"
                onSearch={onSearch}
                enterButton
              />
            </Col>
            <Col
              xs={24}
              md={18}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {listBtn.map((item, index) => (
                <Tooltip title={item.text}>
                  <Button
                    icon={item.icon}
                    onClick={item.onClick}
                    style={{
                      width: "60px",
                      height: "32px",
                      marginLeft: index !== 0 ? "20px" : undefined,
                    }}
                  />
                </Tooltip>
              ))}
            </Col>
          </Row>
          <div style={{ marginTop: "1rem" }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Danh sách đơn hàng" key="1">
                <OrderListInTripDetail orderList={orderList} />
              </TabPane>
              <TabPane tab="Lịch sử thao tác" key="2">
                <History data={dummyHistory} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <ModalAddOrderToTrip
        show={openModal}
        handleCancel={() => setOpenModal(false)}
        title="Thêm đơn hàng vào chuyến đi"
      />
    </>
  );
};

export default TripDetail;

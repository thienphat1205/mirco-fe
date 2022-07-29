/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import s from "./index.module.less";
import { Row, Col, Input, Select, Button } from "antd";

const { Search } = Input;
const { Option } = Select;

const statusList = [{ value: "AUTO_NEW", label: "Chờ quét" }];

const TripList: React.FC = () => {
  const [filter, setFilter] = React.useState<any>({});

  const handleFilterChange = (
    name: string,
    value: string | undefined
  ): void => {
    setFilter({
      [name]: value,
    });
  };
  return (
    <Row className={s.tripList}>
      <Col md={10} sm={24}>
        <div className={s.viewLeft}>
          <Row className={s.viewLeft__top} gutter={[20, 20]}>
            <Col md={8} sm={24}>
              <div className={s.viewHeader}>
                <p>NVPTTT</p>
                <Search
                  placeholder="Mã NVPTTT"
                  onSearch={(value: string | undefined) =>
                    handleFilterChange("userId", value)
                  }
                />
              </div>
            </Col>
            <Col md={8} sm={24}>
              <div className={s.viewHeader}>
                <p>Trạng thái</p>
                <Select
                  placeholder="Trạng thái"
                  onChange={(value: string | undefined) =>
                    handleFilterChange("status", value)
                  }
                >
                  {statusList.map((item) => {
                    return <Option value={item?.value}>{item?.label}</Option>;
                  })}
                </Select>
              </div>
            </Col>
            <Col md={8} sm={24}>
              <div className={s.viewHeader}>
                <p>TIẾN ĐỘ</p>
                <p style={{ color: "#9b1616" }}>(YÊU CẦU 100%)</p>
              </div>
            </Col>
          </Row>
          <div className={s.viewTable}>Chưa có chuyến đi được tạo</div>
        </div>
      </Col>
      <Col md={14} sm={24}>
        <div className={s.viewRight}>
          <Row className={s.viewRight__top} gutter={[20, 20]}>
            <Col md={6} sm={24}>
              <div className={s.viewStatistic}>
                <p>Đã quét</p>
                <p>0/0</p>
              </div>
            </Col>
            <Col md={6} sm={24}>
              <div className={s.viewStatistic}>
                <p>Quét lỗi</p>
                <p>0/0</p>
              </div>
            </Col>
            <Col md={6} sm={24}>
              <div className={s.viewStatistic}>
                <p>Chưa quét</p>
                <p>0/0</p>
              </div>
            </Col>
            <Col md={6} sm={24}>
              <Button type="primary" style={{ width: "100%", height: "62px" }}>
                ĐỒNG KIỂM
              </Button>
            </Col>
          </Row>
          <div className={s.viewRight}>
            <Row className={s.viewRight__table} gutter={[20, 20]}>
              <Col md={8} sm={24}>
                <div className={s.viewHeader}>
                  <p>Mã đơn hàng</p>
                  <Search
                    placeholder="Mã đơn hàng"
                    onSearch={(value: string | undefined) =>
                      handleFilterChange("orderCode", value)
                    }
                  />
                </div>
              </Col>
              <Col md={8} sm={24}>
                <div className={s.viewHeader}>
                  <p>Địa chỉ</p>
                </div>
              </Col>
              <Col md={8} sm={24}>
                <div className={s.viewHeader}>
                  <p>Quét hàng</p>
                  <Select
                    placeholder="Chờ quét"
                    onChange={(value: string | undefined) =>
                      handleFilterChange("status", value)
                    }
                    disabled
                  />
                </div>
              </Col>
            </Row>
            <div className={s.viewTable}>Chưa có chuyến đi được tạo</div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TripList;

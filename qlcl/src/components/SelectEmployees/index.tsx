/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Select, Spin, Empty } from "antd";
import { getAssignableEmployeesAPI } from "@/services/ticket";
import CustomTagSelectMultiple from "../CustomTagSelectMultiple";

const { Option } = Select;

interface SelectAsignableEmployeesProps {
  ticketId: string;
  disabled?: boolean;

  value?: string;
  onChange?: any;
  defaultList?: any[];
}

const SelectAsignableEmployees: React.FC<SelectAsignableEmployeesProps> = ({
  disabled,
  value,
  onChange,
  ticketId,
  defaultList = [],
}) => {
  const [listData, setListData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const isMounted = React.useRef(true);

  useEffect(() => {
    if (ticketId) {
      getEmployeesList();
    }
    return () => {
      isMounted.current = false;
    };
  }, [ticketId]);

  const getEmployeesList = async () => {
    setLoading(true);
    const rs: any = await getAssignableEmployeesAPI(ticketId);
    if (isMounted.current) {
      setLoading(false);
      const respEmployeesList = rs?.data?.employees || [];
      const mergeList = [...defaultList, ...respEmployeesList];
      const uniqueObjects = [
        ...new Map(mergeList.map((item) => [item.id, item])).values(),
      ];
      setListData(uniqueObjects);
    }
  };

  const handleSelect = (id: string) => {
    onChange?.(id);
  };

  const options = listData.map((item) => (
    <Option key={item?.id}>{`${item?.id} - ${item?.name}`}</Option>
  ));

  if (loading) return <Spin />;

  return (
    <Select
      mode="multiple"
      placeholder="Chọn người chịu trách nhiệm"
      value={value}
      tagRender={(props) => CustomTagSelectMultiple({ ...props, disabled })}
      showSearch
      notFoundContent={
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Không có dữ liệu"
        />
      }
      filterOption={(input, option: any) => {
        const { children = "" } = option;
        return children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
      onChange={handleSelect}
      allowClear
      disabled={disabled}
    >
      {options}
    </Select>
  );
};

export default SelectAsignableEmployees;

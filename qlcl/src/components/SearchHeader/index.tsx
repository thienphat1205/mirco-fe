import React, { useState } from "react";
import { Input } from "antd";
import { FaSearch } from "react-icons/fa";
import ModalSearchHeader from "../ModalSearchHeader";

const SearchHeader: React.FC = () => {
  const [q, setQ] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);

  const [orderCode, setOrderCode] = useState<string | undefined>(undefined);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQ(event.target.value);
    if (!event.target.value) {
      setOrderCode(undefined);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === "Enter" && q) {
      setOrderCode(q);
      setVisible(true);
    }
  };

  const handleCancelModal = React.useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <Input
        placeholder="Tìm kiếm"
        prefix={<FaSearch />}
        onPressEnter={handleSearch}
        onChange={handleChangeInput}
        allowClear
      />
      <ModalSearchHeader
        visible={visible}
        handleCancel={handleCancelModal}
        orderCode={orderCode}
      />
    </>
  );
};

export default SearchHeader;

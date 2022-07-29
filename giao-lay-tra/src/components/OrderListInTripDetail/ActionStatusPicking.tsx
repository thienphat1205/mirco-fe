import React from "react";
import { Tag, Select } from "antd";
import styles from "./index.module.less";

const { Option } = Select;

const listStatus = [
  { value: "PICK_SUCCESS", label: "Lấy thành công" },
  { value: "PICK_FAIL", label: "Lấy thất bại" },
  { value: "PICK_CANCEL", label: "Lấy thất bại - Hủy" },
];

const listNoteCancel = [
  "LẤY NHIỀU LẦN KHÔNG THÀNH CÔNG",
  "NGƯỜI GỬI YÊU CẦU HỦY",
  "SAI THÔNG TIN / Hàng quá cân",
];

const listNoteFail = [
  "THAY ĐỔI THÔNG TIN / Khách hẹn lại ngày lấy",
  "THAY ĐỔI THÔNG TIN / Khách muốn gửi tại điểm",
  "KHÔNG LIÊN LẠC ĐƯỢC / Địa chỉ lấy hàng sai",
  "KHÔNG LIÊN LẠC ĐƯỢC / Thuê bao không liên lạc được",
  "KHÔNG LIÊN LẠC ĐƯỢC / Sai SĐT",
  "KHÔNG LIÊN LẠC ĐƯỢC / Khách không nghe máy",
  "SAI THÔNG TIN / Hàng quá cân",
  "SAI THÔNG TIN / Thông tin đơn hàng sai",
  "KHÔNG LẤY HÀNG KỊP / Lý do bất khả kháng",
];

const ActionStatusPicking: React.FC<any> = (props) => {
  const { record = {} } = props;
  const [statusSelected, setStatusSelected] = React.useState<
    string | undefined
  >(undefined);
  const [noteSelected, setNoteSelected] = React.useState<string | undefined>(
    undefined
  );
  const listNote =
    statusSelected === "PICK_FAIL" ? listNoteFail : listNoteCancel;

  const handleChangeStatus = (statusSelected: any) => {
    const listNote =
      statusSelected === "PICK_FAIL" ? listNoteFail : listNoteCancel;
    if (statusSelected === "PICK_SUCCESS") {
      setNoteSelected(undefined);
      setStatusSelected(statusSelected);
    } else {
      setStatusSelected(statusSelected);
      setNoteSelected(listNote[0]);
    }
  };

  const handleChangeNote = (noteSelected: any) => {
    setNoteSelected(noteSelected);
  };

  return record.status === "PICKING" ? (
    <div className={styles.actionStatusPicking}>
      <div>
        <Tag color="#00467F">Đang lấy</Tag>
      </div>
      <Select
        className={styles.selectUpdateStatus}
        onChange={handleChangeStatus}
        placeholder="Trạng thái"
        value={statusSelected}
      >
        {listStatus.map((item) => (
          <Option key={item.value}>{item.label}</Option>
        ))}
      </Select>
      {statusSelected && statusSelected !== "PICK_SUCCESS" && (
        <Select
          className={styles.selectUpdateStatus}
          style={{ display: "block", width: "350px" }}
          onChange={handleChangeNote}
          value={noteSelected}
        >
          {listNote.map((item) => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
      )}
    </div>
  ) : null;
};

export default ActionStatusPicking;

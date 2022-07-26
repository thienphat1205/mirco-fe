import styles from "./index.module.less";
import { FaTimes } from "react-icons/fa";

const CustomTagSelectMultiple = (props: any): JSX.Element => {
  const { label, onClose, disabled } = props;

  const onPreventMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className={styles.customTag} onMouseDown={onPreventMouseDown}>
      <span>{label}</span>
      {!disabled && <FaTimes className={styles.iconClose} onClick={onClose} />}
    </div>
  );
};

export default CustomTagSelectMultiple;

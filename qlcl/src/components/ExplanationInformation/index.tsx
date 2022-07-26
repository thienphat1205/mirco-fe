import React, { createContext, useContext } from "react";
// import { Row, Col } from "antd";
import styles from "./index.module.less";
import CustomTitle from "../CustomTitle";
import ItemCanNotEdit from "./ItemCanNotEdit";
import ItemCanEdit from "./ItemCanEdit";
import { IWorkflow } from "@/state/reducers/ticketReducer";

interface ExplanationInformationProps {
  explanation: any;
  canExplain: boolean;

  ticketId: string;

  workflow: IWorkflow;

  onStateChange: (values: any) => void;
}

const ExplanationContext = createContext(
  {} as Pick<
    ExplanationInformationProps,
    "explanation" | "ticketId" | "workflow" | "onStateChange"
  >
);

export const useExplanation = () => useContext(ExplanationContext);

const ExplanationInformation: React.FC<ExplanationInformationProps> = ({
  canExplain,
  explanation,
  ticketId,
  workflow,
  onStateChange,
}) => {
  return (
    <div className={styles.root}>
      <CustomTitle title="Thông tin giải trình" />
      <div className={styles.viewContent}>
        <ExplanationContext.Provider
          value={{ explanation, ticketId, workflow, onStateChange }}
        >
          {canExplain ? <ItemCanEdit /> : <ItemCanNotEdit />}
        </ExplanationContext.Provider>
      </div>
    </div>
  );
};

export default React.memo(ExplanationInformation);

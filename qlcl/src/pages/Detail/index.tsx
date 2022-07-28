/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Row, Col, Skeleton } from "antd";
import PenaltyTicketInformation from "@/components/PenaltyTicketInfo";
import ArrearsAmount from "@/components/ArrearsAmount";
import ExplanationInformation from "@/components/ExplanationInformation";
import s from "./index.module.less";
import { FaAngleLeft } from "react-icons/fa";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import moment from "moment";
import { formatTime, formatTimeCoundown } from "@/utils/utils";
import Countdown from "@/components/Countdown";
import ViewHistory from "./ViewHistory";
import NotFound from "../NotFound";

const Detail: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const history = useHistory();

  const [commonState, setCommonState] = React.useState<any>({
    message: "",
    attachments: [],
    assignedUserIds: [],
  });

  const {
    loading: {
      loadingGetTicketDetail = true,
      loadingAction = false,
      loadingGetWorkflow = true,
      loadingSubmit = false,
      loadingApprove = false,
      loadingReject = false,
    } = {},
    ticketDetail = {},
    workflowDetail: { explanationWorkflow = {} } = {},
  } = useTypedSelector((state) => state.ticket);

  const { ticketTypeList = [], ticketStatusList = [] } = useTypedSelector(
    (state) => state.metaData
  );

  const {
    getTicketStatusList,
    getTicketTypeList,
    getTicketDetail,
    setDataTicketReducer,
    getWorkflowDetail,
    submitTicket,
    approveTicket,
    rejectTicket,
  } = useActions();

  const {
    orderCode,
    penaltyFee = 0,
    ticketId = "",
    ticketType,
    canExplain = false,
    closedAt,
    createdAt,
    deadline,
    canApprove = false,
    approval_employee = [],
    assignmentIssue,
  } = ticketDetail;

  useEffect(() => {
    getTicketStatusList();
    getTicketTypeList();
    loadData();
    return () => {
      setDataTicketReducer({
        ticketDetail: {},
        workflowDetail: {},
      });
    };
  }, []);

  useEffect(() => {
    const { workflowId = "" } = ticketDetail;
    if (workflowId) {
      getWorkflowDetail({ workflowId });
    }
  }, [ticketDetail]);

  const loadData = () => {
    if (id) {
      getTicketDetail(id);
    }
  };

  const explanation = React.useMemo(() => {
    let data = {};
    const { explanation } = ticketDetail;
    if (explanation) {
      data = { ...explanation };
    }
    return data;
  }, [ticketDetail]);

  const genViewTop = (): JSX.Element => {
    const status: any = ticketDetail?.status || "0";
    return (
      <div className={s.viewTop}>
        <div className={s.btnBack} onClick={() => history.goBack()}>
          <FaAngleLeft style={{ marginRight: "8px" }} />
          Quay lại
        </div>
        <p className={s.textTicketCode}>
          Phiếu <span>{ticketId}</span>
        </p>
        <p className={s.textStatus}>
          {ticketStatusList.find((item) => item?.id === status * 1)?.name ||
            status}
        </p>
        {status !== "100" && status !== "1000" && (
          <p>
            Hạn chót xử lý{" "}
            {deadline && (
              <Countdown
                deadline={moment(deadline).format(formatTimeCoundown)}
                tooltipText={moment(deadline).format(formatTime)}
              />
            )}
          </p>
        )}
      </div>
    );
  };

  const mapDataToArray = [
    {
      label: "Loại phiếu",
      value:
        ticketTypeList.find((item) => item?.id === ticketType)?.name ||
        ticketType,
    },
    {
      label: "Thời hạn xử lý",
      value: deadline && moment(deadline).format(formatTime),
    },
    {
      label: "Đơn hàng",
      value: orderCode,
    },
    {
      label: "Thời điểm chốt truy thu",
      value: closedAt ? moment(closedAt).format(formatTime) : "-",
    },
    {
      label: "Thời điểm tạo phiếu",
      value: createdAt && moment(createdAt).format(formatTime),
    },
  ];

  if (ticketType === "TT_GAN_GIAO") {
    mapDataToArray.splice(2, 1, {
      label: "Tỉ lệ gán đơn",
      value: (
        <span>
          <span style={{ color: "#F26522" }}>
            {assignmentIssue?.assignmentRatio || 0}%
          </span>
          /{assignmentIssue?.assignmentRequired || 0}%
        </span>
      ),
    });
  }

  const onStateChange = React.useCallback((objectValues: any) => {
    setCommonState((prevState: any) => ({
      ...prevState,
      ...objectValues,
    }));
  }, []);

  const handleSubmitTicket = (): void => {
    const { ticketId = "" } = ticketDetail;
    const payload = {
      ticketId,
      ...commonState,
    };
    submitTicket(payload);
  };

  const ticketHandler = React.useMemo(() => {
    return approval_employee || [];
  }, [approval_employee]);

  const workflow = React.useMemo(() => {
    return explanationWorkflow;
  }, [explanationWorkflow]);

  if (loadingGetTicketDetail || loadingGetWorkflow)
    return (
      <div className={s.viewLoading}>
        <Skeleton active />
      </div>
    );

  if (!loadingGetTicketDetail && !ticketId) {
    return <NotFound />;
  }

  const { canSubmit = false, canUpdate = false } = explanationWorkflow;

  return (
    <div className={s.root} style={{ height: "calc(100vh - 80px)" }}>
      <Row
        className={s.wrapper}
        style={!canExplain && !canApprove ? { paddingBottom: 0 } : {}}
      >
        <Col md={17} sm={24} className={s.viewContent}>
          {genViewTop()}
          <PenaltyTicketInformation
            dataList={mapDataToArray}
            ticketHandler={ticketHandler}
          />
          <ExplanationInformation
            explanation={explanation}
            canExplain={canExplain}
            ticketId={ticketId}
            workflow={workflow}
            onStateChange={onStateChange}
          />
          <ArrearsAmount amount={penaltyFee} />
        </Col>
        <Col md={7} sm={24} className={s.viewHistory}>
          <ViewHistory ticketId={ticketId} />
        </Col>
      </Row>
      {canExplain && (
        <div className={s.footer}>
          <div>
            {canUpdate && (
              <Button
                className={s.btnSubmit}
                htmlType="submit"
                form="update-explanation-ticket-detail"
                loading={loadingAction}
              >
                Lưu
              </Button>
            )}
          </div>
          <div>
            {canSubmit && (
              <Button
                type="primary"
                style={{ width: "113px" }}
                onClick={handleSubmitTicket}
                loading={loadingSubmit}
              >
                Gửi duyệt
              </Button>
            )}
          </div>
        </div>
      )}
      {canApprove && (
        <div className={s.footer}>
          <div />
          <div>
            <Button
              className={s.btnSubmit}
              loading={loadingApprove}
              onClick={() => approveTicket(id)}
            >
              Không truy thu
            </Button>
            <Button
              type="primary"
              style={{ width: "102px", marginLeft: "10px" }}
              loading={loadingReject}
              onClick={() => rejectTicket(id)}
            >
              Truy thu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;

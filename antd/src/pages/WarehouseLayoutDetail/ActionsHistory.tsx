/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { dialog, getLocalStorage } from "@/utils/utils";
import { getHubUsersAPI } from "@/services/shift";
import { getAreaHistoryAPI } from "@/services/layout";
import s from "./index.module.less";
import { Skeleton } from "antd";
import moment from "moment";

interface ActionsHistoryProps {
  areaId: string;
}

interface User {
  user_id: string;
  user_name: string;
  user_type: number;

  name: string;
}

interface ItemHistory {
  hub_area_id: string;
  hub_id: string;
  layout: string;
  action: string;
  created_at: string;
  created_by: string;
}

const ActionsHistory: React.FC<ActionsHistoryProps> = ({ areaId }) => {
  const [users, setUsers] = useState<User[]>([] as User[]);
  const [history, setHistory] = useState<ItemHistory[]>([] as ItemHistory[]);
  const [loadingGetHubUsers, setLoadingGetHubUsers] = useState<boolean>(false);
  const [loadingGetHistory, setLoadingGetHistory] = useState<boolean>(false);

  useEffect(() => {
    handleGetHubUsers();
    handleGetHistory();
  }, []);

  const handleGetHistory = async () => {
    try {
      setLoadingGetHistory(true);
      const response: any = await getAreaHistoryAPI({ hub_area_id: areaId });
      setLoadingGetHistory(false);
      const { data, code } = response;
      if (code !== 200) throw response;
      if (Array.isArray(data)) {
        setHistory(data);
      }
    } catch (errors) {
      dialog(errors);
    }
  };

  const handleGetHubUsers = async () => {
    const hub_id = getLocalStorage("CURRENT_HUB") || "";
    try {
      setLoadingGetHubUsers(true);
      const response: any = await getHubUsersAPI({ hub_id });
      setLoadingGetHubUsers(false);
      const { data, code } = response;
      if (code !== 200) throw response;
      const users = data?.users || [];
      const formatDataUsers = users.map((user: User) => {
        const { user_id, user_name } = user;
        const name = `${user_id} - ${user_name}`;
        return { ...user, name };
      });
      setUsers(formatDataUsers);
    } catch (errors) {
      dialog(errors);
    }
  };

  if (loadingGetHubUsers || loadingGetHistory) return <Skeleton active />;

  return (
    <div className={s.viewHistory}>
      {history.map((item: ItemHistory) => {
        const { created_at, created_by, action } = item;
        const findUserName = users.find(
          (user: User) => user?.user_id === created_by
        )?.name;
        const formatTime =
          created_at && moment(created_at).format("HH:mm DD/MM/YYYY");
        return (
          <p>
            {formatTime} - {findUserName} - {action}
          </p>
        );
      })}
    </div>
  );
};

export default ActionsHistory;

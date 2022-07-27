import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { login } from "@/services/auth";
import { getLocalStorage } from "@/utils/utils";
import { useEffect } from "react";
import Authorized from "../Authorized";
import ComponentHeader from "../Header";

import { createBrowserHistory } from "history";
import { Outlet } from "react-router-dom";
const history = createBrowserHistory();

const MainLayout: React.FC<{}> = () => {
  const { getCurrentUser, getHubList } = useActions();

  const {
    loading: {
      loadingGetCurrentUser = false,
      loading = false,
      loadingGetPermissions = false,
      loadingGetHubList = false,
    } = {},
    hubList,
  } = useTypedSelector((state) => state.user);

  useEffect(() => {
    const token = getLocalStorage("SESSION");
    if (token) {
      console.log({ token });
      getCurrentUser();
      getHubList();
    } else {
      login();
    }
  }, []);

  return (
    <div>
      <ComponentHeader hubList={hubList} />
      <Authorized>
        <Outlet />
      </Authorized>
    </div>
  );
};

export default MainLayout;

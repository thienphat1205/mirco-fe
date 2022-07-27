import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { login } from "@/services/auth";
import { getLocalStorage } from "@/utils/utils";
import { useEffect } from "react";
import Authorized from "../Authorized";
import ComponentHeader from "../Header";

// import { createBrowserHistory } from "history";
// const history = createBrowserHistory();

const MainLayout: React.FC<{
  children: any;
}> = ({ children }) => {
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
      <Authorized>{children}</Authorized>
    </div>
  );
};

export default MainLayout;

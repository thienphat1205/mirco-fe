import { useActions } from "@/hooks/useActions";
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

  useEffect(() => {
    // alert(JSON.stringify(history));
    const token = getLocalStorage("SESSION");
    if (token) {
      getCurrentUser();
      getHubList();
    } else {
      login();
    }
  }, []);

  return (
    <div>
      <ComponentHeader />
      <Authorized>{children}</Authorized>
    </div>
  );
};

export default MainLayout;

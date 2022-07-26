import { useActions } from "@/hooks/useActions";
import { login } from "@/services/auth";
import { getLocalStorage } from "@/utils/utils";
import { useEffect } from "react";
import Authorized from "../Authorized";
import ComponentHeader from "../Header";

const MainLayout: React.FC<{
  children: any;
}> = ({ children }) => {
  const { getCurrentUser, getHubList } = useActions();

  useEffect(() => {
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

import { useLocation, matchPath } from "react-router-dom";
import routeList, { RouteType } from "@/config/routes";

interface GetCurrentPath {
  currentPath: RouteType | undefined;

  pathList: RouteType[] | undefined;
}

export const useGetCurrentPath = (layoutName: string): GetCurrentPath => {
  let currentPath = undefined;

  const { pathname } = useLocation();

  const pathList = routeList.find((item) => item?.name === layoutName)?.routes;

  if (pathList) {
    currentPath = pathList.find((route) => {
      const { path } = route;
      return matchPath(path, pathname);
    });
  }

  return { currentPath, pathList };
};

import { getEnv } from "@/utils/utils";
import { createBrowserHistory, createMemoryHistory } from "history";
import ReactDOM from "react-dom";
import App from "./App";

const ENV = getEnv();

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath, store }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} store={store} />, el);

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      // history.push(nextPathname);
      // nextPathname from location
      const { pathname } = history.location;
      if (nextPathname !== pathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
// if (ENV === "LOCAL") {
//   const devRoot = document.querySelector("#qlcl-dev-root");

//   if (devRoot) {
//     mount(devRoot, { defaultHistory: createBrowserHistory() });
//   }
// }

// We are running through container
// and we should export the mount function
export { mount };

import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);

  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        // nextPathname from location
        const { pathname } = history.location;
        if (nextPathname !== pathname) {
          history.push(nextPathname);
        }
      },
      token: "token from container",
    });
    history.listen(onParentNavigate);
  });

  return <div ref={ref} />;
};

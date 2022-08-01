import { mount } from "marketing/MarketingApp";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default (props) => {
  const ref = useRef(null);
  const { store } = props;
  const location = useLocation();

  const navigate = useNavigate();

  const { pathname } = location;

  useEffect(() => {
    console.log("RUNNN MKT", pathname, location);
    const { onParentNavigate } = mount(ref.current, {
      initialPath: pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        if (nextPathname !== pathname) {
          navigate(nextPathname);
        }
      },
      store,
    });
    onParentNavigate(location);
  }, [location]);

  return <div ref={ref} />;
};

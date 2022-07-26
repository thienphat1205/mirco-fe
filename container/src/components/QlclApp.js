import { mount } from "qlcl/Qlcl-App";
import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const ref = useRef(null);

  const location = useLocation();

  const navigate = useNavigate();

  const { pathname } = location;

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        if (nextPathname !== pathname) {
          navigate(nextPathname);
        }
      },
    });

    onParentNavigate(location);
  }, [location]);

  return <div ref={ref} />;
};

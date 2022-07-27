import { mount } from "ktc_lc/KtcLcApp";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default (props) => {
  const { store } = props;
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
      store,
    });

    onParentNavigate(location);
  }, [location]);

  return <div ref={ref} />;
};

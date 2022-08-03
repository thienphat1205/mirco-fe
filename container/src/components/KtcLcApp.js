import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const NotFound = lazy(() => import("@/pages/NotFound"));

export default (props) => {
  const { store } = props;
  const ref = useRef(null);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const { pathname } = location;

  useEffect(() => {
    import("ktc_lc/KtcLcApp")
      .then(({ mount }) => {
        setIsError(false);
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
      })
      .catch(() => {
        setIsError(true);
      });
  }, [location]);
  if (isError)
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    );
  return <div ref={ref} />;
};

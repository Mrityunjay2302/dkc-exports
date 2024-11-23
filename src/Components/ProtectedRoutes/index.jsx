import React, { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../../Routes";


const ProtectedRoutes = () => {
  const processedRoutes = useMemo(() => {
    if (routes && routes?.length) {
      return routes?.map((ele, i) =>
        ele?.protected ? (
          <Route key={i} path={ele?.path} element={ele?.component} />
        ) : !ele?.protected ? (
          <Route key={i} path={ele?.path} element={ele?.component} />
        ) : null
      );
    }
  }, []);

  return <Routes>{processedRoutes}</Routes>;
};

export default ProtectedRoutes;

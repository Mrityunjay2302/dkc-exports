import React, { Suspense } from "react";
import PropTypes from "prop-types";
import SuspanceLoading from "Components/SuspanceLoading";

const Layout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<SuspanceLoading />}>
        <main
          style={{
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
          }}
        >
          {children}
        </main>
      </Suspense>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

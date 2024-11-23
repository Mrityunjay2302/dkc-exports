import Layout from "./Layout";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import React from "react";

const App = () => {
  return (
    <>
      <Layout>
        <ProtectedRoutes />
      </Layout>
    </>
  );
};

export default App;

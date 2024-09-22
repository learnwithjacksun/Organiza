import PropTypes from "prop-types";
import Header from "../Components/UI/Header";

const RootLayout = ({ children }) => {
  return (
    <>
      <div className="main">
        <Header />
        <div className="layout">{children}</div>
      </div>
    </>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;

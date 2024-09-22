import PropTypes from "prop-types";

const Heading = ({ children }) => {
  return (
    <>
      <h1 className="text-xl capitalize mb-4 font-semibold font-sora">{children}</h1>
    </>
  );
};
Heading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Heading;

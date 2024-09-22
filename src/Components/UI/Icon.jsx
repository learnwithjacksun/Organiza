import Prop from "prop-types";

const Icon = ({ children, styles }) => {
  return (
    <>
      <span className={`material-symbols-outlined ${styles}`}>{children}</span>
    </>
  );
};

Icon.propTypes = {
  children: Prop.node.isRequired,
  styles: Prop.string,
};

export default Icon;

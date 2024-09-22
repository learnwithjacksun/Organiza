// ImageInput.js
import PropTypes from "prop-types";

const ImageInput = ({ handleImageChange, children }) => {
  return (
    <>
      <div>
        <label htmlFor="image">{children}</label>
        <input
          type="file"
          name="image"
          id="image"
          accept=".png,.jpg,.jpeg"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </>
  );
};

ImageInput.propTypes = {
  handleImageChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ImageInput;

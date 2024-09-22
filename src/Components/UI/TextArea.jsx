import Props from "prop-types";

const TextArea = ({
  label,
  id,
  placeholder,
  bg_color,
  value,
  handleChange,
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="font-sora font-medium text-sm pl-1">
            {label}:
          </label>
        )}
        <textarea
          rows={5}
          name={id}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          autoCorrect="on"
          className={`${bg_color} border-line border placeholder:text-sub text-sm font-medium focus-within:border-primary px-4 pt-3 w-full rounded-lg`}
        ></textarea>
      </div>
    </>
  );
};

TextArea.propTypes = {
  label: Props.string,
  id: Props.string,
  placeholder: Props.string,
  bg_color: Props.string,
  value: Props.string,
  handleChange: Props.func,
};

export default TextArea;

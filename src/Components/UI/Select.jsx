import Icon from "./Icon";
import Props from 'prop-types'


const Select = ({
  label,
  id,
  value,
  options,
  handleChange,
  bg_color = "bg-transparent",
}) => {
  return (
    <div
    data-aos="zoom-in-up"
    data-aos-delay="200" 
      className="flex flex-col gap-1">
     {label && ( <label htmlFor={id} className="font-sora font-medium text-sm pl-1">
        {label}:
      </label>)}
      <div className="relative">
        <select
          name={id}
          id={id}
          value={value}
          onChange={handleChange}
          className={`${bg_color} appearance-none border-line border text-sm font-medium focus-within:border-primary px-4 h-10 w-full rounded-lg`}
        >
          <option value="">Select Organization {id}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute top-1/2 -translate-y-1/2 right-2 flex-center cursor-default border-line">
          <Icon styles="text-sub">keyboard_arrow_down</Icon>
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
    label: Props.string,
    id: Props.string,
  options: Props.object,
    value:Props.string,
    handleChange:Props.func,
    bg_color: Props.string,
}

export default Select;

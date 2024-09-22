import Icon from "./Icon";
import PropTypes from "prop-types";
const Search = ({ search, setSearch }) => {
  return (
    <>
      <div className="relative">
        <div className="absolute h-10 w-10 flex-center top-1/2 -translate-y-1/2 left-1">
          <Icon styles="text-sub">search</Icon>
        </div>
        <input
          type="text"
          placeholder="Search organization..."
          className="placeholder:text-sub text-sm font-medium focus-within:border-primary focus:border pl-10 h-12 w-full rounded-full bg-lighter"
          value={search}
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)} // Update search value
        />
      </div>
    </>
  );
};

Search.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default Search;

import PropTypes from "prop-types";
import Icon from "../Components/UI/Icon";
import { Link } from "react-router-dom";
import useTheme from "../Hooks/useTheme";

const AuthLayout = ({ children, title, subtitle }) => {
  const {darkMode, toggleDarkMode} =  useTheme()
  return (
    <>
      <div className="main">
          <header>
            <nav className="layout h-[60px] md:h-[80px] flex items-center justify-between">
              <Link
                to="/"
                className="h-10 w-10 rounded-lg flex-center bg-lighter border-line border"
              >
                <Icon>arrow_back</Icon>
              </Link>
              <button onClick={toggleDarkMode} className="h-10 w-10 flex-center text-sub">
              <Icon styles={"text-[1.3em]"}>{darkMode? "light_mode": "dark_mode"}</Icon>
              </button>
            </nav>
          </header>
          <div>
            <div className="mt-6 text-center">
              <h3 className="font-semibold font-sora text-xl">{title}</h3>
              <p className="text-sub ">{subtitle}</p>
            </div>
            <div>{children}</div>
          </div>
      </div>
    </>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AuthLayout;

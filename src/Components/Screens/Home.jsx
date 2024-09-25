import { Link } from "react-router-dom";
import PageTransition from "../../Layouts/PageTransitions";
import Brand from "../UI/Brand";
import Icon from "../UI/Icon";
import Footer from "../UI/Footer";
import preview from '../../assets/preview.png'
import useTheme from "../../Hooks/useTheme";

const Home = () => {
  const {darkMode, toggleDarkMode} =  useTheme()
  return (
    <>
      <PageTransition>
        <div className="bg-gradient-to-tr from-orange-500/10 to-transparent">
          <div className="main relative flex min-h-screen gap-12 py-20 flex-col justify-around items-center">
          <button onClick={toggleDarkMode} className="absolute top-2 right-0 h-10 w-10 flex-center text-sub">
                <Icon styles={"text-[1.3em]"}>{darkMode? "light_mode": "dark_mode"}</Icon>
                </button>
            <div className="w-full layout">
              {/* Hero */}
              <div className="text-center">
                <Brand />
                {/* <p className="font-semibold text-sub">
                  Stay Organized. Track Projects. Achieve More.
                </p> */}
                <p className="text-xs text-sub">Organiza helps you create, manage, and track all your projects in one place. Stay on top of tasks and collaborate effortlessly with your team.</p>
              </div>
              {/* CTA */}
              <div className="flex md:flex-row gap-2 flex-col-reverse mt-6">
                <Link
                  to="/register"
                  className="btn flex-1 bg-invert text-invert_text min-h-11 rounded-xl md:w-auto w-[70%] mx-auto"
                >
                  <span>Create new accout</span>
                  <Icon styles="text-[1.3em]">person_add</Icon>
                </Link>
                <Link
                  to="/organizations"
                  className="btn-primary flex-1 min-h-11 rounded-xl md:w-auto w-[70%] mx-auto"
                >
                  <span>See Organizations</span>
                  <Icon styles="text-[1.3em]">arrow_forward</Icon>
                </Link>
              </div>
            </div>
            {/* Preview */}
            <div className="layout bg-primary p-8 md:p-12 rounded-lg">
              <div className="overflow-hidden rounded-md -rotate-3">
                <img src={preview} alt="Preview" className="w-full" />
              </div>
            </div>
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Home;

import { Link } from "react-router-dom";
import PageTransition from "../../Layouts/PageTransitions";
import Brand from "../UI/Brand";

import Icon from "../UI/Icon";
import Footer from "../UI/Footer";

const Home = () => {
  return (
    <>
      <PageTransition>
        <div className="main flex flex-col min-h-screen justify-around items-center">
          <div className="w-full layout">

            {/* Hero */}
            <div className="text-center">
              <Brand />
              <p className="font-semibold text-sub">
                Stay Organized. Track Projects. Achieve More.
              </p>
            </div>

            {/* CTA */}
            <div className="flex md:flex-row gap-2 flex-col-reverse mt-6">
              <Link to="/register" className="btn flex-1 bg-lighter min-h-11 rounded-xl md:w-auto w-[70%] mx-auto">
                <span>Create new accout</span>
                <Icon styles="text-[1.3em]">person_add</Icon>
              </Link>
              <Link to="/organizations" className="btn-primary flex-1 min-h-11 rounded-xl md:w-auto w-[70%] mx-auto">
                <span>Go to dashboard</span>
                <Icon styles="text-[1.3em]">arrow_forward</Icon>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </PageTransition>
    </>
  );
};

export default Home;

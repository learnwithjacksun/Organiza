import { useState, useRef, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import useOrganization from "../../../Hooks/UseOrganization";
import PageTransition from "../../../Layouts/PageTransitions";
import RootLayout from "../../../Layouts/RootLayout";
import Grid from "../../UI/Grid";
import Heading from "../../UI/Heading";
import Icon from "../../UI/Icon";
import Organizations from "./Organizations";
import Users from "./Users";
import Modal from "../../UI/Modal";
import Input from "../../UI/Input";
import { AnimatePresence } from "framer-motion";

const Admin = () => {
  const { organizations } = useOrganization();
  const { users } = useAuth();

  // State to track active tab
  const [activeTab, setActiveTab] = useState("users");

  const contentRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  const validPassCode = "2024";

  // Handle passcode verification
  const verifyPasscode = (e) => {
    e.preventDefault();
    if (passcode === validPassCode) {
      setIsModalOpen(false); 
      setError("");
    } else {
      setError("Invalid passcode, please try again.");
    }
  };

  // Scroll into view when the active tab changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeTab]);

  return (
    <>
      <RootLayout>
        <PageTransition>
          <Heading>Admin</Heading>

          <Grid>
            <div className="bg-lighter relative hover:border-primary duration-200 p-6 rounded-2xl border border-line cursor-pointer">
              <div>
                <p className="text-sub">Total Users</p>
                <h2 className="font-sora font-bold text-4xl">{users?.length}</h2>
              </div>
            </div>
            <div className="bg-lighter relative hover:border-primary duration-200 p-6 rounded-2xl border border-line cursor-pointer">
              <div>
                <p className="text-sub">Total Organizations</p>
                <h2 className="font-sora font-bold text-4xl">{organizations?.length}</h2>
              </div>
            </div>
          </Grid>

          {/* Tab buttons */}
          <div className="md:w-[70%] w-full mx-auto my-6 flex gap-2 bg-lighter p-2 h-16 overflow-hidden rounded-full border border-line">
            <button
              className={`flex-1 rounded-full px-6 ${
                activeTab === "users" ? "btn-primary" : "btn"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <span>Users</span>
              <Icon>group</Icon>
            </button>
            <button
              className={`flex-1 rounded-full px-6 ${
                activeTab === "organizations" ? "btn-primary" : "btn"
              }`}
              onClick={() => setActiveTab("organizations")}
            >
              <span>Organizations</span>
              <Icon>team_dashboard</Icon>
            </button>
          </div>

          {/* Conditional Rendering based on the active tab */}
          <div ref={contentRef}></div>
          <div>{activeTab === "users" && <Users />}</div>
          <div>{activeTab === "organizations" && <Organizations />}</div>
        </PageTransition>
      </RootLayout>

      {/* Admin Verification Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Modal title="Admin Verification" toggleModal={() => {}}>
            <p className="text-sub mb-4">To access this page, the admin passcode is required.</p>
            <form onSubmit={verifyPasscode}>
              <Input
                id="passcode"
                type="password"
                placeholder="Enter admin passcode"
                value={passcode}
                bg_color="bg-secondary"
                handleChange={(e) => setPasscode(e.target.value)}
              />
              {error && <p className="text-red-500 font-medium text-sm mt-2">{error}</p>}
              <button
                type="submit"
                className="btn-primary mt-4 h-9 rounded-lg w-1/2 md:min-w-[200px]"
              >
                Verify
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Admin;

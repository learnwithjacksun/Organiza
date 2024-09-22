import { Link } from "react-router-dom";
import Icon from "./Icon";
import useTheme from "../../Hooks/useTheme";
import Modal from "./Modal";
import { useState } from "react";
import ImageInput from "./ImageInput";
import { AnimatePresence } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";


const Header = () => {
  const {logout, data} = useAuth()
  const { darkMode, toggleDarkMode } = useTheme();
  const [imageView, setImageView] = useState(false);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleLogout = () => {
    toast.promise(
        logout(),
        {
            loading: "Logging out...!",
            success: "Logout Successful!",
            error: "An error occurred!"
        }
    )
  }

  
  return (
    <>
      <nav className="layout md:h-[80px] h-[60px] flex items-center justify-between ">
        <Link
          to={-1}
        >
          <Icon>arrow_back</Icon>
        </Link>

        <div className="flex items-center md:gap-6 gap-4">
          <div
            onClick={toggleDarkMode}
            className="h-10 w-10 flex-center bg-lighter rounded-full text-sub"
          >
            <Icon styles={"text-[1.3em]"}>
              {darkMode ? "light_mode" : "dark_mode"}
            </Icon>
          </div>

          {/* Profile */}
          <div
            onClick={() => setModal((prev) => !prev)}
            className="flex items-center gap-2 bg-lighter p-1 border border-line rounded-full"
          >
            <div className="h-10 w-10 rounded-full overflow-hidden flex-center text-white">
              <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${data?.name}`}
                alt="Avatar"
              />
            </div>
            <div className="btn">
              <Icon>keyboard_arrow_down</Icon>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {modal && (
          <Modal title="Profile" toggleModal={() => setModal((prev) => !prev)}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="h-[100px] w-[100px] rounded-full overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${data?.name}`}
                    alt="Avatar"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold">{data?.name}</h2>
                  <p className="text-sm mb-2 text-gray-500">{data?.email}</p>
                  <span
                    onClick={() => setImageView((prev) => !prev)}
                    className="flex items-center py-2 px-4 text-sm font-bold bg-lighter justify-center gap-2 rounded-full"
                  >
                    {imageView ? (
                      <>
                        <Icon styles={"text-[1.3em]"}>close</Icon>
                        <span>Cancel Upload</span>
                      </>
                    ) : (
                      <>
                        <Icon styles={"text-[1.3em]"}>add_a_photo</Icon>
                        <span>Upload Photo</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {imageView && (
                <div>
                  <ImageInput handleImageChange={handleImageChange}>
                    <div className="border-dashed bg-secondary border-line border flex-center p-6 rounded-lg">
                      <div className="flex flex-col items-center">
                        <Icon styles="text-sub">add_a_photo</Icon>
                        {!image?.name && (
                          <span className="text-sub text-sm font-semibold">
                            Click to add
                          </span>
                        )}
                        {image?.name && (
                          <div className="font-semibold text-sm bg-light px-6 py-2 rounded-full border border-line mt-2">
                            {image?.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </ImageInput>
                  <div className="flex justify-end">
                    <button className="btn-primary mt-2 px-4 h-10 rounded-lg">
                      Update
                    </button>
                  </div>
                </div>
              )}

              <div className="border-t border-line pt-4">
                <button onClick={handleLogout} className="btn text-white bg-red-600 rounded-full h-11 px-6">
                  <span>Logout</span>
                  <Icon styles={"text-[1.3em]"}>logout</Icon>
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

{
  /* <button className="btn bg-red-500/10 h-10 w-10 border border-red-500 rounded-full">
            <Icon styles="text-red-500 text-[1.4em]">logout</Icon>
          </button> */
}

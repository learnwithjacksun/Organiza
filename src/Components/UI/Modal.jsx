import { motion } from "framer-motion";
import Icon from "./Icon";
import Props from "prop-types";

const Modal = ({ title, toggleModal, children }) => {
  const modalVars = {
    initial: {
      y: 200,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 200,
      opacity: 0,
    },
  };
  const bgVars = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <>
      <div className="fixed inset-0 z-10">
              <motion.div
                  initial={bgVars.initial}
                  animate={bgVars.animate}
                  exit={bgVars.exit}
          onClick={toggleModal}
          className="absolute -z-10 inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"
        ></motion.div>
        <motion.div
          variants={modalVars}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-[90%] md:w-[480px] mx-auto bg-light border border-line mt-20 p-4 rounded-2xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-[1.2em] font-semibold font-sora">{title}</h3>
            <div
              onClick={toggleModal}
              className="h-12 w-12 bg-lighter flex-center rounded-full"
            >
              <Icon>close</Icon>
            </div>
          </div>

          <div className="my-4">{children}</div>
        </motion.div>
      </div>
    </>
  );
};

Modal.propTypes = {
  title: Props.string.isRequired,
  toggleModal: Props.func.isRequired,
  children: Props.node.isRequired,
};

export default Modal;

import { useLocation } from "react-router-dom";
import PageTransition from "../../Layouts/PageTransitions";
import RootLayout from "../../Layouts/RootLayout";
import Heading from "../UI/Heading";
import Icon from "../UI/Icon";
import Modal from "../UI/Modal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Input from "../UI/Input";
import NoData from "../UI/NoData";
import toast from "react-hot-toast";
import UseOrganization from "../../Hooks/UseOrganization";

const Projects = () => {
  const location = useLocation();
  const { organization } = location.state || "";
  const { title, description, members, organizationId } = organization;
  const [showMembers, setShowMembers] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");

  const { projects, createProjects, deleteProject, startProject, finishProject } = UseOrganization(organizationId);

  const handleForm = (e) => {
    e.preventDefault();
    if (!projectName) toast.error("Project Name is Required!");
    else {
      toast.promise(createProjects(projectName), {
        loading: "Creating Project...",
        success: () => {
          setProjectName("");
          setShowForm(false);
          return "Project Created Successfully";
        },
        error: (err) => {
          return `${err}`;
        },
      });
    }
  };

  const handleDelete = (id) => {
    toast.promise(deleteProject(id), {
      loading: "Deleting Project...",
      success: "Project Deleted!",
      error: (err) => `${err}`,
    });
  }
  const inProgress = (id) => {
    toast.promise(startProject(id), {
      loading: "Starting Project...",
      success: "Project In Progress!",
      error: (err) => `${err}`,
    });
  }
  const completed = (id) => {
    toast.promise(finishProject(id), {
      loading: "Completing Project...",
      success: "Project Completed!",
      error: (err) => `${err}`,
    });
  }
  return (
    <>
      <RootLayout>
        <PageTransition>
          <div>
            <Heading>{title}</Heading>
            <p className="text-sub">{description}</p>
            <div
              onClick={() => setShowMembers((prev) => !prev)}
              className="inline-flex text-sm font-medium items-center gap-2 border-b border-primary"
            >
              <span>See members</span>
              <Icon styles={"text-[1.3em]"}>group</Icon>
            </div>
          </div>

          <div className="my-6">
            <div className="line py-4 flex items-center justify-between">
              <h2 className="font-medium font-sora">Projects</h2>
              <button
                onClick={() => setShowForm((prev) => !prev)}
                className="btn-primary h-9 px-4 rounded-lg border-b-4 border-[rgba(0,0,0,0.09)]"
              >
                {/* <Icon>add</Icon> */}
                <span>Add New</span>
              </button>
            </div>

            <div className="my-4">
              {projects?.length === 0 && (
                <NoData message="There are no projects here yet! 🤷‍♂️" />
              )}
              <ul className="flex flex-col gap-4">
                {projects.map((project) => {
                  const {$id, projectId, title, status, $createdAt } = project;

                  return (
                    <>
                      <li
                        key={projectId}
                        className="flex border border-line flex-col gap-2 p-2 px-4 rounded-xl bg-lighter"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{title}</h3>
                            <p className="text-sub text-sm">
                              {status === "in progress" && "Started at"}{" "}
                              {status === "completed" && "Done at"}{" "}
                              {status === "pending" && "Created at"}:{" "}
                              {new Date($createdAt).toLocaleString()}
                            </p>
                          </div>

                          <div onClick={()=> handleDelete($id)}>
                            <Icon styles={"text-[1.3em]"}>delete</Icon>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">
                            <span
                              className={`bg-orange-500/10 capitalize text-orange-500 px-3 rounded-full font-bold border border-orange-500 ${
                                status === "completed" &&
                                "border-green-500 text-green-500 bg-green-500/10"
                              } ${
                                status === "in progress" &&
                                "text-blue-500 border-blue-500 bg-blue-500/10"
                              }`}
                            >
                              {status}
                            </span>
                          </p>
                          {status === "in progress" ? (
                            <button
                              onClick={()=>completed($id)}
                              className={`${
                                status === "completed"
                                  ? "hidden"
                                  : "btn bg-light py-2 px-4 border border-line rounded-xl shadow-lg"
                              }`}
                            >
                              Task Completed?
                            </button>
                          ) : (
                              <button
                                onClick={()=> inProgress($id)}
                              className={`${
                                status === "completed"
                                  ? "hidden"
                                  : "btn bg-light py-2 px-4 border border-line rounded-xl shadow-lg"
                              }`}
                            >
                              Start Task
                            </button>
                          )}
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </PageTransition>
      </RootLayout>

      <AnimatePresence>
        {showMembers && (
          <Modal
            title="Members"
            toggleModal={() => setShowMembers((prev) => !prev)}
          >
            <div className="my-4">
              <ul className="flex flex-col gap-2">
                {members.map((member, idx) => (
                  <li
                    key={idx}
                    className="font-sora bg-lighter py-3 px-6 border-b border-line"
                  >
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </Modal>
        )}

        {showForm && (
          <Modal
            title="Add Project"
            toggleModal={() => setShowForm((prev) => !prev)}
          >
            <form onSubmit={handleForm} className="flex flex-col gap-4">
              <Input
                id={"task"}
                label={"Project"}
                type={"text"}
                bg_color="bg-secondary"
                placeholder={"Enter a new project to carryout..."}
                value={projectName}
                handleChange={(e) => setProjectName(e.target.value)}
              />
              <button type="submit" className="btn-primary h-10 rounded-md">
                <span>Create</span>
                <Icon>add</Icon>
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;

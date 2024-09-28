import { useLocation } from "react-router-dom";
import PageTransition from "../../Layouts/PageTransitions";
import RootLayout from "../../Layouts/RootLayout";
import Heading from "../UI/Heading";
import Icon from "../UI/Icon";
import Modal from "../UI/Modal";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Input from "../UI/Input";
import NoData from "../UI/NoData";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useOrganization from "../../Hooks/UseOrganization";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Projects = () => {
  const location = useLocation();
  const { organization } = location.state || "";
  const { title, description, organizationId } = organization;
  const [showMembers, setShowMembers] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const { data } = useAuth();
  const [isMember, setIsMember] = useState(false);
  const [copy, setCopy] = useState(false);
  const {
    projects,
    createProjects,
    deleteProject,
    startProject,
    finishProject,
    addMembers,
    members,
    loading,
  } = useOrganization(organizationId);

  const copyPassKey = () => {
    if (organization?.passKey) {
      navigator.clipboard
        .writeText(organization.passKey)
        .then(() => {
          toast.success("Passkey copied to clipboard!");
          setCopy(true);
          setTimeout(() => {
            setCopy(false);
          }, 2000);
        })
        .catch((err) => {
          toast.error(`Failed to copy passkey: ${err}`);
        });
    } else {
      toast.error("No passkey available to copy!");
    }
  };

  useEffect(() => {
    const checkMembership = () => {
      const memberExists = members?.some(
        (member) => member.name === data?.name
      );

      if (memberExists) {
        setIsMember(true);
      } else {
        setIsMember(false);
      }
    };

    checkMembership();
  }, [data?.name, members]);

  console.log(members?.length);

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
  };
  const inProgress = (id) => {
    toast.promise(startProject(id), {
      loading: "Starting Project...",
      success: "Project In Progress!",
      error: (err) => `${err}`,
    });
  };
  const completed = (id) => {
    toast.promise(finishProject(id), {
      loading: "Completing Project...",
      success: "Project Completed!",
      error: (err) => `${err}`,
    });
  };

  const handleJoin = () => {
    toast.promise(addMembers(data?.name), {
      loading: "Joining...",
      success: "Successful!",
      error: (err) => `${err}`,
    });
  };

  const openForm = () => {
    if (isMember) {
      setShowForm(true);
    } else {
      toast.error("You have to become a memeber first!");
    }
  };

  return (
    <>
      <RootLayout>
        <PageTransition>
          <div className="flex flex-col gap-4">
            <div>
              <Heading>{title}</Heading>
              <p className="text-sub text-display">{description}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowMembers((prev) => !prev)}
                className="btn max-w-[200px] py-2 px-4 rounded-lg bg-lighter inline-flex text-sm font-medium items-center gap-2 border border-line"
              >
                <span>Become member</span>
                <Icon styles={"text-[1.3em]"}>person_add</Icon>
              </button>
              {organization.type === "private" && (
                <button
                  onClick={copyPassKey}
                  className="text-sm flex items-center gap-1"
                >
                  <span>{copy ? "copied" : "Copy Passkey"}</span>
                  <Icon styles={"text-[1.3em]"}>
                    {copy ? "check" : "content_copy"}
                  </Icon>
                </button>
              )}
            </div>
          </div>

          <div className="my-6">
            <div className="line py-4 flex items-center justify-between">
              <h2 className="font-medium font-sora">
                Projects: {projects?.length}
              </h2>
              <button
                onClick={openForm}
                className="btn-primary h-9 px-4 rounded-lg border-b-4 border-[rgba(0,0,0,0.09)]"
              >
                {/* <Icon>add</Icon> */}
                <span>Add New</span>
              </button>
            </div>

            <div className="my-4">
              {!loading && projects.length === 0 && (
                <NoData message="There are no projects here yet! 🤷‍♂️" />
              )}
              <ul className="flex flex-col gap-4">
                {loading && (
                  <>
                    {Array(3)
                      .fill()
                      .map((_, index) => (
                        <Skeleton
                          key={index}
                          style={{
                            minHeight: "90px",
                            borderRadius: "4px",
                          }}
                        />
                      ))}
                  </>
                )}

                {projects.map((project) => {
                  const { $id, projectId, title, status, $updatedAt } = project;

                  return (
                    <>
                      <li
                        key={projectId}
                        className="flex flex-col gap-2 p-2 px-4 bg-lighter border-b border-line rounded pb-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{title}</h3>
                            <p className="text-sub text-sm">
                              {status === "in progress" && "Started at"}{" "}
                              {status === "completed" && "Done at"}{" "}
                              {status === "pending" && "Created at"}:{" "}
                              {new Date($updatedAt).toLocaleString()}
                            </p>
                          </div>

                          {/* display button if user is a member of the organization */}
                          {isMember && (
                            <div onClick={() => handleDelete($id)}>
                              <Icon styles={"text-[1.3em]"}>delete</Icon>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">
                            <span
                              className={`capitalize px-3 rounded-full font-bold border ${
                                status === "completed"
                                  ? "border-green-500 text-green-500 bg-green-500/10"
                                  : status === "in progress"
                                  ? "border-blue-500 text-blue-500 bg-blue-500/10"
                                  : "border-orange-500 text-orange-500 bg-orange-500/10"
                              }`}
                            >
                              {status}
                            </span>
                          </p>
                          {status === "in progress" ? (
                            <button
                              onClick={() => completed($id)}
                              className={`${
                                status === "completed"
                                  ? "hidden"
                                  : "font-semibold flex items-center gap-1 text-sm bg-light py-2 px-4 border border-line rounded-xl"
                              }`}
                            >
                              <span>Task Completed?</span>
                              <Icon styles="text-[1.3em] font-medium text-green-600">
                                check_circle
                              </Icon>
                            </button>
                          ) : (
                            <button
                              onClick={() => inProgress($id)}
                              className={`${
                                status === "completed"
                                  ? "hidden"
                                  : "font-semibold flex items-center text-sm gap-1 bg-light py-2 px-4 border border-line rounded-xl"
                              }`}
                            >
                              <span>Start Task</span>
                              <Icon styles="text-[1.3em] font-medium text-orange-600">
                                check
                              </Icon>
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
            title={`Members: ${members?.length}`}
            toggleModal={() => setShowMembers((prev) => !prev)}
          >
            <div className="my-4">
              {members?.length === 0 && <p>No members yet!</p>}
              <ul className="flex flex-col gap-2">
                {members.map((member) => (
                  <li
                    key={member.memberId}
                    className="font-sora bg-lighter py-3 px-6 border-b border-line"
                  >
                    {member.name}
                  </li>
                ))}
              </ul>
              {!isMember && (
                <button
                  onClick={() => handleJoin(organizationId)}
                  className="btn-primary px-4 h-10 rounded-lg mt-4"
                >
                  <span>Become Member</span>
                  <Icon styles={"text-[1.3em]"}>add</Icon>
                </button>
              )}
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

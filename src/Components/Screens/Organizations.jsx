import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import PageTransition from "../../Layouts/PageTransitions";
import RootLayout from "../../Layouts/RootLayout";
import Heading from "../UI/Heading";
import Search from "../UI/Search";
import Icon from "../UI/Icon";
import Grid from "../UI/Grid";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import { AnimatePresence } from "framer-motion";
import TextArea from "../UI/TextArea";
import Select from "../UI/Select";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useOrganization from "../../Hooks/UseOrganization";
import NoData from "../UI/NoData";
import Footer from "../UI/Footer";

const Organizations = () => {
  const { user } = useAuth();
  const [selectedOrg, setSelectedOrg] = useState(null);
  const handleOrganizationClick = (org) => {
    setSelectedOrg(org);
    setModal(true);
  };
  const { createOrganization, organizations, deleteOrganization } =
    useOrganization();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [form, setForm] = useState({
    title: "",
    type: "public",
    passkey: "",
    description: "",
  });

  const navigate = useNavigate();

  const toggleModal = () => setModal((prev) => !prev);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!form.title) toast.error("Title is required!");
    else if (!form.type) toast.error("Type is required!");
    else if (form.type === "private" && !form.passkey)
      toast.error("Passkey is required!");
    else if (!form.description) toast.error("Description is required!");
    else {
      toast.promise(
        createOrganization(
          form.title,
          form.type,
          form.passkey,
          form.description
        ),
        {
          loading: "Creating Organization...",
          success: () => {
            setShowForm(false);
            setForm({
              title: "",
              type: "public",
              passkey: "",
              description: "",
            });
            return `Organization created successfully!`;
          },
          error: (err) => {
            return `${err}`;
          },
        }
      );
    }
  };

  const handleOpen = async () => {
    if (selectedOrg.type === "private" && selectedOrg.passKey !== passkey) {
      toast.error("Incorrect passkey!");
    } else {
      setModal(false);
      navigate(`/organizations/${selectedOrg.organizationId}/projects`, {
        state: { organization: selectedOrg },
      });
    }
  };

  const filteredOrganizations = organizations?.filter((org) =>
    org.title.toLowerCase().includes(search.toLowerCase())
  );

  const options = [
    { label: "Public", value: "public" },
    { label: "Private", value: "private" },
  ];

  const handleDelete = (id) => {
    toast.promise(deleteOrganization(id), {
      loading: "Deleting Organization...",
      success: "Organization Deleted!",
      error: (err) => `${err}`,
    });
  };

  return (
    <>
      <PageTransition>
        <RootLayout>
          <Heading>Hi, {user?.name} 👋</Heading>
          <Search search={search} setSearch={setSearch} />

          <div className="my-6">
            <div className="line py-4 flex items-center justify-between">
              <h2 className="font-medium">Organizations</h2>
              <button
                onClick={() => setShowForm((prev) => !prev)}
                className="btn-primary h-9 px-4 rounded-lg border-b-4 border-[rgba(0,0,0,0.09)]"
              >
                {/* <Icon>add</Icon> */}
                <span>Add New</span>
              </button>
            </div>

            {filteredOrganizations?.length === 0 && <NoData message="" />}
            <Grid>
              {filteredOrganizations?.map((item) => {
                const { $id, organizationId, title, type, creatorId } = item;

                return (
                  <div
                    key={organizationId}
                    className="bg-lighter relative hover:border-primary duration-200 p-6 rounded-2xl border border-line cursor-pointer"
                  >
                    {creatorId === user?.$id && (
                      <div
                        onClick={() => handleDelete($id)}
                        className="absolute z-10 top-3 right-3"
                      >
                        <Icon styles="text-[1.3em] cursor-pointer text-sub">
                          delete
                        </Icon>
                      </div>
                    )}
                    <div className="min-h-[150px] flex flex-col gap-10 justify-between">
                      <div>
                        <h3 className="text-[1.2em] text-wrap flex-1 capitalize font-light font-sora">
                          {title}
                        </h3>
                      </div>

                      <div className="flex items-center flex-row-reverse gap-4 justify-between">
                        <button
                          onClick={() => handleOrganizationClick(item)}
                          className="flex items-center cursor-pointer h-11 px-4 bg-light rounded-lg gap-2 border border-line"
                        >
                          <span>View</span>
                          <Icon styles={"text-[1.3em]"}>open_in_new</Icon>
                        </button>
                        <div>
                          {type === "private" ? (
                            <div className="bg-light text-sm font-medium px-4 border border-line rounded-full py-1 shadow-lg">
                              Private &nbsp;
                              <i className="fa-solid fa-lock text-primary"></i>
                            </div>
                          ) : (
                            <div className="bg-light text-sm font-medium px-4 border border-line rounded-full py-1 shadow-lg">
                              Public &nbsp;
                              <i className="fa-solid fa-earth-africa text-primary"></i>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Grid>
          </div>
          <Footer />
        </RootLayout>
      </PageTransition>

      <AnimatePresence>
        {modal && selectedOrg && (
          <Modal title={`Join ${selectedOrg.title}?`} toggleModal={toggleModal}>
            <div className="flex flex-col gap-6">
              {selectedOrg.type === "private" ? (
                <>
                  <p className="text-sub">
                    This Organization is private and requires a passkey to join.
                  </p>
                  <Input
                    id="passkey"
                    type="password"
                    placeholder="Enter passkey"
                    bg_color="bg-secondary"
                    value={passkey}
                    handleChange={(e) => setPasskey(e.target.value)}
                  />
                  <button
                    className="btn-primary h-10 w-1/2 rounded-lg"
                    onClick={handleOpen}
                  >
                    Verify
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sub">
                    Are you sure you want to view this public organization?
                  </p>
                  <button
                    className="btn-primary h-10 w-1/2 rounded-lg"
                    onClick={handleOpen}
                  >
                    Proceed
                  </button>
                </>
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <Modal
            title="Create Organization"
            toggleModal={() => setShowForm((prev) => !prev)}
          >
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
              <Input
                id="title"
                type="text"
                label="Title"
                bg_color="bg-secondary"
                placeholder="Enter a name for organization"
                value={form.title}
                handleChange={handleInputChange}
              />
              <Select
                id="type"
                label="Type"
                options={options}
                bg_color="bg-secondary"
                value={form.type}
                handleChange={handleInputChange}
              />
              {form.type === "private" && (
                <Input
                  id="passkey"
                  type="password"
                  label="Passkey"
                  bg_color="bg-secondary"
                  placeholder="Enter a passkey for private organization"
                  value={form.passkey}
                  handleChange={handleInputChange}
                />
              )}
              <TextArea
                id="description"
                label="Description"
                bg_color="bg-secondary"
                placeholder="Enter a brief description of organization"
                value={form.description}
                handleChange={handleInputChange}
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

export default Organizations;

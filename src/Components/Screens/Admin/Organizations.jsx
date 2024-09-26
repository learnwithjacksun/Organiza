import { useState } from "react";
import useOrganization from "../../../Hooks/UseOrganization";
import Search from "../../UI/Search";
import Grid from "../../UI/Grid";
import Icon from "../../UI/Icon";
import toast from "react-hot-toast";

const Organizations = () => {
  const [search, setSearch] = useState("");
  const { organizations, deleteOrganization } = useOrganization();

  const filteredOrganizations = organizations?.filter((org) =>
    org.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    toast.promise(deleteOrganization(id), {
      loading: "Deleting Organization...",
      success: "Organization Deleted!",
      error: (err) => `${err}`,
    });
  };

  const [copiedKeys, setCopiedKeys] = useState({}); // Track copy state by organization ID

  const copyPassKey = (id, passkey) => {
    if (passkey) {
      navigator.clipboard.writeText(passkey)
        .then(() => {
          toast.success("Passkey copied to clipboard!");
          setCopiedKeys((prev) => ({ ...prev, [id]: true }));
          setTimeout(() => {
            setCopiedKeys((prev) => ({ ...prev, [id]: false }));
          }, 2000);
        })
        .catch((err) => {
          toast.error(`Failed to copy passkey: ${err}`);
        });
    } else {
      toast.error("No passkey available to copy!");
    }
  };

  return (
    <>
      <div className="line py-4 flex items-center justify-between">
        <h2 className="font-medium">Organizations:</h2>
      </div>
      <div className="my-6">
        <Search search={search} setSearch={setSearch} />
      </div>

      <Grid>
        {filteredOrganizations?.map((item) => {
          const { $id, organizationId, title, type, passKey } = item;

          return (
            <div
              key={organizationId}
              className="bg-lighter relative hover:border-primary duration-200 p-6 rounded-2xl border border-line cursor-pointer"
            >
              <div
                onClick={() => handleDelete($id)}
                className="absolute z-10 top-3 right-3"
              >
                <Icon styles="text-[1.3em] cursor-pointer text-sub">
                  delete
                </Icon>
              </div>
              <div className="min-h-[150px] flex flex-col gap-10 justify-between">
                <div>
                  <h3 className="text-[1.2em] text-wrap flex-1 capitalize font-light font-sora">
                    {title}
                  </h3>
                </div>

                <div className="flex items-center flex-row-reverse gap-4 justify-between">
                  {type === "private" && (<button
                    onClick={() => copyPassKey($id, passKey)}
                    className="flex items-center cursor-pointer h-11 px-4 bg-light rounded-lg gap-2 border border-line"
                  >
                    <span className="text-sm">
                      {copiedKeys[$id] ? "Copied" : "Passkey"}
                    </span>
                    <Icon styles={"text-[1em]"}>
                      {copiedKeys[$id] ? "check" : "content_copy"}
                    </Icon>
                  </button>)}
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
    </>
  );
};

export default Organizations;

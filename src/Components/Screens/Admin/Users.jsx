import useAuth from "../../../Hooks/useAuth";
import Grid from "../../UI/Grid";

const Users = () => {
  const { users } = useAuth();
  return (
    <>
      <div className="line py-4 flex items-center justify-between">
        <h2 className="font-medium">Users:</h2>
      </div>
      <Grid>
        {users.map((user) => (
          <div
            key={user?.$id}
            className="flex items-center gap-4 p-2 px-4 bg-lighter border-b border-line rounded pb-4"
          >
            <div className="h-10 w-10 rounded-full overflow-hidden flex-center text-white">
              <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${user?.name}`}
                alt="Avatar"
              />
            </div>
            <div>
              <h2>{user?.name}</h2>
              <p className="text-sub text-sm">{user?.email}</p>
            </div>
          </div>
        ))}
      </Grid>
    </>
  );
};

export default Users;

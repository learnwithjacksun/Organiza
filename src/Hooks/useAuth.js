import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthProvider"
import { databases, storage } from "../Libs/appwrite"
import { ID } from "appwrite"


const useAuth = () => {
    const {getUserData, user, data, register, users, login, logout } = useContext(AuthContext)

    const uploadProfilePic = async (image) => {
        try {
          if (data?.image) {
            await storage.deleteFile("images", data?.image);
          }
    
          const newFile = await storage.createFile("images", ID.unique(), image);
          const newFileId = newFile.$id;
    
          await databases.updateDocument(
            "twcdb", 
            "users", 
            user?.$id, 
            {
              image: newFileId,
            }
          );
    
          await getUserData(user.$id);
    
        } catch (error) {
          console.log("Upload Profile Pic Error:", error);
        }
      };
    return {
        user,
        data,
        register,
        users,
        login,
        logout,
        getUserData,
        uploadProfilePic
    }
}

export default useAuth
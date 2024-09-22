import { ID } from "appwrite";
import { databases } from "../Libs/appwrite";
import useAuth from "./useAuth";
import { useCallback, useEffect, useState } from "react";

const UseOrganization = (organizationId) => {
    const { user, data } = useAuth()
    const [projects, setProjects] = useState([])
    const [organizations, setOrganizations] = useState(null)

    const createOrganization = async (title, type, passkey, description) => {
        try {
            await databases.createDocument(
                "organizadb",
                "organizations",
                ID.unique(),
                {
                    title,
                    type,
                    passKey: passkey,
                    description,
                    organizationId: ID.unique(),
                    creatorId: user?.$id,
                    creatorName: data?.name,
                    members: [data?.name]
                }
            )
            fetchOrganizations()
        } catch (error) {
            console.log("Create Organization:", error);
            throw new Error(error.message)
        }
    }

    const fetchOrganizations = async () => {
        try {
            const res = await databases.listDocuments(
                "organizadb",
                "organizations",
            )
            setOrganizations(res.documents.reverse())
            console.log(res.documents);
        } catch (error) {
            console.log("Fetch Organizations:", error);
            throw new Error(error.message)
        }
    }

    const deleteOrganization = async (id) => {
        try {
            await databases.deleteDocument(
                "organizadb",
                "organizations",
                id
            )
            fetchOrganizations()
        } catch (error) {
            console.log("Delete Organization:", error);
            throw new Error(error.message)
        }
    }

    useEffect(() => {
        fetchOrganizations()
    }, [])

    const joinOrganization = async (id) => {
        try {
            const orgDoc = await databases.getDocument("organizadb", "organizations", id);
            
            const isMember = orgDoc.members.includes(data?.name);
            if (isMember) {
                console.log("User already exists in the organization");
            }
    
            const updatedMembers = [...orgDoc.members, data?.name];
            await databases.updateDocument("organizadb", "organizations", id, {
                members: updatedMembers,
            });
    
            console.log("User joined the organization successfully");
            fetchOrganizations();
    
        } catch (error) {
            console.error("Join Organization:", error.message);
            throw new Error(error.message);
        }
    };
    



    const fetchProjects = useCallback(async () => {
        try {
            const allProjects = await databases.listDocuments("organizadb", "projects")
            const projects = allProjects.documents.filter(project => project.projectId === organizationId)
            setProjects(projects.reverse())
            console.log(projects);
        } catch (error) {
            console.log("Fetch Projects:", error);
            throw new Error(error.message)
        }
    }, [organizationId])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    const createProjects = async (title) => {
        try {
            await databases.createDocument(
                "organizadb",
                "projects",
                ID.unique(),
                {
                    title,
                    projectId: organizationId,
                }
            )
            fetchProjects()
        } catch (error) {
            console.log("Create Projects:", error);
            throw new Error(error.message)
        }
    }

    const deleteProject = async (id) => {
        try {
            await databases.deleteDocument(
                "organizadb",
                "projects",
                id
            )
            fetchProjects()
        } catch (error) {
            console.log("Delete Projects:", error);
            throw new Error(error.message)
        }
    }

    const startProject = async (id) => {
        try {
            await databases.updateDocument(
                "organizadb",
                "projects",
                id,
                {
                    status: "in progress"
                }
            )
            fetchProjects()
        } catch (error) {
            console.log("Start Projects:", error);
            throw new Error(error.message)
        }
    }
    const finishProject = async (id) => {
        try {
            await databases.updateDocument(
                "organizadb",
                "projects",
                id,
                {
                    status: "completed"
                }
            )
            fetchProjects()
        } catch (error) {
            console.log("Start Projects:", error);
            throw new Error(error.message)
        }
    }

    return { createOrganization, organizations, deleteOrganization, createProjects, projects, deleteProject, startProject, finishProject, joinOrganization }
}

export default UseOrganization
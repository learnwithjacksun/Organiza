import { ID } from "appwrite";
import { databases } from "../Libs/appwrite";
import useAuth from "./useAuth";
import { useCallback, useEffect, useState } from "react";

const useOrganization = (organizationId) => {
    const { user } = useAuth()
    const [projects, setProjects] = useState([])
    const [members, setMember] = useState([])
    const [organizations, setOrganizations] = useState(null)
    const [loading, setLoading] = useState(false)

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
                    creatorName: user?.name,
                }
            )
            fetchOrganizations()
        } catch (error) {
            console.log("Create Organization:", error);
            throw new Error(error.message)
        }
    }

    const fetchOrganizations = async () => {
        setLoading(true)
        try {
            const res = await databases.listDocuments(
                "organizadb",
                "organizations",
            )
            setOrganizations(res.documents.reverse())
            console.log(res.documents);
            setLoading(false)
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

    const addMembers = async (name) => {
        try {
            await databases.createDocument(
                "organizadb",
                "members",
                ID.unique(),
                {
                    memberId: organizationId,
                    name
                }
            )
            fetchMembers()
        } catch (error) {
            console.log("Add members:", error);
            throw new Error(error.message)
        }
    }

    const fetchMembers = useCallback(async () => {
        try {
            const res = await databases.listDocuments(
                "organizadb",
                "members"
            )
            const organizationMembers = res.documents.filter(member => member.memberId === organizationId)
            setMember(organizationMembers)
            console.log(organizationMembers);
        } catch (error) {
            console.log("Fetch members:", error);
            throw new Error(error.message)
        }
    }, [organizationId])

    useEffect(() => {
        fetchMembers()
    }, [fetchMembers])




    const fetchProjects = useCallback(async () => {
        setLoading(true)
        try {
            const allProjects = await databases.listDocuments("organizadb", "projects")
            const projects = allProjects.documents.filter(project => project.projectId === organizationId)
            setProjects(projects.reverse())
            console.log(projects);
            setLoading(false)
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

    return {loading, createOrganization, organizations, deleteOrganization, createProjects, projects, deleteProject, startProject, finishProject, addMembers, members }
}

export default useOrganization
'use client'

import { useEffect, useState } from 'react'

interface User {
    user_id: number
    username: string
    email: string
    role: string
}

async function getUsers(): Promise<User[]> {
    const res = await fetch('http://localhost:8080/api/users')
    if (!res.ok) {
        throw new Error('Failed to fetch users')
    }
    return res.json()
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchUsers() {
            try {
                const fetchedUsers = await getUsers()
                setUsers(fetchedUsers)
                setIsLoading(false)
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
                setError(errorMessage)
                setIsLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <ul className="space-y-2">
                {users.map(user => (
                    <li key={user.user_id} className="bg-white p-4 rounded shadow">
                        <strong>{user.username}</strong> - {user.email} ({user.role})
                    </li>
                ))}
            </ul>
        </div>
    )
}
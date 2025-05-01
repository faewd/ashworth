import { useEffect, useState } from "react"
import { IUser } from "../models/user"

export default function useUser() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | Record<string, unknown> | null>(null)
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    setIsLoading(true)
    fetch("/api/user")
      .then(async res => {
        if (res.ok) return res.json()
        throw await res.json()
      })
      .then(data => {
        setUser(data)
        setError(null)
      })
      .catch(err => {
        setUser(null)
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { user, isLoading, error }
}

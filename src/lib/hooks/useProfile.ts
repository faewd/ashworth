import { useEffect, useState } from "react"
import { Profile } from "../service/user"

export default function useProfile() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | Record<string, unknown> | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    setIsLoading(true)
    fetch("/api/profile")
      .then(async res => {
        if (res.ok) return res.json()
        throw await res.json()
      })
      .then(data => {
        setProfile(data)
        setError(null)
      })
      .catch(err => {
        setProfile(null)
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { profile, isLoading, error }
}

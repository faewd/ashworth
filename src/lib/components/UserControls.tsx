"use client"

import Button from "./Button"
import Image from "next/image"
import { LogIn, LogOut, Plus } from "lucide-react"
import useUser from "@/lib/hooks/useUser"
import Spinner from "./Spinner"
import AddModal from "./AddModal"
import { useModal } from "@/lib/context/modalContext"
import Link from "next/link"

export default function UserControls() {
  const { user, isLoading } = useUser()
  const modal = useModal()

  if (isLoading) {
    return <Spinner />
  }

  if (!user) {
    return <Button href="/auth/login" icon={LogIn}>Sign in</Button>
  }

  function handleAdd() {
    modal.show(<AddModal />, "Create")
  }

  return (
    <>
      <Button onClick={handleAdd} icon={Plus} color="success" ghost iconProps={{ size: 24 }} className="p-1 mr-2" />

      <Link href="/" className="flex items-center gap-2 h-full transition-colors px-2 hover:bg-indigo-500/20">
        <Image src={user.picture ?? `https://placehold.co/48x48?text=${user.name?.charAt(0)}`} alt="Your profile picture" width={32} height={32} className="rounded-lg" />
        <span>{user.name}</span>
      </Link>
      <Button href="/auth/logout" color="error" ghost icon={LogOut} />
    </>
  )
}

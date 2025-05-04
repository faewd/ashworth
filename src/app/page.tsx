"use client"

import Button from "@/lib/components/Button"
import CreateCharacterModal from "@/lib/components/CreateCharacterModal"
import Heading from "@/lib/components/Heading"
import Spinner from "@/lib/components/Spinner"
import { useModal } from "@/lib/context/modalContext"
import useProfile from "@/lib/hooks/useProfile"
import { ISheet } from "@/lib/sheet/sheet"
import cx from "@/lib/util/cx"
import { LogOut, MoveRight, Plus, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {

  const { profile, isLoading } = useProfile()
  const modal = useModal()

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (profile === null) {
    return (
      <div className="p-8 flex items-center justify-center">
        <p>Sign in to view and create characters.</p>
      </div>
    )
  }

  function handleCreateCharacter() {
    modal.show(<CreateCharacterModal />, "Create Character")
  }

  return (
    <div className="flex justify-center pt-8">
      <div className="w-[600px]">
        <div className="flex gap-4 items-start">
          <div className="flex flex-col items-center">
            <Image src={profile.picture} alt="Your profile picture" width={128} height={128} className="rounded-lg" />
            <Heading rank={2} className="text-xl mt-2 mr-2">
              <User className="inline mr-2 align-text-top text-indigo-300" />
              <span>{profile.name}</span>
            </Heading>
            <hr className="border-b-2 w-full rounded border-zinc-700 mt-8 mb-2" />
            <Button href="/auth/logout" icon={LogOut} color="error" ghost>Sign Out</Button>
          </div>
          <div className="grow bg-zinc-950 rounded-lg p-4">
            <Heading rank={3} className="mb-3">Characters</Heading>
            {profile.characters.length === 0 ? (
              <>
                <p>You haven&apos;t created any characters yet.</p>
                <Button onClick={handleCreateCharacter} icon={Plus} iconProps={{ size: 24 }} className="mt-4">
                  Create Character
                </Button>
              </>
            ) : (
              <ul>
                {profile.characters.map(char => (
                  <li key={char.id}>
                    <CharacterLink char={char} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CharacterLink({ char }: { char: ISheet }) {
  const [navigating, setNavigating] = useState(false)
  const router = useRouter()
  
  function handleClick() {
    setNavigating(true)
    router.push(`/sheet/${char.id}/${char.name}`)
  }

  return (
    <button
      role="link"
      onClick={handleClick}
      className={cx("group w-full cursor-pointer bg-zinc-900 rounded p-2 mb-1 block transition-colors hover:bg-zinc-800 flex justify-between items-center", { "bg-zinc-800 ": navigating })}
    >
      <div className="text-left leading-5">
        <Heading rank={3} className="text-md">{char.name}</Heading>
        <span className="italic text-sm text-zinc-400">Lvl. {char.level} {char.species} {char.class}</span>
      </div>
      { navigating
        ? <Spinner color="primary" className="mr-1" />
        : <MoveRight className="text-zinc-600 mr-1 group-hover:mr-0 group-hover:text-indigo-300 transition-all" />
      }
    </button>
  )
}

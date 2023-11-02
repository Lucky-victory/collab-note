'use client'
import AvatarStack from '@/components/AvatarStack'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useMemo} from "react";
import { useMembers, useSpace } from '@ably/spaces/react'
import { Types } from 'ably'
import { getSpaceNameFromUrl } from '@/helpers'
import { useSearchParams } from 'next/navigation'
// import LiveCursors from '@/components/LiveCursors'
import { MemberCursors, YourCursor } from "@/components/Cursors";

import type { Member } from "@/types";

export default function Home() {
  const s=useSearchParams()
  const [noteTitle,setNoteTitle]=useState('')
  const [noteBody,setNoteBody]=useState('')
  const { self } = useMembers();

  const liveCursors = useRef(null);
  
  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();
  useEffect(() => {
   
    space?.channel.subscribe('title',(message:Types.Message)=>{
console.log('here:',{message});
setNoteTitle(message.data.title)

    })
    space?.channel.subscribe('body',(message:Types.Message)=>{

setNoteBody(message.data.body)
    })
    
  }, [space]);

  function handleInputChange(evt:ChangeEvent<HTMLInputElement>){
// setNoteTitle(evt.target.value)
space?.channel.publish('title',{title:evt.target.value})
  }
  function handleTextAreaChange(evt:ChangeEvent<HTMLTextAreaElement>){
// setNoteBody(evt.target.value)
space?.channel.publish('body',{body:evt.target.value})
  }
  return (
    <main className="flex flex-col gap-4 bg-gray-200 min-h-screen px-2 py-2">
      <div className="h-[70px] bg-white shadow-sm rounded-md">
<AvatarStack/>
      </div>
      <div className="relative" 
      id="live-cursors"
      ref={liveCursors} 
      >
      <YourCursor self={self as Member | null} parentRef={liveCursors} />
      <MemberCursors />
     <div className="flex gap-5 flex-1 h-full z-10 relative">
      {/* <LiveCursors/> */}
{/* <div className="flex flex-col  min-w-[250px] px-3 py-4">

</div> */}
<div className="flex flex-col px-3 gap-5 rounded-md bg-white w-60 flex-1">
  <input value={noteTitle} onChange={handleInputChange} placeholder='Note Title...' type="text" className="px-4 py-3 font-semibold text-2xl border-b-2 border-gray-200 focus:border-black focus:outline-none" />

  <textarea name="" id="" value={noteBody} onChange={handleTextAreaChange}  className="border-2 rounded-md focus:border-black focus:outline-none border-gray-200 flex-1 resize-none px-4 py-3" placeholder='Write something...'></textarea>
</div>
     
     </div>
      </div>
         </main>
  )
}

"use client"
import useWebSocket from "@/hooks/UseWebsockets";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useState } from "react";

export default function Page() {
  const { sendMessage, messages }=useWebSocket("ws://localhost:4001")
  const [value, setValue] = useState("")
  console.log(messages)
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <Input value={value} onChange={(e)=>{setValue(e.target.value)}}/>
        <Button onClick={()=>sendMessage(value)}>Send</Button>
        {
          messages.map((e)=>{
            return(
              <div key={e.msg+e.timestamps+e.from}>
                {
                  e.from=="You"&&<div>
                    <h1>{e.from}</h1>
                    <h1>{e.msg}</h1>
                    <h1>{e.timestamps}</h1>
                  </div>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

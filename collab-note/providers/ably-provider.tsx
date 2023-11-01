import { AblyProvider } from "ably/react";
import Spaces from "@ably/spaces";
import { nanoid } from "nanoid";
import { Realtime } from "ably";
import React from "react";
import { SpacesProviderWrapper } from "./spaces-provider";


const client = new Realtime.Promise({
  clientId: nanoid(),
  key: process.env.NEXT_PUBLIC_ABLY_KEY,
});

const spaces = new Spaces(client);

export function AblyProviderWrapper({children}:{children:React.ReactNode}){

   return <AblyProvider client={client}>
    <SpacesProviderWrapper spaces={spaces}>
{children}
    </SpacesProviderWrapper>
  </AblyProvider>

}
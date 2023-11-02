'use client'
import type Spaces from "@ably/spaces";
import { SpaceProvider, SpacesProvider } from "@ably/spaces/react";

export const SpacesProviderWrapper = ({ spaces,children }: { spaces: Spaces,children:React.ReactNode }) => (
  <SpacesProvider client={spaces}>
    <SpaceProvider name="collab-note">
      {children}
    </SpaceProvider>
  </SpacesProvider>
);
import { useMemo } from "react";
import { useEffect } from "react";
import { useSpace, useMembers } from "@ably/spaces/react";

import Avatars from "./Avatars";
import { getMemberName } from "@/helpers/mock-names";
import { getMemberColor } from "@/helpers/mock-colors";

import type { Member, MemberForAvatar } from "@/types";

import styles from "./AvatarStack.module.css";
import { Types } from "ably";
import { colours } from "@/helpers";

const AvatarStack = () => {
  const name = useMemo(getMemberName, []);
  const memberColor = useMemo(getMemberColor, []);

  /** 💡 Get a handle on a space instance 💡 */
  const { space } = useSpace();
  const userColors = useMemo(
    () => colours[Math.floor(Math.random() * colours.length)],
    [],
  );
  /** 💡 Enter the space as soon as it's available 💡 */
  useEffect(() => {
    console.log({space})
    space?.enter({ name, memberColor,userColors });
    space?.channel.subscribe('update',(message:Types.Message)=>{
console.log({message});

    })
  }, [space]);

  /** 💡 Get everybody except the local member in the space and the local member 💡 */
  const { others, self } = useMembers();

  return (
    <div id="avatar-stack" className={`example-container ${styles.container}`}>
      {/** 💡 Stack of first 5 user avatars including yourself.💡 */}
      <Avatars self={self as MemberForAvatar | null} otherUsers={others as MemberForAvatar[]} />
    </div>
  );
};

export default AvatarStack;
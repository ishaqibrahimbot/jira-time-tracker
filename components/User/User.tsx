import { FC, useState, useEffect } from "react";
import { User } from "../../types";
import Image from "next/image";

export interface UserProps {
  user: User;
}

const User: FC<UserProps> = ({ user }) => {
  return (
    <div className="flex flex-row space-x-2 items-center">
      <div>
        {user?.avatarUrls?.["48x48"] && (
          <Image
            src={user.avatarUrls?.["48x48"]}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
      </div>
      <h3>{user?.displayName}</h3>
    </div>
  );
};

export default User;

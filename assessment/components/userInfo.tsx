import Image from "next/image";

interface GitHubUserInfoProps {
  userData: any;
}

export const GitHubUserInfo = ({ userData }: GitHubUserInfoProps) => {
  return (
    <div className="mt-4 text-center flex flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-2">
        <Image
          src={userData.avatar_url}
          alt={`${userData.login}'s avatar`}
          className="rounded-full mx-auto"
          width={50}
          height={50}
        />
        <h2 className="text-xl font-bold text-black-300 font-sans dark:text-white">
          {userData.login}
        </h2>
      </div>

      <ul className="flex flex-col items-center justify-center gap-2">
        <li className="text-black-300 font-sans dark:text-white w-[80%]">
          {userData.bio}
        </li>
        <li className="text-black-300 font-sans dark:text-white">
          Repositories: {userData.public_repos}
        </li>
        <li className="text-black-300 font-sans dark:text-white">
          Location: {userData.location}
        </li>
        <li className="text-black-300 font-sans dark:text-white">
          Followers: {userData.followers}
        </li>
        <li className="text-black-300 font-sans dark:text-white">
          Following: {userData.following}
        </li>
      </ul>
    </div>
  );
};

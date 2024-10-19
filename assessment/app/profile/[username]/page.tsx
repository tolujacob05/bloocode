// import { GetServerSideProps, GetServerSidePropsContext } from "next";
// import Image from "next/image";

import { GitHubUserData, GitHubUserInfo } from "./userInfo";

// interface GitHubUserInfoProps {
//   userData: {
//     avatar_url: string;
//     login: string;
//     bio: string;
//     public_repos: string;
//     location: string;
//     followers: string;
//     following: string;
//   };
// }

// export const GitHubUserInfo = ({ userData }: GitHubUserInfoProps) => {
//   return (
//     <div className="mt-4 text-center flex flex-col items-center justify-center gap-5">
//       <div className="flex items-center gap-2">
//         <Image
//           src={userData.avatar_url}
//           alt={`${userData.login}'s avatar`}
//           className="rounded-full mx-auto"
//           width={50}
//           height={50}
//         />
//         <h2 className="text-xl font-bold text-black-300 font-sans dark:text-white">
//           {userData.login}
//         </h2>
//       </div>

//       <ul className="flex flex-col items-center justify-center gap-2">
//         <li className="text-black-300 font-sans dark:text-white w-[80%]">
//           {userData.bio}
//         </li>
//         <li className="text-black-300 font-sans dark:text-white">
//           Repositories: {userData.public_repos}
//         </li>
//         <li className="text-black-300 font-sans dark:text-white">
//           Location: {userData.location}
//         </li>
//         <li className="text-black-300 font-sans dark:text-white">
//           Followers: {userData.followers}
//         </li>
//         <li className="text-black-300 font-sans dark:text-white">
//           Following: {userData.following}
//         </li>
//       </ul>
//     </div>
//   );
// };

// // Server-side rendering function
// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   // Check if context.params is defined and has the username parameter
//   if (!context.params || !context.params.username) {
//     return {
//       notFound: true, // Show 404 page if username is missing
//     };
//   }

//   const { username } = context.params;

//   try {
//     // Fetch profile data here (e.g., from an external API or database)
//     const res = await fetch(`https://api.github.com/users/${username}`);

//     // Handle non-200 responses
//     if (!res.ok) {
//       throw new Error("Failed to fetch user data");
//     }

//     const userData = await res.json();

//     // Handle the case where the user does not exist
//     if (!userData) {
//       return {
//         notFound: true, // Next.js will show a 404 page if no data is found
//       };
//     }

//     return {
//       props: {
//         userData, // Pass the data as props to the component
//       },
//     };
//   } catch (error) {
//     // Handle errors more gracefully (e.g., log them and return a custom error page)
//     console.error(error);
//     return {
//       notFound: true, // Or you can return a custom error page with error message
//     };
//   }
// };

interface Params {
  params: {
    username: string;
  };
}

const GitHubUserPage = async ({ params }: Params) => {
  const { username } = params;

  // Fetch user data on the server
  const res = await fetch(`https://api.github.com/users/${username}`);

  // Handle response
  if (!res.ok) {
    return <div>User not found.</div>;
  }

  const userData: GitHubUserData = await res.json();

  // Pass the fetched data to the client component
  return <GitHubUserInfo userData={userData} />;
};

export default GitHubUserPage;

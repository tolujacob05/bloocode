import { GetServerSideProps, GetServerSidePropsContext } from "next";
// import Image from "next/image";
import { GitHubUserInfo } from "./userInfo";

// import { GitHubUserData, GitHubUserInfo } from "./userInfo";

interface GitHubUserInfoProps {
  userData: {
    avatar_url: string;
    login: string;
    bio: string;
    public_repos: string;
    location: string;
    followers: string;
    following: string;
  };
}

const ProfilePage = ({ userData }: GitHubUserInfoProps) => {
  return (
    <div>
      <h1>{userData.login}&apos;s Profile</h1>
      <GitHubUserInfo userData={userData} />
    </div>
  );
};

// Server-side rendering function
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Check if context.params is defined and has the username parameter
  if (!context.params || !context.params.username) {
    return {
      notFound: true, // Show 404 page if username is missing
    };
  }

  const { username } = context.params;

  try {
    // Fetch profile data here (e.g., from an external API or database)
    const res = await fetch(`https://api.github.com/users/${username}`);

    // Handle non-200 responses
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await res.json();

    // Handle the case where the user does not exist
    if (!userData) {
      return {
        notFound: true, // Next.js will show a 404 page if no data is found
      };
    }

    return {
      props: {
        userData, // Pass the data as props to the component
      },
    };
  } catch (error) {
    // Handle errors more gracefully (e.g., log them and return a custom error page)
    console.error(error);
    return {
      notFound: true, // Or you can return a custom error page with error message
    };
  }
};

export default ProfilePage;

// interface Params {
//   params: {
//     username: string;
//   };
// }

// const GitHubUserPage = async ({ params }: Params) => {
//   const { username } = params;

//   // Fetch user data on the server
//   const res = await fetch(`https://api.github.com/users/${username}`);

//   // Handle response
//   if (!res.ok) {
//     return <div>User not found.</div>;
//   }

//   const userData: GitHubUserData = await res.json();

//   // Pass the fetched data to the client component
//   return <GitHubUserInfo userData={userData} />;
// };

// export default GitHubUserPage;

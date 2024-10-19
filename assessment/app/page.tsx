"use client";

import { useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SearchForm } from "@/components/search";
import { RepositoriesTable } from "@/components/repo";
import { PaginationComponent } from "@/components/pagination";
import ThemeSwitcher from "@/components/theme";
import { GitHubUserInfo } from "./profile/[username]/userInfo";

interface GitHubUserInfoProps {
  avatar_url: string;
  login: string;
  bio: string;
  public_repos: string;
  location: string;
  followers: string;
  following: string;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<GitHubUserInfoProps | null>(null);
  const [reposData, setReposData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 10;

  const fetchGitHubUser = async () => {
    if (!username) {
      setError("Please enter a GitHub username.");
      setUserData(null);
      setReposData([]);
      return;
    }

    setLoading(true);
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    if (!token) {
      setError("GitHub token is not set.");
      return;
    }

    try {
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: { Authorization: `token ${token}` },
        }
      );

      // Handle rate limit <--- get rate limit headers from GitHub api rate limit headers
      const rateLimitRemaining = userResponse.headers["x-ratelimit-remaining"];
      const rateLimitReset = userResponse.headers["x-ratelimit-reset"];

      if (rateLimitRemaining === "0") {
        const resetTime = rateLimitReset * 1000; // Convert to milliseconds
        const timeUntilReset = new Date(resetTime).toLocaleTimeString();

        setError(`Rate limit exceeded. Try again after ${timeUntilReset}.`);
        return;
      }

      setUserData(userResponse.data);
      setError(null);

      await fetchAllRepositories(username, token);
    } catch (err) {
      console.log(err);
      setError("Wrong username or user does not exist.");
      setUserData(null);
      setReposData([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch all repositories with pagination
  const fetchAllRepositories = async (username: string, token: string) => {
    let page = 1;
    let allRepos: any[] = [];
    let moreDataAvailable = true;

    while (moreDataAvailable) {
      try {
        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
            params: {
              per_page: 30, // Fetch 30 repos per request
              page,
            },
          }
        );

        console.log(reposResponse.data);

        // Append the current page of repos to allRepos
        allRepos = [...allRepos, ...reposResponse.data];

        // Check if there's more data available (if less than 30 repos were returned, we know we're done)
        if (reposResponse.data.length < 30) {
          moreDataAvailable = false;
        }

        page++; // Move to the next page
      } catch (err) {
        console.log(err);
        setError("Error fetching repositories.");
        moreDataAvailable = false;
      }
    }

    setReposData(allRepos); // Update state with all repositories
  };

  // Handle pagination click
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleBackClick = () => {
    setUserData(null); // Reset user data to show search form again
    setUsername(""); // Optionally reset the username input
    setReposData([]); // Clear repos data if desired
    setError(null); // Clear error message if any
    setCurrentPage(1); // Reset pagination if needed
  };

  // Get current repos for the page
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = reposData.slice(indexOfFirstRepo, indexOfLastRepo);

  const totalPages = Math.ceil(reposData.length / reposPerPage);

  return (
    <>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="relative flex flex-col gap-4 items-center justify-center px-4 w-full max-w-6xl mx-auto"
        >
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <div className="absolute top-4 right-4">
              {" "}
              {/* Positioning the ThemeSwitcher */}
              <ThemeSwitcher />
            </div>

            {!userData && (
              <SearchForm
                username={username}
                setUsername={setUsername}
                onSearch={fetchGitHubUser}
              />
            )}

            {loading && (
              <div className="flex flex-col items-center mt-4">
                <Spinner />
              </div>
            )}

            {userData && (
              <>
                <GitHubUserInfo userData={userData} />
                <button
                  onClick={handleBackClick}
                  className="font-sans mt-4 p-2 bg-blue-500 text-white rounded"
                >
                  Back to Search
                </button>
              </>
            )}

            {reposData.length > 0 && (
              <div className="mt-4 w-full overflow-auto max-w-full">
                <RepositoriesTable
                  repos={currentRepos}
                  totalRepos={reposData.length}
                />
                {totalPages > 1 && (
                  <PaginationComponent
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageClick={handlePageClick}
                  />
                )}
              </div>
            )}

            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </motion.div>
      </AuroraBackground>
    </>
  );
}

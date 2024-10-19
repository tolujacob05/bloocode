// components/RepositoriesTable.tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface RepositoriesTableProps {
  repos: any[];
  totalRepos: number;
}

export const RepositoriesTable = ({
  repos,
  totalRepos,
}: RepositoriesTableProps) => {
  return (
    <div>
      <Table>
        <TableCaption>Your GitHub Repositories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-sans text-black dark:text-white">
              Name of Repo
            </TableHead>
            <TableHead className="font-sans text-black dark:text-white">
              Description
            </TableHead>
            <TableHead className="font-sans text-black dark:text-white">
              Forks
            </TableHead>
            <TableHead className="font-sans text-black dark:text-white">
              Stars
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-black-300 dark:text-slate-300 font-sans">
          {repos.map((repo) => (
            <TableRow key={repo.id}>
              <TableCell className="font-medium text-blue-500 underline">
                <Link
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </Link>
              </TableCell>
              <TableCell>{repo.description || "No description"}</TableCell>
              <TableCell>{repo.forks_count}</TableCell>
              <TableCell className="text-right">
                {repo.stargazers_count}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={3}
              className="font-sans text-black-300 dark:text-slate-300"
            >
              Total Repositories
            </TableCell>
            <TableCell className="text-right text-black-300 dark:text-slate-300">
              {totalRepos}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  username: string;
  setUsername: (value: string) => void;
  onSearch: () => void;
}

export const SearchForm = ({
  username,
  setUsername,
  onSearch,
}: SearchFormProps) => {
  return (
    <div className="flex justify-center w-full items-center space-x-2">
      <Input
        type="text"
        placeholder="GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-black dark:text-white"
      />
      <Button onClick={onSearch}>Search</Button>
    </div>
  );
};

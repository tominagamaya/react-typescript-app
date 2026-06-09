import { Search } from "lucide-react";

/**
 * 絞り込み検索コンポーネント
 */
export function SearchInput({
  handleSearch,
}: {
  handleSearch: (searchText: string) => void;
}) {
  return (
    <div className="flex items-center min-w-[160px] gap-1">
      <Search color="grey" size={20} />
      <input
        type="text"
        className="min-w-[160px] border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
        autoComplete={"on"}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="絞り込み検索"
      />
    </div>
  );
}

import SearchIcon from "assets/icons/Search.svg";

interface SearchbarProps {
  placeholder: string;
  onChange: (search: string) => void;
  submitFn?: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function Searchbar({
  placeholder,
  onChange,
  submitFn,
  inputRef,
}: Readonly<SearchbarProps>) {
  return (
    <div className="border border-gray-light rounded-sm flex items-center py-2 pr-3">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="placeholder:text-placeholder placeholder:font-inter placeholder:font-normal font-inter font-normal text-sm text-blue-dark bg-transparent outline-none py-[5px] px-3 flex-1"
        onKeyUp={(event) => {
          if (event.key === "Enter" && submitFn) {
            submitFn();
          }
        }}
        ref={inputRef}
      />
      <button className="outline-none" onClick={submitFn}>
        <SearchIcon />
      </button>
    </div>
  );
}

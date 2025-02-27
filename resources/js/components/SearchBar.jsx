import { useState } from "react";

export default function SearchBar({ onSearch, placeholder = "Search..." }) {
    const [query, setQuery] = useState("");

    function handleSearch(e) {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    }

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleSearch}
            className="border px-4 py-2 rounded-lg shadow-md w-1/3"
        />
    );
}

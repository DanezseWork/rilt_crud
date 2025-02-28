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
            className="border px-4 py-2 rounded-lg shadow-md w-1/3 border-gray-300 focus:border-green-300 focus:ring focus:ring-green-300 focus:outline-none focus:shadow-none"
        />
    );
}

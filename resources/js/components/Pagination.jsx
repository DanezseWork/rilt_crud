import { Link } from "@inertiajs/react";

export default function Pagination({ meta, onPageSizeChange }) {
    if (!meta || !Array.isArray(meta.links)) {
        console.warn("Pagination Error: meta.links is not an array", meta);
        return null;
    }

    return (
        <div className="flex justify-between items-center mt-4">
            {/* Show Entries Picker */}
            <div className="flex items-center gap-1">
                <span className="font-bold text-sm text-gray-300">Show</span>
                <select
                    className="border border-gray-300 text-gray-500 font-bold px-2 py-1 rounded"
                    value={meta.per_page || 10}
                    onChange={(e) => onPageSizeChange(e.target.value)}
                >
                    {[10, 25, 50, 100].map((size) => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                <span className="font-bold text-sm text-gray-300">of</span>
                <span className="font-bold text-sm text-gray-300">{meta.total}</span>
                <span className="font-bold text-sm text-gray-300">entries</span>
            </div>

            {/* Pagination Links */}
            <div className="flex overflow-hidden rounded-lg border border-gray-300">
                {meta.links.map((link, index) => {
                    let label = link.label;

                    // Replace Laravel's "Previous" and "Next" with "<" and ">"
                    if (label.toLowerCase().includes("previous")) label = "<";
                    if (label.toLowerCase().includes("next")) label = ">";

                    return link.url ? (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-4 py-2 border-r border-gray-300 text-md font-bold ${
                                link.active
                                    ? "bg-green-500 text-white font-bold"
                                    : "hover:bg-gray-100 text-gray-500"
                            }`}
                        >
                            {label}
                        </Link>
                    ) : (
                        <span
                            key={index}
                            className="px-4 py-2 text-gray-400 text-md border-r border-gray-300"
                        >
                            {label}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

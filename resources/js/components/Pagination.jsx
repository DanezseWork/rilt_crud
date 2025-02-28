import ReactPaginate from "react-paginate";

export default function Pagination({ meta, onPageSizeChange }) {
    if (!meta || !meta.total || !meta.per_page) {
        console.warn("Pagination Error: Invalid meta data", meta);
        return null;
    }

    const totalPages = meta.last_page;
    const currentPage = meta.current_page - 1; // react-paginate uses 0-based index

    return (
        <div className="flex justify-between items-center mt-4">
            
            {/* Show Entries Picker */}
            <div className="flex items-center gap-1">
                <span className="font-bold text-sm text-gray-300">Show</span>
                <select
                    className="border border-gray-300 text-gray-500 font-bold px-2 py-1 rounded"
                    value={meta.per_page}
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

            {/* Pagination */}
            <ReactPaginate
                previousLabel="‹"
                nextLabel="›"
                breakLabel="..."
                pageCount={totalPages}
                forcePage={currentPage}
                marginPagesDisplayed={1} // Show first & last page numbers
                pageRangeDisplayed={3} // Show 3 pages around the current
                onPageChange={(data) => onPageSizeChange(meta.per_page, data.selected + 1)}

                // Styling classes
                containerClassName="flex items-center border border-gray-300 rounded-lg overflow-hidden"
                pageLinkClassName="flex items-center justify-center px-4 py-2 text-md rounded-md font-bold text-gray-600 hover:bg-gray-100 cursor-pointer w-full h-full"
                activeLinkClassName="bg-green-500 text-white font-bold rounded-md hover:bg-green-500"
                breakClassName="px-3 py-2 text-gray-400"
                previousLinkClassName="flex items-center justify-center rounded-md px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                nextLinkClassName="flex items-center justify-center rounded-md px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                disabledClassName="text-gray-400 cursor-not-allowed"
            />
        </div>
    );
}

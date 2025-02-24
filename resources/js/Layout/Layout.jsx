import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <>
        <header>
            <nav className="bg-green-800 p-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="text-white nav-link">Clients</Link>
                    </li>
                    <li>
                        <Link href="/clients/create" className="text-white nav-link">Create</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main className="container mx-auto p-4">
            {children}
        </main>
        </>
    );
}
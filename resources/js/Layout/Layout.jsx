import { Head, Link } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <>
        <Head>
            <meta head-key="description" name="description" content="This is a practice CRUD application using the React, Inertia, Laravel, and Tailwind stack also known as RILT." />
        </Head>
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
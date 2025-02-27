import { Head, Link, usePage } from "@inertiajs/react";

export default function Layout({ children }) {
    const { url } = usePage();
    return (
        <>
        <Head>
            <meta head-key="description" name="description" content="This is a practice CRUD application using the React, Inertia, Laravel, and Tailwind stack also known as RILT." />
        </Head>
        <header className="bg-green-600 p-4">
            <nav>
                {/* <ul className="flex mx-auto space-x-4">
                    <li>
                        <Link href="/" className="text-white nav-link">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/clients" className="text-white nav-link">Clients</Link>
                    </li>
                    <li>
                        <Link href="/pets" className="text-white nav-link">Pets</Link>
                    </li>
                    <li>
                        <Link href="/schedules" className="text-white nav-link">Schedules</Link>
                    </li>
                    <li>
                        <Link href="/appointments" className="text-white nav-link">Appointments</Link>
                    </li>
                </ul> */}
                 <ul className="flex mx-auto space-x-4 justify-center py-3">
                    {[
                        { name: "Dashboard", path: "/" },
                        { name: "Clients", path: "/clients" },
                        { name: "Pets", path: "/pets" },
                        { name: "Schedules", path: "/schedules" },
                        { name: "Appointments", path: "/appointments" },
                    ].map((item) => {
                        const isActive = item.path === "/" ? url === "/" : url.startsWith(item.path);

                        return (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={`text-white px-3 py-2 rounded-md transition ${
                                        isActive ? "bg-green-700 text-green-600 font-bold" : "hover:bg-green-700"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
        <main className="container mx-auto p-4">
            {children}
        </main>
        </>
    );
}
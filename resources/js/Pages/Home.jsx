import { Head, Link, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Eye, Trash2, Pencil } from "lucide-react"

export default function Home({ clients }) {

    const { delete:destroy } = useForm();
    const { flash } = usePage().props;
    const [message, setMessage] = useState(flash?.message || '');
    const { component } = usePage();

    function submit(e, id) {
        e.preventDefault()
        destroy(`/clients/${id}`, {
            preserveScroll: true,
        });
    }

    useEffect(() => {
        if (flash?.message) {
            setMessage(flash.message);
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer); // Cleanup function to avoid memory leaks
        }
    }, [flash?.message]);

    return (
        <>
            <Head title={component} />
            <h1 className="title">Clients</h1>

            {message && <div className="bg-green-500 text-white p-2 rounded-xl">{message}</div>}

            <table className="w-full">
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Date Joined</th>
                        <th className="w-1/8 p-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {clients.data.map((client) => (
                    <tr key={client.id} className="p-4 border-b">
                        <td>{client.body}</td>
                        <td>
                            <div className="text-sm font-light flex flex-col">
                                <span>Member since:</span>
                                <span>{new Date(client.created_at).toDateString()}</span>
                                <span>{new Date(client.created_at).toLocaleTimeString()}</span>
                            </div>
                        </td>
                        {/* <td className="w-1/8 p-2">
                            <div className="flex flex-col gap-2 text-center">
                                <Link href={`/clients/${client.id}`} className="text-green-300 font-bold">Show...</Link>
                                <form onSubmit={(e) => submit(e, client.id)} >
                                    <button className="text-red-400 font-bold">Delete</button>
                                </form>
                                <Link href={`/clients/${client.id}/edit`} className="text-blue-400 font-bold">Edit</Link>
                            </div>
                        </td> */}
                        <td className="w-1/8 p-2">
                            <div className="flex gap-2 justify-center">
                                {/* Show Icon */}
                                <Link href={`/clients/${client.id}`} className="text-green-300">
                                    <Eye className="w-5 h-5 mx-auto" />
                                </Link>

                                {/* Delete Icon */}
                                <form onSubmit={(e) => submit(e, client.id)}>
                                    <button className="text-red-400">
                                        <Trash2 className="w-5 h-5 mx-auto" />
                                    </button>
                                </form>

                                {/* Edit Icon */}
                                <Link href={`/clients/${client.id}/edit`} className="text-blue-400">
                                    <Pencil className="w-5 h-5 mx-auto" />
                                </Link>
                            </div>
                        </td>                  
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="my-5 py-3 px-1 rounded-sm w-fit shadow-md">
                {clients.links.map((link) => (
                    link.url ?
                    <Link href={link.url} key={link.label} dangerouslySetInnerHTML={{__html: link.label}} className={`hover:bg-gray-200 mx-[1px] rounded-xl  py-2 px-4 font-semibold text-gray-600 ${link.active ? 'bg-green-500 text-white hover:bg-green-500' : ''}`} />
                    :
                    <span key={link.label} dangerouslySetInnerHTML={{__html: link.label}} className="py-2 px-4 font-semibold text-gray-200" />
                ))}
            </div>
        </>
    );
}
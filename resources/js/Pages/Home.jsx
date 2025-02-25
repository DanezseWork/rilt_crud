import { Head, Link, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

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
            <h1 className="">Clients</h1>

            {message && <div className="bg-green-500 text-white p-2 rounded-xl">{message}</div>}

            {/* Table of clients */}
            <div className="my-5">
                {clients.data.map((client) => (
                    <div key={client.id} className="p-4 border-b">
                        <div className="text-sm font-light flex flex-col">
                            <span>Member since:</span>
                            <span>{new Date(client.created_at).toDateString()}</span>
                            <span>{new Date(client.created_at).toLocaleTimeString()}</span>
                        </div>
                        <p className="font-medium">{client.body}</p>
                        <Link href={`/clients/${client.id}`} className="text-green-300 font-bold">Show...</Link>
                        <form onSubmit={(e) => submit(e, client.id)} >
                            <button className="text-red-400 font-bold">Delete</button>
                        </form>
                        <Link href={`/clients/${client.id}/edit`} className="text-blue-400 font-bold">Edit</Link>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="my-5 py-3 px-1 rounded-2xl border border-gray-500 w-fit shadow-md">
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
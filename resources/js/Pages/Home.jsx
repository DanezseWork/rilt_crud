import { Link } from "@inertiajs/react";


export default function Home({ clients }) {
    console.log(clients);
    return (
        <>
            <h1 className="">Clients</h1>
            <div>
                {clients.data.map((client) => (
                    <div key={client.id} className="p-4 border-b">
                        <div className="text-sm font-light flex flex-col">
                            <span>Member since:</span>
                            <span>{new Date(client.created_at).toDateString()}</span>
                            <span>{new Date(client.created_at).toLocaleTimeString()}</span>
                        </div>
                        <p className="font-medium">{client.body}</p>
                    </div>
                ))}
            </div>
            <div className="my-5 py-2 px-1 rounded-2xl border border-gray-500 w-fit shadow-md">
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
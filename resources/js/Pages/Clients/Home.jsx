import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Eye, Trash2, Pencil, PlusCircle } from "lucide-react";
import Modal from "@/components/Modal";

export default function Home({ clients }) {
    const { delete: destroy } = useForm();
    const { flash } = usePage().props;
    const [message, setMessage] = useState(flash?.message || '');
    const { component } = usePage();

    // State for modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    // Form handling
    const { data, setData, post, put, processing, errors } = useForm({
        name: "",
        email: "",
    });

    useEffect(() => {
        if (flash?.message) {
            setMessage(flash.message);
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.message]);

    // Open modal with type (show, edit, delete, create)
    function openModal(type, client = null) {
        setSelectedClient(client);
        setModalType(type);
        setData("name", client?.name || "");
        setData("email", client?.email || "");
        setData("phone", client?.phone || "");
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedClient(null);
    }

    function submitEdit(e) {
        e.preventDefault();
        put(`/clients/${selectedClient.id}`, { onSuccess: () => closeModal() });
    }

    function submitCreate(e) {
        e.preventDefault();
        post("/clients", { onSuccess: () => closeModal() });
    }

    function submitDelete(e) {
        e.preventDefault();
        destroy(`/clients/${selectedClient.id}`, { preserveScroll: true, onSuccess: () => closeModal() });
    }

    return (
        <>
            <Head title="Clients" />
            <h1 className="text-2xl font-bold text-center my-4">Clients</h1>

            <div className="flex justify-between mb-4">
                <button
                    onClick={() => openModal("create")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 flex items-center gap-2"
                >
                    <PlusCircle className="w-5 h-5" /> Add Client
                </button>
            </div>

            {message && <div className="bg-green-500 text-white p-2 rounded-xl">{message}</div>}

            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="p-5">Client</th>
                        <th className="p-5">Email</th>
                        <th className="p-5">Phone</th>
                        <th className="p-5">Date Joined</th>
                        <th className="p-5 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.data.map((client) => (
                        <tr key={client.id} className="border-b">
                            <td className="p-5">{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td className="p-5">
                                <div className="text-sm text-gray-600">
                                    <span>{new Date(client.created_at).toDateString()}</span>
                                    <br />
                                    <span>{new Date(client.created_at).toLocaleTimeString()}</span>
                                </div>
                            </td>
                            <td className="p-5">
                                <div className="flex gap-2 justify-center">
                                    {/* Show Icon */}
                                    <button onClick={() => openModal("show", client)} className="text-green-300">
                                        <Eye className="w-5 h-5 mx-auto" />
                                    </button>

                                    {/* Edit Icon */}
                                    <button onClick={() => openModal("edit", client)} className="text-blue-400">
                                        <Pencil className="w-5 h-5 mx-auto" />
                                    </button>

                                    {/* Delete Icon */}
                                    <button onClick={() => openModal("delete", client)} className="text-red-400">
                                        <Trash2 className="w-5 h-5 mx-auto" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-5">
                {clients.links.map((link) =>
                    link.url ? (
                        <Link
                            href={link.url}
                            key={link.label}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-4 py-2 mx-1 rounded-lg text-gray-700 border ${
                                link.active ? "bg-green-500 text-white" : "hover:bg-gray-200"
                            }`}
                        />
                    ) : (
                        <span key={link.label} dangerouslySetInnerHTML={{ __html: link.label }} className="px-4 py-2 text-gray-400" />
                    )
                )}
            </div>

            {/* Dynamic Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === "show" ? "Client Details" : modalType === "edit" ? "Edit Client" : modalType === "delete" ? "Delete Client" : "Add Client"}>
                {modalType === "show" && selectedClient && (
                    <div>
                        <p className="font-medium">{selectedClient.name}</p>
                        <p className="text-sm font-light">{selectedClient.email}</p>
                        <p className="text-sm font-light">{selectedClient.phone}</p>
                        <div className="text-sm text-gray-500">
                            Joined: {new Date(selectedClient.created_at).toDateString()} at {new Date(selectedClient.created_at).toLocaleTimeString()}
                        </div>
                    </div>
                )}

                {modalType === "edit" && selectedClient && (
                    <form onSubmit={submitEdit} className="flex flex-col">
                        <input className="border p-2 rounded" placeholder="Name" type="text" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                        <input className="border p-2 rounded" placeholder="Email" type="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
                        <input className="border p-2 rounded" placeholder="Phone Number" type="tel" value={data.phone} onChange={(e) => setData("phone", e.target.value)} />
                        <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>
                            Update
                        </button>
                    </form>
                )}

                {modalType === "create" && (
                    <form onSubmit={submitCreate} className="flex flex-col gap-2">
                        <input className="border p-2 rounded" placeholder="Name" type="text" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                        <input className="border p-2 rounded" placeholder="Email" type="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
                        <input className="border p-2 rounded" placeholder="Phone Number" type="tel" value={data.phone} onChange={(e) => setData("phone", e.target.value)} />
                        <button type="submit" className="mt-2 bg-green-600 text-white px-4 py-2 rounded" disabled={processing}>
                            Add
                        </button>
                    </form>
                )}

                {modalType === "delete" && selectedClient && (
                    <div>
                        <p>Are you sure you want to delete this client?</p>
                        <button onClick={submitDelete} className="bg-red-600 text-white px-4 py-2 rounded mt-2">
                            Delete
                        </button>
                    </div>
                )}
            </Modal>
        </>
    );
}

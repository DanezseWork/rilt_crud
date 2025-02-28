import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Eye, Trash2, Pencil, PlusCircle } from "lucide-react";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { router } from "@inertiajs/react";
import { Toaster,toast } from 'sonner';


export default function Home({ clients }) {
    const { delete: destroy } = useForm();
    const { flash } = usePage().props;
    // const [message, setMessage] = useState(flash?.message || '');
    const { component } = usePage();
    const [searchQuery, setSearchQuery] = useState("");

    // State for modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    // Form handling
    const { data, setData, post, put, processing, errors } = useForm({
        name: "",
        email: "",
    });

    const filteredClients = clients.data.filter(client =>
        (client.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (client.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (client.phone?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );
    
    // useEffect(() => {
    //     if (flash?.message) {
    //         setMessage(flash.message);
    //         const timer = setTimeout(() => {
    //             setMessage('');
    //         }, 5000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [flash?.message]);

    // useEffect(() => {
    //     if (flash?.message) {
    //         toast.success(flash.message);
    //     }
    // }, [flash?.message]);

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

    function submitCreate(e) {
        e.preventDefault();
        post("/clients", {
            onSuccess: () => {
                closeModal();
                toast.success("Client created successfully!");
            },
            onError: () => toast.error("Failed to create client."),
        });
    }
    
    function submitEdit(e) {
        e.preventDefault();
        put(`/clients/${selectedClient.id}`, {
            onSuccess: () => {
                closeModal();
                toast.success("Client updated successfully!");
            },
            onError: () => toast.error("Failed to update client."),
        });
    }
    
    function submitDelete(e) {
        e.preventDefault();
        destroy(`/clients/${selectedClient.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                toast.success("Client deleted successfully!");
            },
            onError: () => toast.error("Failed to delete client."),
        });
    }

    function handlePageSizeChange(perPage, page = 1) {
        router.get('/clients', { 
            per_page: perPage, 
            page: page,
            search: searchQuery // Preserve search query
        }, { preserveState: true, replace: true });
    }
    
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get('/clients', { search: searchQuery }, { preserveState: true, replace: true });
        }, 300); // Debounce to optimize API calls

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    return (
        <>
            <Head title="Clients" />
            <Toaster position="top-right" richColors closeButton />
            <h1 className="text-2xl font-bold text-center my-4">Clients</h1>

            <div className="flex justify-between mb-4">
            <SearchBar onSearch={setSearchQuery} placeholder="Search clients..." />
                <button
                    onClick={() => openModal("create")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 flex items-center gap-2"
                >
                    <PlusCircle className="w-5 h-5" /> Add Client
                </button>
            </div>

            {/* {message && <div className="bg-green-500 text-white p-2 rounded-xl">{message}</div>} */}

            <div className="max-h-[70vh] overflow-auto relative shadow-md">
                <table className="w-full">
                    <thead className="sticky top-0 bg-white shadow-md">
                        <tr>
                            <th className="p-5 text-left">Client</th>
                            <th className="p-5 text-left">Email</th>
                            <th className="p-5 text-left">Phone</th>
                            <th className="p-5 text-left text-nowrap">Date Joined</th>
                            <th className="p-5 text-center ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map((client) => (
                            <tr key={client.id} className="border-b border-gray-300">
                                <td className="p-5">{client.name}</td>
                                <td className="p-5">{client.email}</td>
                                <td className="p-5">{client.phone}</td>
                                <td className="p-5">
                                    <div className="text-sm text-gray-600">
                                        <span>{new Date(client.created_at).toDateString()}</span>
                                        <br />
                                        <span>{new Date(client.created_at).toLocaleTimeString()}</span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex gap-2 justify-center">
                                        <button onClick={() => openModal("show", client)} className="text-green-300">
                                            <Eye className="w-5 h-5 mx-auto" />
                                        </button>

                                        <button onClick={() => openModal("edit", client)} className="text-blue-400">
                                            <Pencil className="w-5 h-5 mx-auto" />
                                        </button>

                                        <button onClick={() => openModal("delete", client)} className="text-red-400">
                                            <Trash2 className="w-5 h-5 mx-auto" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination meta={clients.meta} onPageSizeChange={handlePageSizeChange} />

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

import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Eye, Trash2, Pencil, PlusCircle } from "lucide-react";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { router } from "@inertiajs/react";
import { Toaster,toast } from 'sonner';


export default function Home({ clients }) {
    // const { delete: destroy } = useForm();
    // const { flash } = usePage().props;
    // // const [message, setMessage] = useState(flash?.message || '');
    // const { component } = usePage();
    // const [searchQuery, setSearchQuery] = useState("");

    // // State for modals
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [modalType, setModalType] = useState(null);
    // const [selectedClient, setSelectedClient] = useState(null);

    // // Form handling
    // const { data, setData, post, put, processing, errors } = useForm({
    //     name: "",
    //     email: "",
    // });

    // const filteredClients = clients.data.filter(client =>
    //     (client.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    //     (client.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    //     (client.phone?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    // );
    
    // // useEffect(() => {
    // //     if (flash?.message) {
    // //         setMessage(flash.message);
    // //         const timer = setTimeout(() => {
    // //             setMessage('');
    // //         }, 5000);
    // //         return () => clearTimeout(timer);
    // //     }
    // // }, [flash?.message]);

    // // useEffect(() => {
    // //     if (flash?.message) {
    // //         toast.success(flash.message);
    // //     }
    // // }, [flash?.message]);

    // // Open modal with type (show, edit, delete, create)
    // function openModal(type, client = null) {
    //     setSelectedClient(client);
    //     setModalType(type);
    //     setData("name", client?.name || "");
    //     setData("email", client?.email || "");
    //     setData("phone", client?.phone || "");
    //     setIsModalOpen(true);
    // }

    // function closeModal() {
    //     setIsModalOpen(false);
    //     setModalType(null);
    //     setSelectedClient(null);
    // }

    // function submitCreate(e) {
    //     e.preventDefault();
    //     post("/clients", {
    //         onSuccess: () => {
    //             closeModal();
    //             toast.success("Client created successfully!");
    //         },
    //         onError: () => toast.error("Failed to create client."),
    //     });
    // }
    
    // function submitEdit(e) {
    //     e.preventDefault();
    //     put(`/clients/${selectedClient.id}`, {
    //         onSuccess: () => {
    //             closeModal();
    //             toast.success("Client updated successfully!");
    //         },
    //         onError: () => toast.error("Failed to update client."),
    //     });
    // }
    
    // function submitDelete(e) {
    //     e.preventDefault();
    //     destroy(`/clients/${selectedClient.id}`, {
    //         preserveScroll: true,
    //         onSuccess: () => {
    //             closeModal();
    //             toast.success("Client deleted successfully!");
    //         },
    //         onError: () => toast.error("Failed to delete client."),
    //     });
    // }

    // function handlePageSizeChange(perPage, page = 1) {
    //     router.get('/clients', { 
    //         per_page: perPage, 
    //         page: page,
    //         search: searchQuery // Preserve search query
    //     }, { preserveState: true, replace: true });
    // }
    
    // useEffect(() => {
    //     const delayDebounce = setTimeout(() => {
    //         router.get('/clients', { search: searchQuery }, { preserveState: true, replace: true });
    //     }, 300); // Debounce to optimize API calls

    //     return () => clearTimeout(delayDebounce);
    // }, [searchQuery]);

    return (
        <>
            <Head title="Pets" />
            <Toaster position="top-right" richColors closeButton />
            <h1 className="text-2xl font-bold text-center my-4">Clients</h1>

        </>
    );
}

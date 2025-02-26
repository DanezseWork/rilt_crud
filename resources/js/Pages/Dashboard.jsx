import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { clientCount } = usePage().props;
    return (
        <>
            <h1 className="text-2xl font-bold text-center my-4">Dashboard</h1>
            <p className="text-center text-lg">Total Clients: {clientCount}</p>
        </>
    );
}

import { Head, useForm } from "@inertiajs/react";

export default function Create({ client }) {
    const {data, setData, put, processing, errors} = useForm({
        body: client.body,
    });

    function submit(e) {
        e.preventDefault();
        put(`/clients/${client.id}`);
    }

    return (
        <>
            <Head>
                <title>Edit</title>
                <meta head-key="description" name="description" content="This is the create page of the application where you can create a new client" />
            </Head>
            <h1 className="text-2xl font-bold text-center">Edit your client</h1>
            <div className="w-1/2 mx-auto">
                <form onSubmit={submit} className="flex flex-col items-center">
                    <textarea rows="10" className={`w-full h-full border border-gray-300 rounded-2xl p-4 ${errors.body ? '!border-red-500' : ''}`} value={data.body} onChange={(e)=>setData('body', e.target.value)}></textarea>
                    <div className="text-red-500">{errors.body}</div>

                    <button className="bg-green-700 rounded-2xl text-white w-1/2 py-3 font-bold disabled:bg-gray-500 mt-3" disabled={processing}>Update</button>
                </form>
            </div>
        </>
    );
}
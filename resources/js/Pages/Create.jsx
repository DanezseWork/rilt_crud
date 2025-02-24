import { useForm } from "@inertiajs/react";

export default function Create() {
    const {data, setData, post, processing, errors} = useForm({
        body: '',
    });

    function submit(e) {
        e.preventDefault();
        post("/clients");
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-center">Create</h1>
            {data.body}
            <div className="w-1/2 bg-red-500 mx-auto">
                <form onSubmit={submit} className="flex flex-col items-center">
                    <textarea rows="10" className="w-full h-full" value={data.body} onChange={(e)=>setData('body', e.target.value)}></textarea>

                    <button className="bg-green-700 rounded-2xl text-white w-1/2 py-3 font-bold">Add</button>
                </form>
            </div>
        </>
    );
}
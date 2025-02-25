export default function Show({ client }) {
    return(
        <>
            <div className="p-4 border-b">
                <div className="text-sm font-light flex flex-col">
                    <span>Member since:</span>
                    <span>{new Date(client.created_at).toDateString()}</span>
                    <span>{new Date(client.created_at).toLocaleTimeString()}</span>
                </div>
                <p className="font-medium">{client.body}</p>
            </div>
        </>
    );
}
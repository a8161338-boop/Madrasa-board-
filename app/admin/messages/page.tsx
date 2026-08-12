import { getMessages } from '@/lib/data';

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <>
      <h3>Contact Messages</h3>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Phone</th><th>Message</th><th>Date</th></tr></thead>
        <tbody>
          {messages.length ? messages.map((m: any) => (
            <tr key={m.id}>
              <td>{m.name}</td><td>{m.phone}</td><td>{m.message}</td>
              <td>{new Date(m.created_at).toLocaleString()}</td>
            </tr>
          )) : <tr><td colSpan={4} className="empty">No messages yet</td></tr>}
        </tbody>
      </table>
    </>
  );
}

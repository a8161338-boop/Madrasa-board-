import { getNotices } from '@/lib/data';
import { addNotice, updateNotice, deleteNotice } from './actions';

export const revalidate = 0;

export default async function AdminNoticesPage({ searchParams }: { searchParams: { edit?: string } }) {
  const notices = await getNotices();
  const editing = searchParams.edit ? notices.find((n: any) => n.id === searchParams.edit) : null;

  return (
    <>
      <h3>Notices</h3>
      <form className="admin-form" action={editing ? updateNotice : addNotice}>
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <div className="row">
          <div><label>Title</label><input name="title" defaultValue={editing?.title} required /></div>
          <div><label>Date</label><input type="date" name="notice_date" defaultValue={editing?.notice_date} /></div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Description</label>
          <textarea name="description" defaultValue={editing?.description}></textarea>
        </div>
        <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" name="important" defaultChecked={editing?.important} style={{ width: 'auto' }} />
          <label style={{ marginBottom: 0 }}>Mark as important</label>
        </div>
        <div className="actions">
          <button type="submit" className="btn-sm btn-primary">{editing ? 'Update item' : 'Add item'}</button>
          {editing && <a href="/admin/notices" className="btn-sm btn-ghost">Cancel</a>}
        </div>
      </form>

      <table className="admin-table">
        <thead><tr><th>Title</th><th>Date</th><th>Important</th><th>Actions</th></tr></thead>
        <tbody>
          {notices.length ? notices.map((n: any) => (
            <tr key={n.id}>
              <td>{n.title}</td><td>{n.notice_date}</td><td>{n.important ? 'Yes' : 'No'}</td>
              <td className="row-actions">
                <a href={`/admin/notices?edit=${n.id}`}><button type="button">Edit</button></a>
                <form action={deleteNotice}>
                  <input type="hidden" name="id" value={n.id} />
                  <button type="submit" className="del">Delete</button>
                </form>
              </td>
            </tr>
          )) : <tr><td colSpan={4} className="empty">No items yet</td></tr>}
        </tbody>
      </table>
    </>
  );
}

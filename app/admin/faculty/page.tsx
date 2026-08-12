import { getFaculty } from '@/lib/data';
import { addFaculty, updateFaculty, deleteFaculty } from './actions';

export const revalidate = 0;

export default async function AdminFacultyPage({ searchParams }: { searchParams: { edit?: string } }) {
  const faculty = await getFaculty();
  const editing = searchParams.edit ? faculty.find((f: any) => f.id === searchParams.edit) : null;

  return (
    <>
      <h3>Faculty</h3>
      <form className="admin-form" action={editing ? updateFaculty : addFaculty}>
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <div className="row">
          <div><label>Name</label><input name="name" defaultValue={editing?.name} required /></div>
          <div><label>Designation</label><input name="designation" defaultValue={editing?.designation} /></div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Qualification</label>
          <input name="qualification" defaultValue={editing?.qualification} />
        </div>
        <div className="actions">
          <button type="submit" className="btn-sm btn-primary">{editing ? 'Update item' : 'Add item'}</button>
          {editing && <a href="/admin/faculty" className="btn-sm btn-ghost">Cancel</a>}
        </div>
      </form>

      <table className="admin-table">
        <thead><tr><th>Name</th><th>Designation</th><th>Actions</th></tr></thead>
        <tbody>
          {faculty.length ? faculty.map((f: any) => (
            <tr key={f.id}>
              <td>{f.name}</td><td>{f.designation}</td>
              <td className="row-actions">
                <a href={`/admin/faculty?edit=${f.id}`}><button type="button">Edit</button></a>
                <form action={deleteFaculty}>
                  <input type="hidden" name="id" value={f.id} />
                  <button type="submit" className="del">Delete</button>
                </form>
              </td>
            </tr>
          )) : <tr><td colSpan={3} className="empty">No items yet</td></tr>}
        </tbody>
      </table>
    </>
  );
}

import { getCourses } from '@/lib/data';
import { addCourse, updateCourse, deleteCourse } from './actions';

export const revalidate = 0;

export default async function AdminCoursesPage({ searchParams }: { searchParams: { edit?: string } }) {
  const courses = await getCourses();
  const editing = searchParams.edit ? courses.find((c: any) => c.id === searchParams.edit) : null;

  return (
    <>
      <h3>Courses</h3>
      <form className="admin-form" action={editing ? updateCourse : addCourse}>
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <div className="row">
          <div><label>Course name</label><input name="name" defaultValue={editing?.name} required /></div>
          <div><label>Duration</label><input name="duration" defaultValue={editing?.duration} /></div>
        </div>
        <div className="row">
          <div><label>Eligibility</label><input name="eligibility" defaultValue={editing?.eligibility} /></div>
          <div><label>Fee</label><input name="fee" defaultValue={editing?.fee} /></div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Description</label>
          <textarea name="description" defaultValue={editing?.description}></textarea>
        </div>
        <div className="actions">
          <button type="submit" className="btn-sm btn-primary">{editing ? 'Update item' : 'Add item'}</button>
          {editing && <a href="/admin/courses" className="btn-sm btn-ghost">Cancel</a>}
        </div>
      </form>

      <table className="admin-table">
        <thead><tr><th>Name</th><th>Duration</th><th>Fee</th><th>Actions</th></tr></thead>
        <tbody>
          {courses.length ? courses.map((c: any) => (
            <tr key={c.id}>
              <td>{c.name}</td><td>{c.duration}</td><td>{c.fee}</td>
              <td className="row-actions">
                <a href={`/admin/courses?edit=${c.id}`}><button type="button">Edit</button></a>
                <form action={deleteCourse}>
                  <input type="hidden" name="id" value={c.id} />
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

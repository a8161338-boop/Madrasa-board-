import { getGallery } from '@/lib/data';
import { addGalleryImage, deleteGalleryImage } from './actions';

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const gallery = await getGallery();

  return (
    <>
      <h3>Gallery</h3>
      <form className="admin-form" action={addGalleryImage}>
        <div className="row">
          <div><label>Image URL</label><input name="url" required placeholder="https://..." /></div>
          <div><label>Caption</label><input name="title" /></div>
        </div>
        <div className="actions">
          <button type="submit" className="btn-sm btn-primary">Add item</button>
        </div>
      </form>
      <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginBottom: 16 }}>
        Tip: tasveer kahin (jaise imgur.com ya Google Photos ka public link) upload karke uska URL yahan paste karein.
      </p>

      <table className="admin-table">
        <thead><tr><th>Caption</th><th>URL</th><th>Actions</th></tr></thead>
        <tbody>
          {gallery.length ? gallery.map((g: any) => (
            <tr key={g.id}>
              <td>{g.title}</td><td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.url}</td>
              <td className="row-actions">
                <form action={deleteGalleryImage}>
                  <input type="hidden" name="id" value={g.id} />
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

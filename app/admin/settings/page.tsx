import { getSettings } from '@/lib/data';
import { updateSettings } from './actions';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const s = await getSettings();

  return (
    <>
      <h3>Site Settings</h3>
      <form className="admin-form" action={updateSettings}>
        <div className="row">
          <div><label>College / Institute name</label><input name="name" defaultValue={s.name} /></div>
          <div><label>Sub name / tagline line</label><input name="subname" defaultValue={s.subname} /></div>
        </div>
        <div className="row">
          <div><label>Homepage tagline</label><input name="tagline" defaultValue={s.tagline} /></div>
          <div><label>Principal / Muhtamim name</label><input name="principal_name" defaultValue={s.principal_name} /></div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Principal message</label>
          <textarea name="principal_msg" defaultValue={s.principal_msg}></textarea>
        </div>
        <div className="row">
          <div><label>Address</label><input name="address" defaultValue={s.address} /></div>
          <div><label>Phone</label><input name="phone" defaultValue={s.phone} /></div>
        </div>
        <div className="row">
          <div><label>Email</label><input name="email" defaultValue={s.email} /></div>
          <div><label>Years of excellence</label><input name="years" defaultValue={s.years} /></div>
        </div>
        <div className="row">
          <div><label>Students count</label><input name="students" defaultValue={s.students} /></div>
          <div><label>Faculty count</label><input name="faculty_count" defaultValue={s.faculty_count} /></div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Courses count</label>
          <input name="courses_count" defaultValue={s.courses_count} />
        </div>
        <div className="actions">
          <button type="submit" className="btn-sm btn-primary">Save changes</button>
        </div>
      </form>
    </>
  );
}

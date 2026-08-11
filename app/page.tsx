import { getCourses, getNotices, getFaculty, getGallery, getMessages } from '@/lib/data';

export const revalidate = 0;

export default async function AdminDashboard() {
  const [courses, notices, faculty, gallery, messages] = await Promise.all([
    getCourses(), getNotices(), getFaculty(), getGallery(), getMessages(),
  ]);

  return (
    <>
      <h3>Dashboard</h3>
      <div className="kpi-grid">
        <div className="kpi"><b>{courses.length}</b><span>Courses</span></div>
        <div className="kpi"><b>{notices.length}</b><span>Notices</span></div>
        <div className="kpi"><b>{faculty.length}</b><span>Faculty</span></div>
        <div className="kpi"><b>{gallery.length}</b><span>Gallery images</span></div>
        <div className="kpi"><b>{messages.length}</b><span>Contact messages</span></div>
      </div>
      <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
        Ye data ab asal database (Supabase) mein save ho raha hai — website band karne, phone badalne
        ya kisi aur ke iske access karne se kuch change nahi hoga.
      </p>
    </>
  );
}

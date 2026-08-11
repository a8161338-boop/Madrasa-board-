import { logout } from './login/actions';

const TABS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/settings', label: 'Site Settings' },
  { href: '/admin/courses', label: 'Courses' },
  { href: '/admin/notices', label: 'Notices' },
  { href: '/admin/faculty', label: 'Faculty' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/messages', label: 'Messages' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div className="t">Maahad-ul-Rashd — Admin Panel</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="/" className="en">View site</a>
          <form action={logout}>
            <button type="submit">Logout</button>
          </form>
        </div>
      </div>
      <div className="admin-body">
        <div className="admin-tabs">
          {TABS.map((t) => (
            <a key={t.href} href={t.href}>{t.label}</a>
          ))}
        </div>
        <div className="admin-panel">{children}</div>
      </div>
    </div>
  );
}

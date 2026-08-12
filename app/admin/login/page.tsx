import { login } from './actions';

export default function AdminLoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="admin-shell">
      <div className="admin-login">
        <h2>Admin Login</h2>
        <p>معہد الرشد ویب سائٹ — Admin Panel</p>
        {searchParams.error && <p className="err">غلط ای میل یا پاسورڈ</p>}
        <form action={login}>
          <input name="email" type="email" placeholder="Admin email" required />
          <input name="password" type="password" placeholder="Admin password" required />
          <button type="submit">Login</button>
        </form>
        <div style={{ marginTop: 14 }}>
          <a href="/" className="en" style={{ fontSize: 12, color: 'var(--primary)' }}>← Back to website</a>
        </div>
      </div>
    </div>
  );
}

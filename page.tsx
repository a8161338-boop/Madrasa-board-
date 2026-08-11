import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import Divider from '@/components/Divider';
import { getSettings, getCourses, getNotices } from '@/lib/data';

export const revalidate = 0;

export default async function Home() {
  const s = await getSettings();
  const courses = (await getCourses()).slice(0, 3);
  const notices = (await getNotices()).slice(0, 4);

  return (
    <>
      <PublicNav settings={s} />

      <section className="hero">
        <div className="hero-inner">
          <div className="arch">🕌</div>
          <h2>{s.name}</h2>
          <p className="tag">{s.tagline}</p>
          <div className="hero-btns">
            <a className="btn btn-gold" href="/courses">کورسز دیکھیں</a>
            <a className="btn btn-outline" href="/contact">داخلہ کے لیے رابطہ کریں</a>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          <div><b>{s.students}</b><span>طلبہ</span></div>
          <div><b>{s.faculty_count}</b><span>اساتذہ کرام</span></div>
          <div><b>{s.courses_count}</b><span>کورسز</span></div>
          <div><b>{s.years}</b><span>سالوں کا تجربہ</span></div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head"><h3>مہتمم صاحب کا پیغام</h3></div>
          <Divider />
          <div className="principal">
            <div className="photo">🧕</div>
            <div>
              <h4>{s.principal_name}</h4>
              <div className="role">مہتمم / ڈائریکٹر</div>
              <p>{s.principal_msg}</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--primary-tint)' }}>
        <div className="container">
          <div className="section-head"><h3>ہمارے کورسز</h3></div>
          <Divider />
          <div className="list-cards">
            {courses.length ? courses.map((c: any) => (
              <div className="item-card" key={c.id}>
                <div className="thumb">📖</div>
                <div className="body">
                  <h4>{c.name}</h4>
                  <p>{c.description}</p>
                  <span className="pill">مدت: {c.duration}</span>
                  <span className="pill">اہلیت: {c.eligibility}</span>
                </div>
              </div>
            )) : <div className="empty">فی الحال کوئی کورس شامل نہیں کیا گیا</div>}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head"><h3>تازہ ترین اعلانات</h3></div>
          <Divider />
          {notices.length ? notices.map((n: any) => (
            <div className={`notice-item ${n.important ? 'important' : ''}`} key={n.id}>
              <div>
                <b>{n.title}</b>
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>{n.description}</p>
              </div>
              <div className="date">{n.notice_date}</div>
            </div>
          )) : <div className="empty">کوئی اعلان موجود نہیں</div>}
        </div>
      </section>

      <PublicFooter settings={s} />
    </>
  );
}

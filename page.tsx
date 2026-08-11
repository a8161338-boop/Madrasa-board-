import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import Divider from '@/components/Divider';
import { getSettings, getNotices } from '@/lib/data';

export const revalidate = 0;

export default async function NoticesPage() {
  const s = await getSettings();
  const notices = await getNotices();

  return (
    <>
      <PublicNav settings={s} />
      <section>
        <div className="container">
          <div className="section-head"><h3>تمام اعلانات</h3></div>
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

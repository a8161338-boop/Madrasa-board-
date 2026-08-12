import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import Divider from '@/components/Divider';
import { getSettings, getFaculty } from '@/lib/data';

export const revalidate = 0;

export default async function FacultyPage() {
  const s = await getSettings();
  const faculty = await getFaculty();

  return (
    <>
      <PublicNav settings={s} />
      <section>
        <div className="container">
          <div className="section-head"><h3>اساتذہ کرام</h3></div>
          <Divider />
          <div className="cards-grid">
            {faculty.length ? faculty.map((f: any) => (
              <div className="card" key={f.id}>
                <div className="ic">👳</div>
                <h4>{f.name}</h4>
                <p><b>{f.designation}</b></p>
                <p>{f.qualification}</p>
              </div>
            )) : <div className="empty">اساتذہ کی تفصیلات جلد شامل کی جائیں گی</div>}
          </div>
        </div>
      </section>
      <PublicFooter settings={s} />
    </>
  );
}

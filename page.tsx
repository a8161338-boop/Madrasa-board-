import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import Divider from '@/components/Divider';
import { getSettings, getCourses } from '@/lib/data';

export const revalidate = 0;

export default async function CoursesPage() {
  const s = await getSettings();
  const courses = await getCourses();

  return (
    <>
      <PublicNav settings={s} />
      <section>
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
                  <p style={{ marginTop: 8, fontSize: 13 }}><b>فیس:</b> {c.fee}</p>
                </div>
              </div>
            )) : <div className="empty">فی الحال کوئی کورس شامل نہیں کیا گیا</div>}
          </div>
        </div>
      </section>
      <PublicFooter settings={s} />
    </>
  );
}

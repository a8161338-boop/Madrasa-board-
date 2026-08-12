import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import Divider from '@/components/Divider';
import { getSettings, getCourses } from '@/lib/data';

export const revalidate = 0;

export default async function CoursesPage() {
  const settings = await getSettings();
  const courses = await getCourses();

  return (
    <>
      <PublicNav settings={settings} />

      <main>
        <section>
          <div className="container">
            <div className="section-head">
              <h3>ہمارے کورسز</h3>
            </div>

            <Divider />

            <div className="list-cards">
              {courses.length > 0 ? (
                courses.map((course: any) => (
                  <div className="item-card" key={course.id}>
                    <div className="thumb">📖</div>

                    <div className="body">
                      <h4>{course.name || 'کورس'}</h4>

                      {course.description ? (
                        <p>{course.description}</p>
                      ) : null}

                      <div>
                        <span className="pill">
                          مدت: {course.duration || 'مقرر نہیں'}
                        </span>

                        <span className="pill">
                          اہلیت: {course.eligibility || 'مقرر نہیں'}
                        </span>
                      </div>

                      <p style={{ marginTop: 8, fontSize: 13 }}>
                        <b>فیس:</b> {course.fee || 'مقرر نہیں'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty">
                  فی الحال کوئی کورس شامل نہیں کیا گیا
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter settings={settings} />
    </>
  );
}

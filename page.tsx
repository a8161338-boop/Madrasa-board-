import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import Divider from '@/components/Divider';
import { getSettings } from '@/lib/data';
import ContactForm from './ContactForm';

export const revalidate = 0;

export default async function ContactPage() {
  const s = await getSettings();

  return (
    <>
      <PublicNav settings={s} />
      <section>
        <div className="container">
          <div className="section-head"><h3>ہم سے رابطہ کریں</h3></div>
          <Divider />
          <div className="contact-grid">
            <div className="contact-info">
              <p>📍 {s.address}</p>
              <p className="en">📞 {s.phone}</p>
              <p className="en">✉️ {s.email}</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <PublicFooter settings={s} />
    </>
  );
}

import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import Divider from '@/components/Divider';
import { getSettings, getGallery } from '@/lib/data';

export const revalidate = 0;

export default async function GalleryPage() {
  const s = await getSettings();
  const gallery = await getGallery();

  return (
    <>
      <PublicNav settings={s} />
      <section>
        <div className="container">
          <div className="section-head"><h3>گیلری</h3></div>
          <Divider />
          <div className="gallery-grid">
            {gallery.length ? gallery.map((g: any) => (
              <div className="g-img" key={g.id}>
                {g.url ? <img src={g.url} alt={g.title || ''} /> : '🖼️'}
              </div>
            )) : <div className="empty" style={{ gridColumn: '1/-1' }}>ابھی تک کوئی تصویر شامل نہیں کی گئی</div>}
          </div>
        </div>
      </section>
      <PublicFooter settings={s} />
    </>
  );
}

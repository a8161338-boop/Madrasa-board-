export default function PublicFooter({ settings }: { settings: any }) {
  return (
    <footer>
      <div className="container">
        <div>
          <h5>{settings.name}</h5>
          <p>{settings.tagline}</p>
        </div>
        <div>
          <h5>روابط</h5>
          <p><a href="/courses">کورسز</a></p>
          <p><a href="/notices">اعلانات</a></p>
          <p><a href="/contact">رابطہ</a></p>
        </div>
        <div>
          <h5>رابطہ کی تفصیلات</h5>
          <p>{settings.address}</p>
          <p className="en">{settings.phone}</p>
        </div>
      </div>
      <div className="bottom">© {new Date().getFullYear()} {settings.name} — تمام حقوق محفوظ ہیں</div>
    </footer>
  );
}

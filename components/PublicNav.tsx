export default function PublicNav({ settings }: { settings: any }) {
  return (
    <header>
      <div className="nav-wrap">
        <div className="brand">
          <div className="brand-mark">ا</div>
          <div className="brand-text">
            <h1>{settings.name}</h1>
            <span>{settings.subname}</span>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href="/">ہوم</a></li>
            <li><a href="/courses">کورسز</a></li>
            <li><a href="/notices">اعلانات</a></li>
            <li><a href="/faculty">اساتذہ</a></li>
            <li><a href="/gallery">گیلری</a></li>
            <li><a href="/contact">رابطہ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

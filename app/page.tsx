'use client';

import { useState } from 'react';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ direction: 'rtl', textAlign: 'right', fontFamily: 'Arial, sans-serif', background: '#fdfbf7', minHeight: '100vh', color: '#2C3E50' }}>
      
      {/* ================= HEADER / NAVBAR ================= */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', background: '#fff', borderBottom: '1px solid #e0dcd0', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        
        {/* Professional Logo & Name (Jamia Style) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '48px', height: '48px', background: '#134e38', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '22px', border: '2px solid #d4af37' }}>
            م
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', color: '#134e38', fontWeight: 'bold' }}>معہد الرشد</h1>
            <span style={{ fontSize: '11px', color: '#555', letterSpacing: '0.5px', display: 'block' }}>Ma'had Ar-Rushd Knowledge Centre</span>
          </div>
        </div>

        {/* Hamburger Button (☰) */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#134e38', padding: '5px' }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* ================= SIDEBAR / DROPDOWN MENU (ALL PAGES) ================= */}
      {menuOpen && (
        <div style={{ background: '#1c2d25', color: '#fff', padding: '20px', position: 'absolute', top: '78px', left: 0, right: 0, zIndex: 999, boxShadow: '0 5px 15px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto' }}>
          <h3 style={{ borderBottom: '1px solid #335445', paddingBottom: '10px', marginTop: 0, fontSize: '16px', color: '#d4af37' }}>
            مینو - تمام صفحات (All Pages & Links)
          </h3>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <a href="/" style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '9px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>
                🏠 صفحہ اول (Home)
              </a>
            </li>
            <li>
              <a href="/admission" style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '9px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>
                📝 آن لائن داخلہ فارم (Admission)
              </a>
            </li>
            <li>
              <a href="/courses" style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '9px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>
                📚 شعبہ جات و کورسز (Courses)
              </a>
            </li>
            <li>
              <a href="/faculty" style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '9px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>
                👨‍🏫 اساتذہ کرام (Faculty)
              </a>
            </li>
            <li>
              <a href="/notices" style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '9px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>
                📢 اعلانات (Notices)
              </a>
            </li>
            <li>
              <a href="/gallery" style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '9px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>
                🖼️ گیلری (Gallery)
              </a>
            </li>
            <li>
              <a href="/contact" style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '9px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>
                📞 رابطہ کریں (Contact)
              </a>
            </li>
            <li>
              <a href="/admin" style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '9px 12px', borderRadius: '4px', background: 'rgba(212, 175, 55, 0.2)', border: '1px solid #d4af37' }}>
                ⚙️ ایڈمن پ্যানেل (Admin Panel)
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* ================= HERO SECTION WITH BUILDING IMAGE ================= */}
      <main style={{ padding: '30px 20px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ background: '#134e38', color: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
          
          {/* Building Image Container */}
          <div style={{ width: '100%', height: '260px', overflow: 'hidden', borderBottom: '4px solid #d4af37' }}>
            <img 
              src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1000&auto=format&fit=crop" 
              alt="Campus Building" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Content Box */}
          <div style={{ padding: '30px 20px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '15px', lineHeight: '1.6', color: '#f3e5ab' }}>
              مركز تحفيظ القرآن والدعوة والتعليم
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.8', opacity: 0.9, marginBottom: '25px' }}>
              قرآنی تعلیمات، اخلاقی تربیت اور دینی دعوت کا ایک معتبر اور ہم جہت مرکز جو جدید تقاضوں کے مطابق نسل نو کی رہنمائی کرتا ہے۔
            </p>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/admission" style={{ background: '#d4af37', color: '#134e38', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                آن لائن داخلہ لیں
              </a>
              <a href="/courses" style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                کورسز دیکھیں
              </a>
            </div>
          </div>

        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer style={{ background: '#11221c', color: '#aaa', textAlign: 'center', padding: '20px', marginTop: '40px', fontSize: '13px' }}>
        <p style={{ margin: 0 }}>© 2026 معہد الرشد — تمام حقوق محفوظ ہیں</p>
      </footer>

    </div>
  );
      }
                                         

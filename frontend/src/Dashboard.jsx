import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentDate, setCurrentDate] = useState("");

  // Deutsche Bank Brand Colors
  const theme = {
    deepBlueGradient: 'linear-gradient(180deg, #001E62 0%, #003DA5 100%)',
    actionCircle: 'rgba(255, 255, 255, 0.1)',
    textWhite: '#FFFFFF',
    textBlack: '#000000',
    textGray: '#666666',
    borderLight: '#E5E5E5',
    dbBlue: '#001E62'
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // Auto-updating Date
    const updateDate = () => {
      const now = new Date();
      const options = { day: '2. punct', month: 'SHORT', year: 'numeric' };
      // Format: 12. APR. 2026
      const formatted = now.toLocaleDateString('de-DE', { day: '2-digit' }) + ". " + 
                        now.toLocaleDateString('de-DE', { month: 'short' }).toUpperCase() + ". " + 
                        now.getFullYear();
      setCurrentDate(formatted);
    };

    updateDate();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div style={styles.appContainer}>
      {/* --- TOP NAV ICONS --- */}
      <div style={styles.topIcons}>
        <div style={styles.iconWrapper}>✉️<div style={styles.notificationDot} /></div>
        <div style={styles.iconWrapper}>👤</div>
      </div>

      {/* --- BLUE TOP SECTION (Deutsche Bank Circle) --- */}
      <div style={{ ...styles.topSection, background: theme.deepBlueGradient }}>
        
        {/* Main Balance Circle */}
        <div style={styles.balanceCircleContainer}>
          <div style={styles.dottedCircle}>
             <span style={styles.currencyLabel}>EUR</span>
             <h1 style={styles.mainBalance}>191.519,01</h1>
             <div style={styles.dateDisplay}>{currentDate}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.actionRow}>
          <ActionButton icon="€→" label="Überweisen" />
          <ActionButton icon="|||" label="Bargeld-Code" />
          <ActionButton icon="€↻" label="Geplant" />
        </div>
      </div>

      {/* --- ACCOUNTS SECTION --- */}
      <div style={styles.bodySection}>
        <h3 style={styles.sectionHeader}>Konten</h3>

        {/* BestKonto (Your Specific Details) */}
        <AccountItem 
          title="BestKonto" 
          iban="DE85 8107 0024 0218 0081 00" 
          balance="191.519,01" 
        />

        <AccountItem 
          title="maxblue Depotkonto" 
          iban="DE58 **** 0081 01" 
          balance="4,92" 
        />
      </div>

      {/* --- BOTTOM NAVIGATION --- */}
      <div style={styles.bottomNav}>
        <NavItem icon="🟦" label="Übersicht" active />
        <NavItem icon="€⇄" label="Überweisen" />
        <NavItem icon="📈" label="Investieren" />
        <NavItem icon="👜" label="Produkte" />
        <NavItem icon="☰" label="Services" />
      </div>
    </div>
  );
}

// Sub-components for cleaner code
const ActionButton = ({ icon, label }) => (
  <div style={styles.actionItem}>
    <div style={styles.actionCircle}>{icon}</div>
    <span style={styles.actionLabel}>{label}</span>
  </div>
);

const AccountItem = ({ title, iban, balance }) => (
  <div style={styles.accountRow}>
    <div style={styles.accountIconBox}>💶</div>
    <div style={{ flex: 1 }}>
      <div style={styles.accountTitle}>{title}</div>
      <div style={styles.accountIban}>{iban}</div>
    </div>
    <div style={styles.accountBalance}>{balance} €</div>
  </div>
);

const NavItem = ({ icon, label, active }) => (
  <div style={{ ...styles.navItem, color: active ? '#003DA5' : '#666' }}>
    <div style={{ fontSize: '20px' }}>{icon}</div>
    <div style={{ fontSize: '10px', marginTop: '4px' }}>{label}</div>
    {active && <div style={styles.activeIndicator} />}
  </div>
);

const styles = {
  appContainer: {
    maxWidth: '375px', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column',
    backgroundColor: '#fff', fontFamily: 'Arial, sans-serif', overflow: 'hidden'
  },
  topIcons: {
    position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '20px', zIndex: 10, color: 'white'
  },
  notificationDot: {
    width: '8px', height: '8px', backgroundColor: 'red', borderRadius: '50%', position: 'absolute', top: 0, right: 0
  },
  topSection: {
    padding: '60px 20px 30px 20px', textAlign: 'center', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
  },
  balanceCircleContainer: {
    display: 'flex', justifyContent: 'center', marginBottom: '30px'
  },
  dottedCircle: {
    width: '200px', height: '200px', borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.4)',
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'
  },
  mainBalance: { fontSize: '28px', margin: '10px 0', fontWeight: 'bold' },
  currencyLabel: { fontSize: '14px', opacity: 0.8 },
  dateDisplay: { fontSize: '12px', borderBottom: '1px dotted white', paddingBottom: '2px' },
  actionRow: { display: 'flex', justifyContent: 'space-around', marginTop: '20px' },
  actionItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' },
  actionCircle: {
    width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)',
    display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px', fontSize: '18px'
  },
  actionLabel: { fontSize: '12px' },
  bodySection: { flex: 1, padding: '20px', overflowY: 'auto' },
  sectionHeader: { fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' },
  accountRow: { display: 'flex', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' },
  accountIconBox: { width: '40px', fontSize: '20px' },
  accountTitle: { fontWeight: 'bold', fontSize: '15px' },
  accountIban: { fontSize: '12px', color: '#666' },
  accountBalance: { fontWeight: 'bold', fontSize: '15px' },
  bottomNav: {
    height: '75px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '1px solid #eee', paddingBottom: '15px'
  },
  navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' },
  activeIndicator: { height: '3px', width: '20px', backgroundColor: '#003DA5', position: 'absolute', bottom: '-10px' }
};
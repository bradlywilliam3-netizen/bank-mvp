import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Theme Colors from the design image
  const theme = {
    darkBlue: '#2A269B',
    lightCyan: '#00F0C8',
    gaugeBg: '#3A37A8',
    textWhite: '#FFFFFF',
    textMain: '#2E2D77',
    textSecondary: '#A0A0BF',
    positiveGreen: '#23C06F',
    negativeRed: '#F9397C',
    borderLight: '#F0F0F5',
  };

  useEffect(() => {
    // Security Check: Redirect if not logged in
    if (!user) {
      navigate("/");
      return;
    }

    // Connect to your production Render API
    axios
      .get(`https://bank-mvp.onrender.com/api/transactions/${user.email}`)
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div style={styles.appContainer}>
      {/* --- TOP SECTION (Dark Blue) --- */}
      <div style={{ ...styles.topSection, backgroundColor: theme.darkBlue }}>
        <div style={styles.header}>
          <span style={{ color: theme.textWhite, fontWeight: 'bold' }}>Übersicht</span>
        </div>

        {/* Days Until Salary Row */}
        <div style={styles.statRow}>
          <div style={styles.circularStat}>
            <svg width="36" height="36">
              <circle cx="18" cy="18" r="16" fill="none" stroke={theme.gaugeBg} strokeWidth="3" />
              <circle cx="18" cy="18" r="16" fill="none" stroke={theme.lightCyan} strokeWidth="3" 
                strokeDasharray="75 100" strokeLinecap="round" transform="rotate(-90 18 18)" />
              <text x="18" y="23" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">23</text>
            </svg>
            <span style={{ color: theme.textWhite, fontSize: '13px' }}>Tage bis zum Gehalt</span>
          </div>
          <button style={styles.statButton}>Zur Statistik ›</button>
        </div>

        {/* Main Balance Gauge */}
        <div style={styles.gaugeContainer}>
          <svg width="200" height="100" viewBox="0 0 200 100">
            <path d="M 20 90 A 80 80 0 0 1 180 90" fill="none" stroke={theme.gaugeBg} strokeWidth="10" strokeLinecap="round" />
            <path d="M 20 90 A 80 80 0 0 1 140 30" fill="none" stroke={theme.lightCyan} strokeWidth="10" strokeLinecap="round" />
            <text x="100" y="75" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">
                {user.balance?.toLocaleString('de-DE') || "375"} €
            </text>
            <text x="100" y="95" textAnchor="middle" fill="white" fontSize="10" opacity="0.7">vom Gehalt verfügbar</text>
          </svg>
        </div>
      </div>

      {/* --- BODY SECTION (White) --- */}
      <div style={styles.bodySection}>
        <h3 style={{ color: theme.textMain, fontSize: '18px', marginBottom: '20px' }}>Tägliche Konten</h3>

        {/* Dynamic User Account */}
        <AccountRow 
          icon="🏦" 
          title="Persönliches Girokonto" 
          sub={user.accountNumber || "0443897400"}
          balance={user.balance?.toLocaleString('de-DE') || "2.371,22"} 
          color={theme.positiveGreen} 
        />

        {/* Transaction History Section */}
        <h3 style={{ color: theme.textMain, fontSize: '18px', marginTop: '30px', marginBottom: '15px' }}>Transactions</h3>
        
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <AccountRow 
              key={tx._id}
              icon="🔄" 
              title={tx.receiver === user.email ? "Zahlung erhalten" : "Überweisung"} 
              sub={tx.receiver === user.email ? `Von: ${tx.sender}` : `An: ${tx.receiver}`}
              balance={`${tx.receiver === user.email ? "+" : "-"}${tx.amount.toLocaleString('de-DE')}`} 
              color={tx.receiver === user.email ? theme.positiveGreen : theme.negativeRed} 
            />
          ))
        ) : (
          <p style={{ color: theme.textSecondary, fontSize: '14px' }}>Keine aktuellen Buchungen.</p>
        )}
      </div>

      {/* --- BOTTOM NAVIGATION --- */}
      <div style={styles.bottomNav}>
        <NavItem icon="📊" label="Übersicht" active color={theme.darkBlue} />
        <NavItem icon="📂" label="Verträge" color={theme.textSecondary} />
        <NavItem icon="💡" label="Tipps" color={theme.textSecondary} />
        <NavItem icon="•••" label="Mehr" color={theme.textSecondary} />
      </div>
    </div>
  );
}

// Sub-component for clean Account Rows
const AccountRow = ({ icon, title, sub, balance, color }) => (
  <div style={styles.accountRow}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={styles.iconCircle}>{icon}</div>
      <div>
        <div style={styles.rowTitle}>{title}</div>
        {sub && <div style={styles.rowSub}>{sub}</div>}
      </div>
    </div>
    <div style={{ ...styles.rowBalance, color }}>{balance} €</div>
  </div>
);

// Sub-component for Bottom Nav Items
const NavItem = ({ icon, label, active, color }) => (
  <div style={{ textAlign: 'center', cursor: 'pointer', flex: 1 }}>
    <div style={{ fontSize: '20px', color }}>{icon}</div>
    <div style={{ fontSize: '10px', color, fontWeight: active ? 'bold' : 'normal' }}>{label}</div>
  </div>
);

const styles = {
  appContainer: {
    maxWidth: '375px',
    margin: '0 auto',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  topSection: {
    padding: '20px 20px 40px 20px',
    borderBottomLeftRadius: '30px',
    borderBottomRightRadius: '30px',
  },
  header: { textAlign: 'center', marginBottom: '15px' },
  statRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  circularStat: { display: 'flex', alignItems: 'center', gap: '10px' },
  statButton: {
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    color: '#00F0C8',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  gaugeContainer: { display: 'flex', justifyContent: 'center', marginTop: '20px' },
  bodySection: { flex: 1, padding: '25px 20px', overflowY: 'auto' },
  accountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #F0F0F5'
  },
  iconCircle: {
    width: '35px',
    height: '35px',
    borderRadius: '8px',
    backgroundColor: '#F5F5F9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowTitle: { fontSize: '14px', fontWeight: '600', color: '#2E2D77' },
  rowSub: { fontSize: '11px', color: '#A0A0BF', marginTop: '2px' },
  rowBalance: { fontSize: '15px', fontWeight: 'bold' },
  bottomNav: {
    height: '70px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTop: '1px solid #F0F0F5',
    paddingBottom: '10px',
    backgroundColor: '#fff'
  }
};
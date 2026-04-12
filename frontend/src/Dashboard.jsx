import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Consolidated icons to ensure the build finds them correctly
import {
  Mail,
  User,
  ArrowRightLeft,
  CreditCard,
  LayoutGrid,
  TrendingUp,
  Package,
  BarChart3,
  Minus,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  // Safe parsing to prevent build crashes if localStorage is empty
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/");
      return;
    }
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    // Date formatting matching Deutsche Bank style
    const now = new Date();
    const day = now.toLocaleDateString("de-DE", { day: "2-digit" });
    const month = now.toLocaleDateString("de-DE", { month: "short" }).toUpperCase();
    const year = now.getFullYear();
    setCurrentDate(`${day}. ${month}. ${year}`);

    // API Call to your Render backend
    axios
      .get(`https://bank-mvp.onrender.com/api/transactions/${parsedUser.email}`)
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("API Fetch error:", err));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="max-w-sm mx-auto h-screen flex flex-col bg-white font-sans overflow-hidden relative">
      
      {/* TOP NAV ICONS */}
      <div className="absolute top-6 right-6 flex gap-6 z-30 text-white">
        <div className="relative cursor-pointer hover:opacity-80 transition">
          <Mail size={24} strokeWidth={1.5} />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#001E62]" />
        </div>
        <div className="cursor-pointer hover:opacity-80 transition">
          <User size={24} strokeWidth={1.5} />
        </div>
      </div>

      {/* HEADER SECTION (DB Blue Gradient) */}
      <div className="bg-gradient-to-b from-[#001E62] to-[#003DA5] pt-16 pb-12 px-6 rounded-b-[40px] text-center text-white relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

        {/* Balance Circle */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="relative w-56 h-56 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/25" />
            <div className="absolute inset-2 rounded-full border border-white/15" />

            <div className="flex flex-col items-center justify-center">
              <span className="text-xs font-medium opacity-70 tracking-widest">EUR</span>
              <h1 className="text-5xl font-bold my-3 tracking-tight">191.519,01</h1>
              <div className="mt-4 border-t border-dotted border-white/40 pt-2">
                <p className="text-xs font-medium uppercase tracking-wider">{currentDate}</p>
              </div>
            </div>

            {/* Side UI Labels */}
            <div className="absolute right-0 top-1/2 transform translate-x-16 -translate-y-1/2 flex flex-col gap-6 text-xs font-medium text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-white/40" />
                <span>Invest</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <div className="w-6 h-px bg-white" />
                <span>Gesamt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-white/40" />
                <span>Konten</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-around gap-4 px-4 relative z-10">
          <ActionButton icon={<ArrowRightLeft size={24} />} label="Überweisen" />
          <ActionButton 
            icon={
              <div className="w-6 h-5 border-2 border-white flex items-center justify-around px-0.5">
                <div className="w-px h-3 bg-white" />
                <div className="w-px h-3 bg-white" />
                <div className="w-px h-3 bg-white" />
              </div>
            } 
            label="Bargeld-Code" 
          />
          <ActionButton icon={<CreditCard size={24} />} label="Geplant" />
        </div>
      </div>

      {/* SCROLLABLE ACCOUNTS & TRANSACTIONS */}
      <div className="flex-1 px-6 pt-8 overflow-y-auto pb-28">
        <h3 className="text-2xl font-bold mb-4 text-slate-900">Konten</h3>
        <div className="h-px bg-slate-200 mb-6" />

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

        <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">Transaktionen</h3>
        <div className="h-px bg-slate-200 mb-6" />

        {transactions.length > 0 ? (
          transactions.map((tx, idx) => (
            <Transaction
              key={tx._id || idx}
              title={tx.receiver === user.email ? "Zahlung erhalten" : "Überweisung"}
              amount={tx.amount.toLocaleString('de-DE')}
              negative={tx.receiver !== user.email}
              icon={tx.receiver === user.email ? <Plus size={18} /> : <Minus size={18} />}
            />
          ))
        ) : (
          <div className="text-center text-slate-400 py-4 italic">Keine aktuellen Buchungen</div>
        )}
      </div>

      {/* STICKY BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white/95 backdrop-blur-md border-t border-slate-100 flex justify-around items-center h-20 px-2 shadow-[0_-2px_8px_rgba(0,0,0,0.04)] z-50">
        <NavItem icon={<LayoutGrid size={20} />} label="Übersicht" active />
        <NavItem icon={<ArrowRightLeft size={20} />} label="Überweisen" />
        <NavItem icon={<TrendingUp size={20} />} label="Investieren" />
        <NavItem icon={<Package size={20} />} label="Produkte" />
        <NavItem icon={<BarChart3 size={20} />} label="Services" />
      </div>
    </div>
  );
}

// Sub-components defined inside to prevent "Not Defined" errors during build
function ActionButton({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center transition-all hover:bg-white/10 group-hover:shadow-lg">
        {icon}
      </div>
      <span className="text-[11px] font-medium uppercase tracking-wide text-white/90">{label}</span>
    </div>
  );
}

function AccountItem({ title, iban, balance }) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors px-2 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
          <CreditCard size={22} />
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">{title}</p>
          <p className="text-xs text-slate-500 font-mono">{iban}</p>
        </div>
      </div>
      <p className="font-bold text-slate-900 text-base">{balance} €</p>
    </div>
  );
}

function Transaction({ title, amount, negative, icon }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors px-2 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${negative ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}>
          {icon}
        </div>
        <span className="text-sm font-medium text-slate-700">{title}</span>
      </div>
      <span className={`text-sm font-bold ${negative ? "text-red-500" : "text-green-600"}`}>
        {negative ? "-" : "+"}{amount} €
      </span>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center flex-1 cursor-pointer py-2 group relative">
      <div className={`p-2 rounded-lg transition-all ${active ? "text-[#003DA5] bg-blue-50" : "text-slate-400 group-hover:text-slate-600"}`}>
        {icon}
      </div>
      <span className={`text-[10px] mt-1 font-medium ${active ? "text-[#003DA5] font-semibold" : "text-slate-500"}`}>{label}</span>
      {active && <div className="absolute bottom-0 w-6 h-1 bg-[#003DA5] rounded-t-full" />}
    </div>
  );
}
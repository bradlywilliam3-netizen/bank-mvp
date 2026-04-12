import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // Format date exactly like the DB app: 12. APR. 2026
    const now = new Date();
    const day = now.toLocaleDateString("de-DE", { day: "2-digit" });
    const month = now.toLocaleDateString("de-DE", { month: "short" }).toUpperCase();
    const year = now.getFullYear();
    setCurrentDate(`${day}. ${month}. ${year}`);
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-sm mx-auto h-screen flex flex-col bg-white font-sans overflow-hidden">
      {/* TOP NAV ICONS */}
      <div className="absolute top-6 right-6 flex gap-6 z-10 text-white text-2xl">
        <div className="relative cursor-pointer hover:opacity-80 transition">
          <Mail size={24} strokeWidth={1.5} />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#001E62]" />
        </div>
        <div className="cursor-pointer hover:opacity-80 transition">
          <User size={24} strokeWidth={1.5} />
        </div>
      </div>

      {/* HEADER SECTION (Deutsche Bank Blue) */}
      <div className="bg-gradient-to-b from-[#001E62] to-[#003DA5] pt-16 pb-12 px-6 rounded-b-[40px] text-center text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

        {/* Dotted Balance Circle */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Outer dotted circle */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/25"></div>

            {/* Inner solid circle accent */}
            <div className="absolute inset-2 rounded-full border border-white/15"></div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs font-medium opacity-70 tracking-widest">EUR</span>
              <h1 className="text-5xl font-bold my-3 tracking-tight">191.519,01</h1>
              <div className="mt-4 border-t border-dotted border-white/40 pt-2">
                <p className="text-xs font-medium uppercase tracking-wider">{currentDate}</p>
              </div>
            </div>

            {/* Side Labels */}
            <div className="absolute right-0 top-1/2 transform translate-x-16 -translate-y-1/2 flex flex-col gap-6 text-xs font-medium text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-white/40"></div>
                <span>Invest</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <div className="w-6 h-px bg-white"></div>
                <span>Gesamt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-white/40"></div>
                <span>Konten</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Circles */}
        <div className="flex justify-around gap-4 px-4 relative z-10">
          <ActionButton
            icon={<ArrowRightLeft size={24} />}
            label="Überweisen"
          />
          <ActionButton
            icon={
              <div className="w-6 h-5 border-2 border-white flex items-center justify-around px-0.5">
                <div className="w-px h-3 bg-white"></div>
                <div className="w-px h-3 bg-white"></div>
                <div className="w-px h-3 bg-white"></div>
              </div>
            }
            label="Bargeld-Code"
          />
          <ActionButton
            icon={<CreditCard size={24} />}
            label="Geplant"
          />
        </div>
      </div>

      {/* ACCOUNTS SECTION */}
      <div className="flex-1 px-6 pt-8 overflow-y-auto pb-24">
        {/* Konten Header */}
        <h3 className="text-2xl font-bold mb-4 text-slate-900">Konten</h3>
        <div className="h-px bg-slate-200 mb-6"></div>

        {/* BestKonto */}
        <AccountItem
          title="BestKonto"
          iban="DE85 8107 0024 0218 0081 00"
          balance="191.519,01"
        />

        {/* maxblue Depotkonto */}
        <AccountItem
          title="maxblue Depotkonto"
          iban="DE58 **** 0081 01"
          balance="4,92"
        />

        {/* Transactions Section */}
        <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">Transaktionen</h3>
        <div className="h-px bg-slate-200 mb-6"></div>

        <Transaction
          title="Amazon.de"
          amount="120,00"
          negative
          icon={<Minus size={18} />}
        />
        <Transaction
          title="Salary / Gehalt"
          amount="3.000,00"
          negative={false}
          icon={<Plus size={18} />}
        />
        <Transaction
          title="Netflix"
          amount="15,00"
          negative
          icon={<Minus size={18} />}
        />
        <Transaction
          title="Spotify"
          amount="12,99"
          negative
          icon={<Minus size={18} />}
        />
        <Transaction
          title="Supermarkt Rewe"
          amount="87,50"
          negative
          icon={<Minus size={18} />}
        />
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t border-slate-100 flex justify-around items-center h-20 px-2 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
        <NavItem icon={<LayoutGrid size={20} />} label="Übersicht" active />
        <NavItem icon={<ArrowRightLeft size={20} />} label="Überweisen" />
        <NavItem icon={<TrendingUp size={20} />} label="Investieren" />
        <NavItem icon={<Package size={20} />} label="Produkte" />
        <NavItem icon={<BarChart3 size={20} />} label="Services" />
      </div>
    </div>
  );
}

// Internal components to keep code clean

/**
 * ActionButton Component
 * Renders circular action buttons with icons and labels
 */
const ActionButton = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-2 cursor-pointer group">
    <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:border-white/50 group-hover:shadow-lg">
      {icon}
    </div>
    <span className="text-[11px] font-medium uppercase tracking-wide text-white/90">
      {label}
    </span>
  </div>
);

/**
 * AccountItem Component
 * Displays account information with balance
 */
const AccountItem = ({ title, iban, balance }) => (
  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 px-2 rounded transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
        <CreditCard size={22} />
      </div>
      <div>
        <p className="font-semibold text-slate-900 text-sm">{title}</p>
        <p className="text-xs text-slate-500 font-mono tracking-tight">{iban}</p>
      </div>
    </div>
    <p className="font-bold text-slate-900 text-base whitespace-nowrap ml-4">
      {balance} €
    </p>
  </div>
);

/**
 * Transaction Component
 * Displays individual transaction with amount and status
 */
const Transaction = ({ title, amount, negative, icon }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 px-2 rounded transition-colors">
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          negative
            ? "bg-red-50 text-red-500"
            : "bg-green-50 text-green-600"
        }`}
      >
        {icon}
      </div>
      <span className="text-sm font-medium text-slate-700">{title}</span>
    </div>
    <span
      className={`text-sm font-bold ${
        negative ? "text-red-500" : "text-green-600"
      }`}
    >
      {negative ? "-" : "+"}{amount} €
    </span>
  </div>
);

/**
 * NavItem Component
 * Bottom navigation item with icon, label, and active state
 */
const NavItem = ({ icon, label, active }) => (
  <div className="flex flex-col items-center flex-1 cursor-pointer py-2 group">
    <div
      className={`p-2 rounded-lg transition-all duration-200 ${
        active
          ? "text-[#003DA5] bg-blue-50"
          : "text-slate-400 group-hover:text-slate-600"
      }`}
    >
      {icon}
    </div>
    <span
      className={`text-[10px] mt-1 font-medium ${
        active ? "text-[#003DA5] font-semibold" : "text-slate-500"
      }`}
    >
      {label}
    </span>
    {active && (
      <div className="absolute bottom-0 w-6 h-1 bg-[#003DA5] rounded-t-full mt-1"></div>
    )}
  </div>
);
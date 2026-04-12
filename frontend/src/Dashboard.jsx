import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="absolute top-4 right-4 flex gap-5 z-10 text-white text-xl">
        <div className="relative">✉️<div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" /></div>
        <div>👤</div>
      </div>

      {/* HEADER SECTION (Deutsche Bank Blue) */}
      <div className="bg-gradient-to-b from-[#001E62] to-[#003DA5] pt-12 pb-8 px-5 rounded-b-[30px] text-center text-white relative">
        
        {/* Dotted Balance Circle */}
        <div className="flex justify-center mb-6">
          <div className="w-52 h-52 rounded-full border-2 border-dashed border-white/30 flex flex-col justify-center items-center">
            <span className="text-sm opacity-80">EUR</span>
            <h1 className="text-3xl font-bold my-2">191.519,01</h1>
            <div className="text-xs border-b border-dotted border-white pb-1">{currentDate}</div>
          </div>
        </div>

        {/* Action Circles */}
        <div className="flex justify-around">
          <ActionButton icon="€→" label="Überweisen" />
          <ActionButton icon="|||" label="Bargeld-Code" />
          <ActionButton icon="€↻" label="Geplant" />
        </div>
      </div>

      {/* ACCOUNTS SECTION */}
      <div className="flex-1 px-5 pt-6 overflow-y-auto pb-20">
        <h3 className="text-xl font-bold mb-4 text-[#001E62]">Konten</h3>

        {/* BestKonto */}
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

        <h3 className="text-xl font-bold mt-8 mb-4 text-[#001E62]">Transactions</h3>
        <Transaction title="Amazon.de" amount="-120,00 €" negative />
        <Transaction title="Salary / Gehalt" amount="+3.000,00 €" />
        <Transaction title="Netflix" amount="-15,00 €" negative />
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t border-gray-200 flex justify-around items-center h-20 pb-4">
        <NavItem icon="🟦" label="Übersicht" active />
        <NavItem icon="€⇄" label="Überweisen" />
        <NavItem icon="📈" label="Investieren" />
        <NavItem icon="👜" label="Produkte" />
        <NavItem icon="☰" label="Services" />
      </div>
    </div>
  );
}

// Internal components to keep code clean
const ActionButton = ({ icon, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-2 text-xl hover:bg-white/10 cursor-pointer">
      {icon}
    </div>
    <span className="text-[11px] font-medium">{label}</span>
  </div>
);

const AccountItem = ({ title, iban, balance }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <div className="text-2xl">💶</div>
      <div>
        <p className="font-bold text-[#001E62] text-[15px]">{title}</p>
        <p className="text-[12px] text-gray-500 font-mono">{iban}</p>
      </div>
    </div>
    <p className="font-bold text-[15px]">{balance} €</p>
  </div>
);

const Transaction = ({ title, amount, negative }) => (
  <div className="flex justify-between py-3 border-b border-gray-50">
    <span className="text-sm font-medium text-gray-700">{title}</span>
    <span className={`text-sm font-bold ${negative ? "text-red-500" : "text-green-600"}`}>
      {amount}
    </span>
  </div>
);

const NavItem = ({ icon, label, active }) => (
  <div className="flex flex-col items-center flex-1 cursor-pointer relative">
    <div className={`text-xl ${active ? "text-[#003DA5]" : "text-gray-400"}`}>{icon}</div>
    <span className={`text-[10px] mt-1 ${active ? "text-[#003DA5] font-bold" : "text-gray-500"}`}>{label}</span>
    {active && <div className="absolute -bottom-2 w-5 h-[3px] bg-[#003DA5]" />}
  </div>
); 
  
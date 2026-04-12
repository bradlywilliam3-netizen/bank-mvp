import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mail, 
  User, 
  ArrowRightLeft, 
  CreditCard, 
  LayoutGrid, 
  TrendingUp, 
  BarChart3, 
  Package,
  Search,
  ChevronRight
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDashboard = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) {
          navigate("/");
          return;
        }
        setUser(JSON.parse(savedUser));

        const now = new Date();
        const formattedDate = `${now.toLocaleDateString("de-DE", { day: "2-digit" })}. ${now.toLocaleDateString("de-DE", { month: "short" }).toUpperCase()}. ${now.getFullYear()}`;
        setCurrentDate(formattedDate);
      } catch (error) {
        console.error("Initialization error:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [navigate]);

  if (loading) {
    return <div className="h-screen w-full bg-[#001E62] flex items-center justify-center text-white">Laden...</div>;
  }

  if (!user) return null;

  // Values from previous implementation
  const mainBalance = "1.519,01";
  const kontoBalance = "1.506,49 €";
  const iban = "DE85 8107 0024 0218 0081 00";

  return (
    <div className="max-w-sm mx-auto h-screen flex flex-col bg-white font-sans overflow-hidden relative border-x border-gray-100 shadow-2xl">
      {/* HEADER SECTION */}
      <div className="bg-[#001E62] pt-6 pb-12 px-6 text-white relative flex-shrink-0">
        <div className="flex justify-end gap-6 mb-4">
          <div className="relative">
            <Mail size={24} strokeWidth={1.2} className="cursor-pointer" />
            <div className="absolute top-0 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-[#001E62]"></div>
          </div>
          <User size={24} strokeWidth={1.2} className="cursor-pointer" />
        </div>

        {/* BALANCE CIRCLE */}
        <div className="flex justify-center mb-10 relative">
          <div className="relative w-64 h-64 flex flex-col justify-center items-center">
            {/* Outer Dotted/Dashed Rings */}
            <div className="absolute inset-0 border-[1px] border-dashed border-white/20 rounded-full"></div>
            <div className="absolute inset-2 border-[1px] border-dotted border-white/40 rounded-full"></div>
            
            {/* Inner Content */}
            <span className="text-[11px] font-medium opacity-80 tracking-widest mb-1">EUR</span>
            <h1 className="text-[42px] font-bold tracking-tight">{mainBalance}</h1>
            
            <div className="mt-4 flex flex-col items-center">
              <div className="w-10 border-t border-white/20 mb-2"></div>
              <span className="text-[10px] font-medium tracking-widest opacity-90">{currentDate}</span>
              <div className="w-10 border-t border-white/20 mt-2"></div>
            </div>

            {/* Right side labels */}
            <div className="absolute right-[-25px] top-1/2 -translate-y-1/2 flex flex-col gap-6 text-[11px] font-medium text-white/50">
               <div className="flex items-center gap-2">
                 <div className="w-6 border-t border-white/20"></div>
                 <span>Invest</span>
               </div>
               <div className="flex items-center gap-2 text-white">
                 <div className="w-6 border-t border-white/40"></div>
                 <span className="font-semibold">Gesamt</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-6 border-t border-white/20"></div>
                 <span>Konten</span>
               </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex justify-around px-2">
          <QuickAction icon={<ArrowRightLeft size={26} strokeWidth={1.2} />} label="Überweisen" />
          <QuickAction icon={<div className="flex flex-col gap-1 items-center"><div className="w-6 h-0.5 bg-white/90"></div><div className="w-6 h-0.5 bg-white/90"></div><div className="w-6 h-0.5 bg-white/90"></div><div className="w-6 h-0.5 bg-white/90"></div></div>} label="Bargeld-Code" />
          <QuickAction icon={<CreditCard size={26} strokeWidth={1.2} />} label="Geplant" />
        </div>
      </div>

      {/* ACCOUNTS SECTION */}
      <div className="flex-1 bg-white rounded-t-[32px] -mt-6 px-6 pt-8 overflow-y-auto pb-24 relative z-10">
        <h3 className="text-2xl font-bold mb-6 text-[#001E62]">Konten</h3>
        
        {/* Account Item 1 */}
        <div className="flex justify-between items-start py-4 border-b border-gray-100">
          <div className="flex gap-4">
            <div className="mt-1 text-[#001E62]">
              <div className="border border-gray-300 rounded px-1 py-0.5 text-[8px] font-bold text-gray-500">€≡</div>
            </div>
            <div>
              <p className="font-bold text-base text-gray-900">BestKonto</p>
              <p className="text-[11px] text-gray-400 font-medium tracking-wider">{iban.substring(0, 4)}••••{iban.substring(iban.length - 7)}</p>
            </div>
          </div>
          <p className="font-bold text-base text-gray-900">{kontoBalance}</p>
        </div>

        {/* Account Item 2 */}
        <div className="flex justify-between items-start py-4 border-b border-gray-100">
          <div className="flex gap-4">
             <div className="mt-1 text-[#001E62]">
              <div className="border border-gray-300 rounded px-1 py-0.5 text-[8px] font-bold text-gray-500">€≡</div>
            </div>
            <div>
              <p className="font-bold text-base text-gray-900">maxblue Depotkonto</p>
              <p className="text-[11px] text-gray-400 font-medium tracking-wider">DE58••••0081 01</p>
            </div>
          </div>
          <p className="font-bold text-base text-gray-900">4,92 €</p>
        </div>

        {/* Account Item 3 */}
        <div className="flex justify-between items-start py-4 border-b border-gray-100 opacity-60">
          <div className="flex gap-4">
             <div className="mt-1 text-[#001E62]">
              <div className="border border-gray-300 rounded px-1 py-0.5 text-[8px] font-bold text-gray-500">€≡</div>
            </div>
            <div>
              <p className="font-bold text-base text-gray-900">maxblue Depotkonto</p>
              <p className="text-[11px] text-gray-400 font-medium tracking-wider">DE58••••0081 02</p>
            </div>
          </div>
          <p className="font-bold text-base text-gray-900">0,00 €</p>
        </div>
      </div>

      {/* STICKY BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-[#F8F9FA] border-t border-gray-200 flex justify-around items-center h-20 px-2 z-50">
        <NavItem icon={<div className="border-2 border-[#003DA5] p-0.5 rounded-sm"><div className="w-3 h-3 bg-[#003DA5]"></div></div>} label="Übersicht" active />
        <NavItem icon={<ArrowRightLeft size={22} strokeWidth={1.5} />} label="Überweisen" />
        <NavItem icon={<TrendingUp size={22} strokeWidth={1.5} />} label="Investieren" />
        <NavItem icon={<LayoutGrid size={22} strokeWidth={1.5} />} label="Produkte" />
        <NavItem icon={<User size={22} strokeWidth={1.5} />} label="Services" />
      </div>
    </div>
  );
}

function QuickAction({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-3 cursor-pointer group">
      <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:border-white/60">
        {icon}
      </div>
      <span className="text-[11px] font-medium text-white/80">{label}</span>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div className={`flex flex-col items-center flex-1 py-2 cursor-pointer transition-colors ${active ? "text-[#003DA5] bg-blue-100/30 rounded-lg" : "text-gray-400"}`}>
      <div className="mb-1">{icon}</div>
      <span className={`text-[10px] font-medium`}>{label}</span>
    </div>
  );
}

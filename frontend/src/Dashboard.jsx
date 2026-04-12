import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Mail, 
  User, 
  ArrowRightLeft, 
  CreditCard, 
  LayoutGrid, 
  TrendingUp, 
  BarChart3, 
  Package 
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

  // Loading state prevents the "f.H is null" error by waiting for context
  if (loading) {
    return <div className="h-screen w-full bg-[#001E62] flex items-center justify-center text-white">Laden...</div>;
  }

  if (!user) return null;

  return (
    <div className="max-w-sm mx-auto h-screen flex flex-col bg-white font-sans overflow-hidden relative">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-b from-[#001E62] to-[#003DA5] pt-16 pb-12 px-6 rounded-b-[40px] text-center text-white relative flex-shrink-0">
        <div className="absolute top-6 right-6 flex gap-6 z-30">
          <Mail size={24} strokeWidth={1.5} className="cursor-pointer" />
          <User size={24} strokeWidth={1.5} className="cursor-pointer" />
        </div>

        {/* BALANCE CIRCLE */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="w-56 h-56 rounded-full border-2 border-dashed border-white/25 flex flex-col justify-center items-center shadow-inner">
            <span className="text-xs font-medium opacity-70 tracking-widest">EUR</span>
            <h1 className="text-4xl font-bold my-2 tracking-tight">191.519,01</h1>
            <div className="mt-2 border-t border-dotted border-white/40 pt-2 text-[10px] uppercase tracking-wider">
              {currentDate}
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex justify-around gap-2 relative z-10">
          <QuickAction icon={<ArrowRightLeft size={24} />} label="Überweisen" />
          <QuickAction icon={<div className="font-bold text-xs">BC</div>} label="Bargeld-Code" />
          <QuickAction icon={<CreditCard size={24} />} label="Geplant" />
        </div>
      </div>

      {/* ACCOUNTS SECTION */}
      <div className="flex-1 px-6 pt-8 overflow-y-auto pb-24">
        <h3 className="text-xl font-bold mb-4 text-[#001E62]">Konten</h3>
        <div className="flex justify-between items-center py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors px-2 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[#001E62]">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">BestKonto</p>
              <p className="text-[10px] text-gray-500 font-mono">DE85 8107 0024 0218 0081 00</p>
            </div>
          </div>
          <p className="font-bold text-sm text-gray-900">191.519,01 €</p>
        </div>
      </div>

      {/* STICKY BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around items-center h-20 px-2 z-50">
        <NavItem icon={<LayoutGrid size={20} />} label="Übersicht" active />
        <NavItem icon={<ArrowRightLeft size={20} />} label="Überweisen" />
        <NavItem icon={<TrendingUp size={20} />} label="Invest" />
        <NavItem icon={<Package size={20} />} label="Produkte" />
        <NavItem icon={<BarChart3 size={20} />} label="Services" />
      </div>
    </div>
  );
}

// Helper Components to keep the main render clean
function QuickAction({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:border-white/60">
        {icon}
      </div>
      <span className="text-[9px] font-medium uppercase tracking-tight opacity-90">{label}</span>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div className={`flex flex-col items-center flex-1 py-2 cursor-pointer transition-colors ${active ? "text-[#003DA5]" : "text-gray-400 hover:text-gray-600"}`}>
      {icon}
      <span className={`text-[9px] mt-1 font-medium ${active ? "font-bold" : ""}`}>{label}</span>
      {active && <div className="absolute bottom-0 w-6 h-1 bg-[#003DA5] rounded-t-full" />}
    </div>
  );
}
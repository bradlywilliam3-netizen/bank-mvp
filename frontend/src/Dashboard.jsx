import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Standard imports - if this fails, the issue is your npm install
import { Mail, User, ArrowRightLeft, CreditCard, LayoutGrid, TrendingUp, Package, BarChart3, Minus, Plus } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) {
        navigate("/");
        return;
      }
      setUser(JSON.parse(savedUser));
    } catch (e) {
      console.error("Auth error", e);
      navigate("/");
    }

    const now = new Date();
    setCurrentDate(`${now.toLocaleDateString("de-DE", { day: "2-digit" })}. ${now.toLocaleDateString("de-DE", { month: "short" }).toUpperCase()}. ${now.getFullYear()}`);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="max-w-sm mx-auto h-screen flex flex-col bg-white font-sans overflow-hidden">
      {/* DB BLUE HEADER */}
      <div className="bg-gradient-to-b from-[#001E62] to-[#003DA5] pt-16 pb-12 px-6 rounded-b-[40px] text-center text-white relative">
        <div className="absolute top-6 right-6 flex gap-6 z-30">
          <Mail size={24} strokeWidth={1.5} />
          <User size={24} strokeWidth={1.5} />
        </div>

        {/* CIRCLE */}
        <div className="flex justify-center mb-8">
          <div className="w-56 h-56 rounded-full border-2 border-dashed border-white/25 flex flex-col justify-center items-center">
            <span className="text-xs opacity-70 tracking-widest">EUR</span>
            <h1 className="text-4xl font-bold my-2">191.519,01</h1>
            <div className="mt-2 border-t border-dotted border-white/40 pt-2 text-[10px] uppercase">
              {currentDate}
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex justify-around">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center"><ArrowRightLeft size={24} /></div>
            <span className="text-[10px]">Überweisen</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center text-xs">BC</div>
            <span className="text-[10px]">Bargeld-Code</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center"><CreditCard size={24} /></div>
            <span className="text-[10px]">Geplant</span>
          </div>
        </div>
      </div>

      {/* ACCOUNT LIST */}
      <div className="flex-1 px-6 pt-8 overflow-y-auto pb-24">
        <h3 className="text-xl font-bold mb-4 text-[#001E62]">Konten</h3>
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div>
            <p className="font-bold text-sm">BestKonto</p>
            <p className="text-[10px] text-gray-500 font-mono">DE85 8107 0024 0218 0081 00</p>
          </div>
          <p className="font-bold text-sm">191.519,01 €</p>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t border-gray-100 flex justify-around items-center h-20 px-2 z-50">
        <div className="flex flex-col items-center text-[#003DA5]"><LayoutGrid size={20} /><span className="text-[10px]">Übersicht</span></div>
        <div className="flex flex-col items-center text-gray-400"><ArrowRightLeft size={20} /><span className="text-[10px]">Überweisen</span></div>
        <div className="flex flex-col items-center text-gray-400"><TrendingUp size={20} /><span className="text-[10px]">Invest</span></div>
      </div>
    </div>
  );
}
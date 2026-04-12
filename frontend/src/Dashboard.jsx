import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Importing icons individually is safer for Vercel builds
import Mail from "lucide-react/dist/esm/icons/mail";
import User from "lucide-react/dist/esm/icons/user";
import ArrowRightLeft from "lucide-react/dist/esm/icons/arrow-right-left";
import CreditCard from "lucide-react/dist/esm/icons/credit-card";
import LayoutGrid from "lucide-react/dist/esm/icons/layout-grid";
import TrendingUp from "lucide-react/dist/esm/icons/trending-up";
import Package from "lucide-react/dist/esm/icons/package";
import BarChart3 from "lucide-react/dist/esm/icons/bar-chart-3";
import Minus from "lucide-react/dist/esm/icons/minus";
import Plus from "lucide-react/dist/esm/icons/plus";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/");
    } else {
      setUserData(JSON.parse(savedUser));
    }

    const now = new Date();
    const day = now.toLocaleDateString("de-DE", { day: "2-digit" });
    const month = now.toLocaleDateString("de-DE", { month: "short" }).toUpperCase();
    const year = now.getFullYear();
    setCurrentDate(`${day}. ${month}. ${year}`);
  }, [navigate]);

  if (!userData) return <div className="h-screen bg-[#001E62]" />; // Shows blue while loading instead of white

  return (
    <div className="max-w-sm mx-auto h-screen flex flex-col bg-white font-sans overflow-hidden relative">
      {/* HEADER */}
      <div className="bg-gradient-to-b from-[#001E62] to-[#003DA5] pt-16 pb-12 px-6 rounded-b-[40px] text-center text-white relative flex-shrink-0">
        <div className="absolute top-6 right-6 flex gap-6 z-30">
           <Mail size={24} />
           <User size={24} />
        </div>

        {/* BALANCE CIRCLE */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="w-56 h-56 rounded-full border-2 border-dashed border-white/25 flex flex-col justify-center items-center">
            <span className="text-xs opacity-70">EUR</span>
            <h1 className="text-5xl font-bold my-3">191.519,01</h1>
            <div className="mt-4 border-t border-dotted border-white/40 pt-2 text-xs uppercase">
              {currentDate}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-around gap-4 px-4 relative z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center"><ArrowRightLeft size={24} /></div>
            <span className="text-[10px] uppercase">Überweisen</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center">BC</div>
            <span className="text-[10px] uppercase">Bargeld-Code</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center"><CreditCard size={24} /></div>
            <span className="text-[10px] uppercase">Geplant</span>
          </div>
        </div>
      </div>

      {/* ACCOUNTS */}
      <div className="flex-1 px-6 pt-8 overflow-y-auto pb-24">
        <h3 className="text-2xl font-bold mb-4">Konten</h3>
        <div className="flex justify-between items-center py-4 border-b">
          <div>
            <p className="font-bold text-[#001E62]">BestKonto</p>
            <p className="text-xs text-gray-500">DE85 8107 0024 0218 0081 00</p>
          </div>
          <p className="font-bold text-lg">191.519,01 €</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t flex justify-around items-center h-20 z-50">
        <div className="flex flex-col items-center text-[#003DA5]"><LayoutGrid size={20} /><span className="text-[10px]">Übersicht</span></div>
        <div className="flex flex-col items-center text-gray-400"><ArrowRightLeft size={20} /><span className="text-[10px]">Überweisen</span></div>
        <div className="flex flex-col items-center text-gray-400"><TrendingUp size={20} /><span className="text-[10px]">Investieren</span></div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import {
  Gift,
  Diamond,
  Crown,
  Sparkles,
  Trophy,
  ArrowLeft,
  Flame,
  Send,
  History,
  CheckCircle2,
} from "lucide-react";

export interface GiftsPageProps {
  onBack?: () => void;
  onSendGift?: (gift: any) => void;
}

export function GiftsPage({ onBack, onSendGift }: GiftsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Popular");
  const [diamonds, setDiamonds] = useState<number>(25000);
  const [selectedGift, setSelectedGift] = useState<any | null>(null);
  const [comboCount, setComboCount] = useState<number>(1);
  const [sentAnimation, setSentAnimation] = useState<string | null>(null);

  const categories = ["Popular", "Luxury", "SVIP", "Animated", "Rides", "Frames"];

  const giftsCatalog = [
    {
      id: "gift-1",
      name: "🌹 Love Rose",
      price: 10,
      category: "Popular",
      icon: "🌹",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "gift-2",
      name: "💎 Diamond Crown",
      price: 500,
      category: "Popular",
      icon: "👑",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "gift-3",
      name: "🏎️ Royal Lamborghini Ride",
      price: 5000,
      category: "Luxury",
      icon: "🏎️",
      image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "gift-4",
      name: "🏰 SVIP Castle Palace",
      price: 20000,
      category: "SVIP",
      icon: "🏰",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "gift-5",
      name: "🐉 Fire Dragon Attack",
      price: 15000,
      category: "Animated",
      icon: "🐉",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "gift-6",
      name: "🦁 Golden Lion Avatar Frame",
      price: 2500,
      category: "Frames",
      icon: "🦁",
      image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=150&q=80",
    },
  ];

  const filteredGifts = giftsCatalog.filter((g) => g.category === selectedCategory);

  const handleSendGift = () => {
    if (!selectedGift) return;
    const totalCost = selectedGift.price * comboCount;
    if (diamonds < totalCost) {
      alert("Not enough diamonds! Please refill.");
      return;
    }
    setDiamonds((prev) => prev - totalCost);
    setSentAnimation(`${selectedGift.name} x${comboCount} Sent Successfully! ✨`);
    if (onSendGift) onSendGift(selectedGift);
    setTimeout(() => setSentAnimation(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#070512] text-slate-100 flex flex-col font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0c081a]/90 backdrop-blur-md border-b border-amber-900/30 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-pink-500 text-white shadow-md shadow-amber-500/30">
              <Gift className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-wide bg-gradient-to-r from-amber-300 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Royal Gift Store
              </h1>
              <p className="text-[10px] text-amber-300/80 font-medium">
                Send Luxury Gifts & Animated Effects
              </p>
            </div>
          </div>
        </div>

        {/* Diamond Wallet */}
        <div className="flex items-center gap-1.5 bg-pink-500/20 px-3 py-1.5 rounded-2xl border border-pink-500/40 text-pink-300 font-extrabold text-xs shadow-md">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>{diamonds.toLocaleString()} 💎</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-4">
        {/* Toast Alert */}
        {sentAnimation && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 to-pink-600 px-6 py-3 rounded-full text-white font-extrabold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5" />
            <span>{sentAnimation}</span>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-amber-500 to-pink-600 text-white shadow-md shadow-amber-500/20"
                  : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gifts Grid Catalog */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
          {filteredGifts.map((gift) => {
            const isSelected = selectedGift?.id === gift.id;
            return (
              <div
                key={gift.id}
                onClick={() => setSelectedGift(gift)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center space-y-2 relative ${
                  isSelected
                    ? "bg-gradient-to-b from-pink-950/60 to-purple-950/60 border-pink-500 ring-2 ring-pink-500/50 shadow-xl"
                    : "bg-[#0d091e] border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="text-4xl my-1">{gift.icon}</div>
                <h3 className="font-bold text-xs text-white truncate max-w-full">
                  {gift.name}
                </h3>
                <div className="flex items-center gap-1 text-[11px] font-extrabold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>{gift.price.toLocaleString()} 💎</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Gift Action Bar */}
        {selectedGift && (
          <div className="bg-[#100b26] border border-amber-500/40 rounded-3xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedGift.icon}</span>
                <div>
                  <h4 className="font-extrabold text-sm text-white">
                    {selectedGift.name}
                  </h4>
                  <p className="text-xs text-amber-300 font-bold">
                    Cost: {(selectedGift.price * comboCount).toLocaleString()} Diamonds
                  </p>
                </div>
              </div>

              {/* Combo Multipliers */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
                {[1, 10, 66, 99, 520].map((num) => (
                  <button
                    key={num}
                    onClick={() => setComboCount(num)}
                    className={`px-2.5 py-1 rounded-xl transition ${
                      comboCount === num
                        ? "bg-pink-600 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    x{num}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSendGift}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-pink-500/20 active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Gift Now</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

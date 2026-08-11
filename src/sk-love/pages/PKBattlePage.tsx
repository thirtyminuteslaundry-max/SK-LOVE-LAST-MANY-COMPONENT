import React, { useState, useEffect } from "react";
import {
  Swords,
  Trophy,
  Flame,
  Timer,
  Gift,
  Zap,
  Users,
  ArrowLeft,
  Crown,
  Play,
  ShieldAlert,
} from "lucide-react";

export interface PKBattlePageProps {
  onBack?: () => void;
  onOpenGiftPicker?: () => void;
}

export function PKBattlePage({ onBack, onOpenGiftPicker }: PKBattlePageProps) {
  const [timeLeft, setTimeLeft] = useState<number>(180); // 3 minutes battle
  const [blueScore, setBlueScore] = useState<number>(1450);
  const [redScore, setRedScore] = useState<number>(1820);
  const [battleStatus, setBattleStatus] = useState<"active" | "ended">("active");

  useEffect(() => {
    if (timeLeft <= 0) {
      setBattleStatus("ended");
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const totalScore = blueScore + redScore || 1;
  const bluePercent = Math.round((blueScore / totalScore) * 100);
  const redPercent = 100 - bluePercent;

  const handleSendGiftToTeam = (team: "blue" | "red", amount: number) => {
    if (team === "blue") setBlueScore((prev) => prev + amount);
    else setRedScore((prev) => prev + amount);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#080512] text-slate-100 flex flex-col font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0c071c]/90 backdrop-blur-md border-b border-amber-900/30 px-4 py-3 flex items-center justify-between shadow-lg">
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
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white shadow-md shadow-amber-500/30">
              <Swords className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-wide bg-gradient-to-r from-amber-300 via-rose-200 to-pink-200 bg-clip-text text-transparent">
                PK Battle Zone
              </h1>
              <p className="text-[10px] text-amber-300/80 font-medium">
                Live Host vs Host Arena
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setTimeLeft(180);
            setBlueScore(1200);
            setRedScore(1200);
            setBattleStatus("active");
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white text-xs font-bold shadow-lg shadow-amber-500/25 active:scale-95 transition"
        >
          <Zap className="w-4 h-4" />
          <span>New PK Match</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-4">
        {/* Active Battle Arena */}
        <div className="bg-[#0f0922] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl relative space-y-4 p-4">
          {/* Top Timer & Status Header */}
          <div className="flex items-center justify-between bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
              <Flame className="w-5 h-5 animate-bounce text-amber-500" />
              <span>PK ARENA #1</span>
            </div>

            <div className="flex items-center gap-1.5 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 font-black text-xs">
              <Timer className="w-4 h-4" />
              <span>{battleStatus === "active" ? formatTime(timeLeft) : "MATCH ENDED"}</span>
            </div>

            <div className="text-xs font-bold text-slate-300">
              {battleStatus === "active" ? "⚔️ In Progress" : "🏆 Winner Declared"}
            </div>
          </div>

          {/* PK Dual Player Screen Split */}
          <div className="grid grid-cols-2 gap-2 relative rounded-2xl overflow-hidden border border-slate-800 bg-black min-h-[300px]">
            {/* Blue Side - Host 1 */}
            <div className="relative flex flex-col items-center justify-between p-4 bg-gradient-to-b from-blue-950/60 to-black">
              <div className="flex flex-col items-center gap-1.5 z-10">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="Blue Host"
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500 shadow-lg shadow-blue-500/50"
                  />
                  {blueScore > redScore && (
                    <Crown className="w-6 h-6 text-amber-400 absolute -top-3 left-1/2 -translate-x-1/2" />
                  )}
                </div>
                <h3 className="font-extrabold text-xs text-white">Host Priya</h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600 text-white shadow">
                  BLUE TEAM
                </span>
              </div>

              <div className="z-10 text-center">
                <p className="text-xl font-black text-blue-400">{blueScore.toLocaleString()} pts</p>
              </div>

              <button
                onClick={() => handleSendGiftToTeam("blue", 200)}
                className="z-10 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/40 transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Gift className="w-4 h-4" />
                <span>Gift Blue (+200)</span>
              </button>
            </div>

            {/* VS Badge Center Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-gradient-to-tr from-amber-500 to-rose-600 p-2.5 rounded-full shadow-xl shadow-amber-500/50 border-2 border-white animate-pulse">
              <Swords className="w-6 h-6 text-white" />
            </div>

            {/* Red Side - Host 2 */}
            <div className="relative flex flex-col items-center justify-between p-4 bg-gradient-to-b from-rose-950/60 to-black">
              <div className="flex flex-col items-center gap-1.5 z-10">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                    alt="Red Host"
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-rose-500 shadow-lg shadow-rose-500/50"
                  />
                  {redScore > blueScore && (
                    <Crown className="w-6 h-6 text-amber-400 absolute -top-3 left-1/2 -translate-x-1/2" />
                  )}
                </div>
                <h3 className="font-extrabold text-xs text-white">Host Jubair</h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-600 text-white shadow">
                  RED TEAM
                </span>
              </div>

              <div className="z-10 text-center">
                <p className="text-xl font-black text-rose-400">{redScore.toLocaleString()} pts</p>
              </div>

              <button
                onClick={() => handleSendGiftToTeam("red", 200)}
                className="z-10 w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/40 transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Gift className="w-4 h-4" />
                <span>Gift Red (+200)</span>
              </button>
            </div>
          </div>

          {/* PK Progress Score Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold px-1">
              <span className="text-blue-400">Blue: {bluePercent}%</span>
              <span className="text-rose-400">Red: {redPercent}%</span>
            </div>
            <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500"
                style={{ width: `${bluePercent}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all duration-500"
                style={{ width: `${redPercent}%` }}
              />
            </div>
          </div>

          {/* Global Gift Store Trigger */}
          <div className="flex justify-center pt-2">
            <button
              onClick={onOpenGiftPicker}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition flex items-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>Open Gift Store</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

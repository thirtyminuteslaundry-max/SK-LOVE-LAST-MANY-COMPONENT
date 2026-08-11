import React, { useState } from "react";
import {
  Gamepad2,
  Trophy,
  Coins,
  Sparkles,
  ArrowLeft,
  Flame,
  Play,
  RotateCcw,
  Zap,
} from "lucide-react";
import CasinoGame from "../games/CasinoGame";
import FerryWheelGame from "../games/FerryWheelGame";
import TeenPattiGame from "../games/TeenPattiGame";

export interface GamesPageProps {
  onBack?: () => void;
}

export function GamesPage({ onBack }: GamesPageProps) {
  const [selectedGame, setSelectedGame] = useState<
    "none" | "casino" | "ferry" | "teenpatti"
  >("none");

  const [coins, setCoins] = useState<number>(50000);

  const games = [
    {
      id: "casino",
      title: "🎰 Royal Casino Slots",
      description: "Spin the reels for up to 500x multipliers & massive diamond prizes!",
      image: "/game-casino.jpg",
      players: 1420,
      badge: "HOT MULTIPLIER",
    },
    {
      id: "ferry",
      title: "🎡 Royal Ferry Wheel",
      description: "Place bets on lucky animals & cars to win instant coin rewards!",
      image: "/game-ferry.jpg",
      players: 980,
      badge: "POPULAR",
    },
    {
      id: "teenpatti",
      title: "🃏 Teen Patti Deluxe",
      description: "Classic 3-card poker table against live SK LOVE players!",
      image: "/game-teenpatti.jpg",
      players: 2310,
      badge: "HIGH STAKES",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070512] text-slate-100 flex flex-col font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0b081a]/90 backdrop-blur-md border-b border-purple-900/30 px-4 py-3 flex items-center justify-between shadow-lg">
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
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-amber-500 text-white shadow-md shadow-purple-500/30">
              <Gamepad2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-wide bg-gradient-to-r from-amber-300 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Games Arena
              </h1>
              <p className="text-[10px] text-purple-300/80 font-medium">
                Play Casino, Ferry Wheel & Teen Patti
              </p>
            </div>
          </div>
        </div>

        {/* Coin Balance */}
        <div className="flex items-center gap-1.5 bg-amber-500/20 px-3 py-1.5 rounded-2xl border border-amber-500/40 text-amber-300 font-extrabold text-xs shadow-md">
          <Coins className="w-4 h-4 text-amber-400" />
          <span>{coins.toLocaleString()} Coins</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-4">
        {selectedGame !== "none" ? (
          /* Selected Interactive Game Screen */
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedGame("none")}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>All Games</span>
                </button>
                <h2 className="font-extrabold text-sm text-amber-300 uppercase">
                  {selectedGame === "casino"
                    ? "🎰 Royal Casino Slots"
                    : selectedGame === "ferry"
                    ? "🎡 Royal Ferry Wheel"
                    : "🃏 Teen Patti Deluxe"}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCoins((prev) => prev + 10000)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30"
                >
                  +10K Refill
                </button>
              </div>
            </div>

            {/* Game Canvas Container */}
            <div className="bg-[#0e0a22] border border-purple-500/30 rounded-3xl p-4 shadow-2xl min-h-[400px]">
              {selectedGame === "casino" && (
                <CasinoGame
                  balance={coins}
                  onBalance={setCoins}
                  onClose={() => setSelectedGame("none")}
                />
              )}
              {selectedGame === "ferry" && (
                <FerryWheelGame
                  balance={coins}
                  onBalance={setCoins}
                  onClose={() => setSelectedGame("none")}
                />
              )}
              {selectedGame === "teenpatti" && (
                <TeenPattiGame
                  balance={coins}
                  onBalance={setCoins}
                  onClose={() => setSelectedGame("none")}
                />
              )}
            </div>
          </div>
        ) : (
          /* Games Catalog List */
          <div className="space-y-4">
            {/* Top Winners Leaderboard Banner */}
            <div className="bg-gradient-to-r from-amber-600/30 via-purple-900/40 to-indigo-900/30 border border-amber-500/40 rounded-3xl p-4 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500 rounded-2xl text-slate-950 font-black shadow-lg shadow-amber-500/30">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-amber-200">
                    👑 Top Game Winner Today
                  </h3>
                  <p className="text-xs text-slate-300 font-semibold">
                    Player <span className="text-pink-300 font-bold">Jubair Boss</span> won{" "}
                    <span className="text-amber-300 font-black">2,500,000 Coins!</span>
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-xs font-extrabold text-amber-300 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-500/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Jackpot Active</span>
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {games.map((g) => (
                <div
                  key={g.id}
                  onClick={() => setSelectedGame(g.id as any)}
                  className="group bg-[#0e0a22] hover:bg-[#130d2d] border border-slate-800 hover:border-purple-500/60 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-purple-500/20 flex flex-col justify-between"
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                        {g.badge}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        {g.players} Online
                      </span>
                    </div>

                    <h3 className="font-black text-base text-white group-hover:text-amber-300 transition">
                      {g.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {g.description}
                    </p>
                  </div>

                  <div className="p-4 pt-0">
                    <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:from-purple-500 group-hover:to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2">
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

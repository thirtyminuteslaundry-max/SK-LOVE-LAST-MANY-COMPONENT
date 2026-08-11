import React, { useState } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Eye,
  Heart,
  MessageSquare,
  Gift,
  Swords,
  Sparkles,
  ArrowLeft,
  Share2,
  Sliders,
  Play,
  UserCheck,
  Send,
} from "lucide-react";

export interface VideoStreamPageProps {
  onBack?: () => void;
  onOpenGiftPicker?: () => void;
  onStartPKBattle?: () => void;
}

export function VideoStreamPage({
  onBack,
  onOpenGiftPicker,
  onStartPKBattle,
}: VideoStreamPageProps) {
  const [activeTab, setActiveTab] = useState<"all" | "following" | "popular">("all");
  const [selectedStream, setSelectedStream] = useState<any | null>(null);
  const [isCameraOff, setIsCameraOff] = useState<boolean>(false);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [heartCount, setHeartCount] = useState<number>(1280);
  const [chatMessage, setChatMessage] = useState<string>("");
  const [chatList, setChatList] = useState<
    { id: string; user: string; text: string; avatar?: string }[]
  >([
    {
      id: "1",
      user: "Nusrat Jahan",
      text: "Awesome live stream! Love the music! ❤️",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "2",
      user: "Tanvir Boss",
      text: "Sent 100 Diamonds! 💎✨",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    },
  ]);

  const liveStreams = [
    {
      id: "stream-1",
      title: "✨ SK LOVE Official Live Dance & Chat",
      streamerName: "Priya Sharma",
      streamerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      viewers: 1420,
      tags: ["Dance", "Music", "Bangla"],
      coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "stream-2",
      title: "🎤 Live Song Request Night",
      streamerName: "Arif Rahat",
      streamerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      viewers: 850,
      tags: ["Singing", "Guitar"],
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "stream-3",
      title: "⚔️ High Stakes PK Battle Stream",
      streamerName: "Jubair vs Rock",
      streamerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      viewers: 2310,
      tags: ["PK Battle", "Hot"],
      coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatList((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: " You",
        text: chatMessage,
      },
    ]);
    setChatMessage("");
  };

  return (
    <div className="min-h-screen bg-[#070611] text-slate-100 flex flex-col font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a081a]/90 backdrop-blur-md border-b border-rose-900/30 px-4 py-3 flex items-center justify-between shadow-lg">
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
            <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-md shadow-rose-500/30">
              <Video className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-wide bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200 bg-clip-text text-transparent">
                Video Live Streaming
              </h1>
              <p className="text-[10px] text-rose-300/80 font-medium">
                Watch & Broadcast Live Video Streams
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedStream({
              id: "my-live-stream",
              title: "📹 My Official Live Stream",
              streamerName: "You (Host)",
              streamerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
              viewers: 12,
              tags: ["Host", "Live"],
              coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
            });
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-bold shadow-lg shadow-rose-500/25 active:scale-95 transition"
        >
          <Video className="w-4 h-4" />
          <span>Go Live</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-4">
        {selectedStream ? (
          /* Live Stream Watcher / Host Player View */
          <div className="bg-[#0e0c22] border border-rose-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col space-y-3">
            {/* Video Player Display */}
            <div className="relative w-full h-[360px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={selectedStream.coverImage}
                alt={selectedStream.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c22] via-transparent to-black/60" />

              {/* Player Top Controls */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-md p-1.5 pr-3 rounded-full border border-white/10">
                  <img
                    src={selectedStream.streamerAvatar}
                    alt={selectedStream.streamerName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-500"
                  />
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">
                      {selectedStream.streamerName}
                    </p>
                    <span className="text-[9px] text-pink-300 font-medium">LIVE Host</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-rose-600 px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-md">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{selectedStream.viewers}</span>
                  </div>
                  <button
                    onClick={() => setSelectedStream(null)}
                    className="px-3 py-1 bg-black/60 hover:bg-black text-xs font-bold rounded-full text-slate-200"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Streamer Controls Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMicMuted(!isMicMuted)}
                    className={`p-2 rounded-xl backdrop-blur-md border ${
                      isMicMuted
                        ? "bg-rose-500/30 border-rose-500/50 text-rose-300"
                        : "bg-black/50 border-white/20 text-white"
                    }`}
                  >
                    {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setIsCameraOff(!isCameraOff)}
                    className={`p-2 rounded-xl backdrop-blur-md border ${
                      isCameraOff
                        ? "bg-rose-500/30 border-rose-500/50 text-rose-300"
                        : "bg-black/50 border-white/20 text-white"
                    }`}
                  >
                    {isCameraOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {onStartPKBattle && (
                    <button
                      onClick={onStartPKBattle}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-bold shadow-md"
                    >
                      <Swords className="w-4 h-4" />
                      <span>PK Battle</span>
                    </button>
                  )}
                  <button
                    onClick={() => setHeartCount((prev) => prev + 1)}
                    className="p-2 rounded-full bg-rose-600 text-white hover:scale-110 active:scale-95 transition shadow-lg shadow-rose-600/40"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Stream Info & Chat */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-rose-900/30 pb-2">
                <h2 className="font-bold text-sm text-white">{selectedStream.title}</h2>
                <button
                  onClick={onOpenGiftPicker}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs font-bold shadow-md"
                >
                  <Gift className="w-4 h-4" />
                  <span>Send Gift</span>
                </button>
              </div>

              {/* Stream Chat */}
              <div className="space-y-2">
                <div className="h-40 overflow-y-auto bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-2 text-xs">
                  {chatList.map((c) => (
                    <div key={c.id} className="flex items-start gap-2">
                      {c.avatar && (
                        <img
                          src={c.avatar}
                          alt={c.user}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <span className="font-bold text-rose-300">{c.user}: </span>
                        <span className="text-slate-200">{c.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Send a live comment..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* Live Stream Cards List */
          <div className="space-y-3">
            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === "all"
                    ? "bg-rose-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🔥 Trending Live
              </button>
              <button
                onClick={() => setActiveTab("following")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === "following"
                    ? "bg-rose-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                👥 Following
              </button>
            </div>

            {/* Stream Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveStreams.map((stream) => (
                <div
                  key={stream.id}
                  onClick={() => setSelectedStream(stream)}
                  className="group bg-[#0e0c22] border border-slate-800 hover:border-rose-500/50 rounded-2xl overflow-hidden cursor-pointer transition shadow-lg hover:shadow-rose-500/10 flex flex-col"
                >
                  <div className="relative w-full h-44 bg-slate-900 overflow-hidden">
                    <img
                      src={stream.coverImage}
                      alt={stream.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>LIVE</span>
                    </div>

                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                      <Eye className="w-3 h-3" />
                      <span>{stream.viewers}</span>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                      <img
                        src={stream.streamerAvatar}
                        alt={stream.streamerName}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-500"
                      />
                      <span className="text-xs font-bold text-white truncate">
                        {stream.streamerName}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 space-y-1.5">
                    <h3 className="font-bold text-xs text-white truncate group-hover:text-rose-300 transition">
                      {stream.title}
                    </h3>
                    <div className="flex gap-1.5">
                      {stream.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-semibold px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/20"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
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

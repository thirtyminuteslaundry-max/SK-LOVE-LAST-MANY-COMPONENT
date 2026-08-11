import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Music,
  Users,
  Plus,
  Volume2,
  VolumeX,
  Lock,
  Globe,
  Radio,
  Send,
  Sparkles,
  Gift,
  ArrowLeft,
  Crown,
  Smile,
  Settings,
  ShieldAlert,
  Headphones,
  Gamepad2,
  X,
  Palette,
  Heart,
  Flame,
  Star,
  Share2,
  Swords,
  ChevronRight,
  TrendingUp,
  Volume1
} from "lucide-react";

// Theme image imports
import theme1 from "../assets/party-themes/theme-1.jpg";
import theme2 from "../assets/party-themes/theme-2.jpg";
import theme3 from "../assets/party-themes/theme-3.jpg";
import theme4 from "../assets/party-themes/theme-4.jpg";
import theme5 from "../assets/party-themes/theme-5.jpg";
import theme6 from "../assets/party-themes/theme-6.jpg";

// Frame image imports
import frameKing from "../assets/frames/king.png";
import frameQueen from "../assets/frames/queen.png";
import frameFair from "../assets/frames/fair.png";
import frameEgol from "../assets/frames/egol.png";
import frameHost from "../assets/frames/host-premium.png";

export interface AudioPartyPageProps {
  // Navigation & Active State
  isPartyRoomOpen?: boolean;
  activePartyRoom?: any;
  partyRooms?: any[];
  partySeats?: any[];
  currentUserId?: number | string;
  currentUser?: any;
  isHost?: boolean;
  
  // Audio & Mic
  isMicMuted?: boolean;
  onToggleMic?: () => void;
  
  // Actions
  onBack?: () => void;
  onJoinRoom?: (room: any) => void;
  onLeaveRoom?: () => void;
  onCreateRoom?: (roomData: any) => void;
  onJoinSeat?: (seatIndex: number) => void;
  onLeaveSeat?: (seatIndex: number) => void;
  onMuteSeat?: (seatIndex: number, muted: boolean) => void;
  onKickSeat?: (seatIndex: number) => void;
  
  // Popups & Tools
  onOpenGiftPicker?: (recipient?: any) => void;
  onOpenGameLauncher?: () => void;
  onOpenProfile?: (user: any) => void;

  // Chat & Gifts
  chatMessages?: any[];
  onSendChat?: (text: string) => void;
  
  // Theme & Settings
  currentTheme?: string;
  onSelectTheme?: (themeUrl: string) => void;
}

const THEME_LIST = [
  { id: "theme-1", name: "Royal Purple", url: theme1 },
  { id: "theme-2", name: "Cyber Neon", url: theme2 },
  { id: "theme-3", name: "Golden Luxury", url: theme3 },
  { id: "theme-4", name: "Night Lounge", url: theme4 },
  { id: "theme-5", name: "Starry Galaxy", url: theme5 },
  { id: "theme-6", name: "Sunset Vibes", url: theme6 },
];

export function AudioPartyPage({
  isPartyRoomOpen: externalIsOpen = false,
  activePartyRoom: externalActiveRoom = null,
  partyRooms: externalPartyRooms = [],
  partySeats: externalSeats = [],
  currentUserId,
  currentUser,
  isHost = false,
  isMicMuted: externalMicMuted = false,
  onToggleMic,
  onBack,
  onJoinRoom,
  onLeaveRoom,
  onCreateRoom,
  onJoinSeat,
  onLeaveSeat,
  onMuteSeat,
  onKickSeat,
  onOpenGiftPicker,
  onOpenGameLauncher,
  onOpenProfile,
  chatMessages = [],
  onSendChat,
  currentTheme: externalTheme,
  onSelectTheme,
}: AudioPartyPageProps) {
  // Local fallback states for standalone mode
  const [internalActiveCategory, setInternalActiveCategory] = useState<string>("All");
  const [internalIsMicMuted, setInternalIsMicMuted] = useState<boolean>(false);
  const [internalActiveRoom, setInternalActiveRoom] = useState<any>(null);
  const [internalChatInput, setInternalChatInput] = useState<string>("");
  const [isThemePickerOpen, setIsThemePickerOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedSeatForMenu, setSelectedSeatForMenu] = useState<any>(null);

  // New Room Form
  const [newRoomTitle, setNewRoomTitle] = useState("");
  const [newRoomSeats, setNewRoomSeats] = useState<number>(8);
  const [newRoomTheme, setNewRoomTheme] = useState(theme1);

  // Determine effective values
  const isRoomActive = externalIsOpen || Boolean(internalActiveRoom);
  const room = externalActiveRoom || internalActiveRoom;
  const isMicMuted = onToggleMic ? externalMicMuted : internalIsMicMuted;
  const activeTheme = externalTheme || room?.bgTheme || theme1;

  // Default Mock Rooms if external is empty
  const defaultRooms = [
    {
      id: 101,
      title: "🔥 SK LOVE VIP Voice Lounge",
      hostName: "Jubair Ahmed",
      hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      viewerCount: 342,
      category: "VIP",
      isPrivate: false,
      seatsCount: 8,
      occupiedSeats: 5,
      totalCoins: 125000,
    },
    {
      id: 102,
      title: "🎵 Late Night Chill & Live Songs",
      hostName: "Samia Khan",
      hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      viewerCount: 189,
      category: "Music",
      isPrivate: false,
      seatsCount: 12,
      occupiedSeats: 8,
      totalCoins: 84000,
    },
    {
      id: 103,
      title: "🎮 Teen Patti & Ludo Gaming Lounge",
      hostName: "Raju Gaming",
      hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      viewerCount: 210,
      category: "Gaming",
      isPrivate: false,
      seatsCount: 8,
      occupiedSeats: 8,
      totalCoins: 62000,
    },
    {
      id: 104,
      title: "👑 Royal Agency Official Party",
      hostName: "SK Boss",
      hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      viewerCount: 512,
      category: "Agency",
      isPrivate: true,
      seatsCount: 12,
      occupiedSeats: 11,
      totalCoins: 450000,
    },
  ];

  const partyRooms = externalPartyRooms.length > 0 ? externalPartyRooms : defaultRooms;
  const categories = ["All", "🔥 Popular", "🎵 Music", "👑 VIP", "🎮 Gaming", "💬 Chat", "🌟 Agency"];

  // Default Mock Seats if external is empty
  const seatsCount = room?.seatsCount || 8;
  const seats = externalSeats.length > 0 ? externalSeats : Array.from({ length: seatsCount }).map((_, i) => ({
    seatIndex: i,
    occupant: i === 0 ? (room?.hostName || "Host Jubair") : i < 4 ? `User ${i + 1}` : null,
    avatar: i === 0 ? room?.hostAvatar : i < 4 ? `https://images.unsplash.com/photo-${1500000000000 + i * 1000}?auto=format&fit=crop&w=120&q=80` : null,
    isMuted: i === 2,
    coins: i === 0 ? 45000 : i < 4 ? (4 - i) * 1200 : 0,
    frame: i === 0 ? frameKing : i === 1 ? frameQueen : i === 2 ? frameFair : null,
  }));

  const handleMicClick = () => {
    if (onToggleMic) {
      onToggleMic();
    } else {
      setInternalIsMicMuted(!internalIsMicMuted);
    }
  };

  const handleRoomClick = (selectedRoom: any) => {
    if (onJoinRoom) {
      onJoinRoom(selectedRoom);
    } else {
      setInternalActiveRoom(selectedRoom);
    }
  };

  const handleLeaveClick = () => {
    if (onLeaveRoom) {
      onLeaveRoom();
    } else {
      setInternalActiveRoom(null);
    }
  };

  const handleSendChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalChatInput.trim()) return;
    if (onSendChat) {
      onSendChat(internalChatInput);
    }
    setInternalChatInput("");
  };

  const handleCreateRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoom = {
      id: Date.now(),
      title: newRoomTitle || "🎉 My SK LOVE Party Room",
      hostName: currentUser?.name || "Host You",
      hostAvatar: currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      viewerCount: 1,
      category: "Music",
      isPrivate: false,
      seatsCount: newRoomSeats,
      occupiedSeats: 1,
      bgTheme: newRoomTheme,
      totalCoins: 0,
    };
    if (onCreateRoom) {
      onCreateRoom(newRoom);
    } else {
      setInternalActiveRoom(newRoom);
    }
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070510] text-slate-100 flex flex-col font-sans pb-20 relative overflow-hidden select-none">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* ╔═══════════════════════════════════════════════════════════════════╗ */}
      {/* ║ VIEW A: FULL ACTIVE PARTY ROOM VIEW                               ║ */}
      {/* ╚═══════════════════════════════════════════════════════════════════╝ */}
      {isRoomActive && room ? (
        <div className="flex-1 flex flex-col relative min-h-screen">
          {/* Room Theme Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={activeTheme}
              alt="Party Theme"
              className="w-full h-full object-cover object-center filter brightness-75 scale-105"
            />
            {/* Dark Gradient Backdrop Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
          </div>

          {/* 1. ROOM HEADER */}
          <header className="relative z-20 px-3 py-2.5 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="flex items-center gap-2 min-w-0">
              {onBack ? (
                <button
                  onClick={onBack}
                  className="p-1.5 rounded-xl bg-black/50 border border-white/20 text-white hover:bg-black/70 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleLeaveClick}
                  className="p-1.5 rounded-xl bg-black/50 border border-white/20 text-white hover:bg-black/70 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}

              {/* Host Avatar & Info */}
              <div
                onClick={() => onOpenProfile && onOpenProfile({ name: room.hostName, avatar: room.hostAvatar })}
                className="flex items-center gap-2 bg-black/60 border border-amber-500/30 rounded-full pl-1 pr-3 py-1 cursor-pointer hover:border-amber-400 transition"
              >
                <div className="relative">
                  <img
                    src={room.hostAvatar}
                    alt={room.hostName}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-400"
                  />
                  <img
                    src={frameKing}
                    alt="Host Frame"
                    className="absolute -inset-1.5 w-12 h-12 pointer-events-none object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h2 className="font-black text-xs text-white truncate max-w-[110px]">
                      {room.title || room.hostName}
                    </h2>
                    <span className="bg-amber-500/30 text-amber-300 border border-amber-400/40 text-[9px] font-black px-1 rounded">
                      SVIP
                    </span>
                  </div>
                  <p className="text-[10px] text-amber-200/80 font-semibold flex items-center gap-1">
                    <span>ID: {room.id}</span>
                    <span>•</span>
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <Users className="w-2.5 h-2.5 inline" /> {room.viewerCount || 1}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5">
              {/* Total Room Coins Badge */}
              <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-400/40 rounded-full px-2.5 py-1 text-amber-300 font-black text-xs shadow-md">
                <span className="text-sm">🪙</span>
                <span>{(room.totalCoins || 0).toLocaleString()}</span>
              </div>

              {/* Theme Picker Trigger */}
              <button
                onClick={() => setIsThemePickerOpen(true)}
                className="p-2 rounded-full bg-purple-900/60 border border-purple-400/40 text-purple-200 hover:bg-purple-800 transition"
                title="Change Background Theme"
              >
                <Palette className="w-4 h-4" />
              </button>

              {/* Leave Room Button */}
              <button
                onClick={handleLeaveClick}
                className="px-3 py-1.5 rounded-full bg-rose-600/80 hover:bg-rose-600 border border-rose-400/50 text-white font-bold text-xs shadow-lg transition active:scale-95"
              >
                Leave
              </button>
            </div>
          </header>

          {/* 2. ROYAL GIFT & WINNER ANNOUNCEMENT TICKER */}
          <div className="relative z-10 mx-3 mt-2">
            <div className="bg-gradient-to-r from-amber-950/80 via-purple-950/80 to-amber-950/80 border border-amber-500/40 rounded-full px-3 py-1 flex items-center justify-between text-xs text-amber-200 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 truncate">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <p className="font-bold truncate text-[11px]">
                  🎉 <span className="text-white font-extrabold">Jubair</span> sent{" "}
                  <span className="text-pink-300 font-black">100x Royal Dragon 🐉</span> to{" "}
                  <span className="text-amber-300 font-bold">Host</span>
                </p>
              </div>
              <span className="text-[10px] font-black bg-amber-500 text-black px-1.5 py-0.5 rounded-full uppercase shrink-0">
                TOP
              </span>
            </div>
          </div>

          {/* 3. SEATS GRID (HOST THRONE + PARTICIPANTS) */}
          <div className="relative z-10 flex-1 px-3 py-4 flex flex-col justify-center max-w-lg mx-auto w-full">
            {/* Host Throne (Seat 0) */}
            <div className="flex justify-center mb-4">
              {(() => {
                const hostSeat = seats[0] || {
                  occupant: room.hostName,
                  avatar: room.hostAvatar,
                  coins: 50000,
                  frame: frameKing,
                };
                return (
                  <div className="flex flex-col items-center relative group">
                    <div className="relative">
                      {/* Acoustic Wave Equalizer Ring */}
                      {!isMicMuted && (
                        <div className="absolute -inset-3 rounded-full border-2 border-emerald-400/80 animate-ping opacity-30" />
                      )}
                      
                      {/* Host Throne Crown */}
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 bg-amber-500 text-black p-1 rounded-full shadow-lg border border-white">
                        <Crown className="w-4 h-4 fill-black" />
                      </div>

                      {/* Avatar Image */}
                      <img
                        src={hostSeat.avatar || room.hostAvatar}
                        alt="Host"
                        className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-400 shadow-2xl cursor-pointer"
                        onClick={() => onOpenProfile && onOpenProfile({ name: hostSeat.occupant, avatar: hostSeat.avatar })}
                      />

                      {/* Animated Frame */}
                      <img
                        src={frameKing}
                        alt="King Frame"
                        className="absolute -inset-3 w-26 h-26 pointer-events-none object-contain"
                      />

                      {/* Mic Status Badge */}
                      <div className="absolute bottom-0 right-0 z-20 bg-emerald-500 text-white p-1 rounded-full border-2 border-black shadow">
                        {isMicMuted ? (
                          <MicOff className="w-3 h-3 text-rose-300" />
                        ) : (
                          <Mic className="w-3 h-3 text-white animate-bounce" />
                        )}
                      </div>
                    </div>

                    {/* Host Name & Coins */}
                    <div className="mt-2 text-center">
                      <span className="font-black text-xs text-amber-300 bg-black/60 px-2.5 py-0.5 rounded-full border border-amber-500/40 shadow">
                        👑 {hostSeat.occupant || room.hostName}
                      </span>
                      <p className="text-[10px] font-extrabold text-amber-200 mt-0.5">
                        🪙 {(hostSeat.coins || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Participant Seats Grid (Remaining 7 or 11 seats) */}
            <div className={`grid ${seatsCount === 12 ? "grid-cols-4" : "grid-cols-4"} gap-y-4 gap-x-2`}>
              {seats.slice(1).map((seat, idx) => {
                const actualIndex = idx + 1;
                const isOccupied = Boolean(seat && seat.occupant);

                return (
                  <div
                    key={actualIndex}
                    className="flex flex-col items-center justify-center relative group"
                  >
                    <div
                      onClick={() => {
                        if (isOccupied) {
                          setSelectedSeatForMenu(seat);
                        } else if (onJoinSeat) {
                          onJoinSeat(actualIndex);
                        }
                      }}
                      className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition transform active:scale-95 ${
                        isOccupied
                          ? "bg-purple-950/60 ring-2 ring-pink-500/60"
                          : "bg-black/50 border-2 border-dashed border-white/30 hover:border-pink-400"
                      }`}
                    >
                      {isOccupied ? (
                        <>
                          <img
                            src={seat.avatar}
                            alt={seat.occupant}
                            className="w-full h-full rounded-full object-cover"
                          />
                          {seat.frame && (
                            <img
                              src={seat.frame}
                              alt="Frame"
                              className="absolute -inset-2 w-18 h-18 pointer-events-none object-contain"
                            />
                          )}
                          {seat.isMuted && (
                            <span className="absolute top-0 right-0 bg-rose-600 text-white p-0.5 rounded-full border border-white text-[8px]">
                              <MicOff className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </>
                      ) : (
                        <Plus className="w-6 h-6 text-white/50 group-hover:text-pink-300" />
                      )}

                      {/* Seat Number Badge */}
                      <span className="absolute -bottom-1 -left-1 bg-black/80 text-amber-300 text-[9px] font-black px-1.5 py-0.2 rounded-full border border-amber-500/40">
                        {actualIndex + 1}
                      </span>
                    </div>

                    {/* Name & Coin Badge */}
                    <div className="mt-1 text-center w-full px-1">
                      <p className="text-[10px] font-bold text-white truncate">
                        {isOccupied ? seat.occupant : "Empty"}
                      </p>
                      {isOccupied && (
                        <p className="text-[9px] font-extrabold text-amber-300">
                          🪙 {seat.coins || 0}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. LIVE CHAT STREAM */}
          <div className="relative z-10 px-3 pb-2 max-w-lg mx-auto w-full">
            <div className="h-36 overflow-y-auto bg-black/50 backdrop-blur-md rounded-2xl p-2.5 border border-white/10 space-y-1.5 text-xs scrollbar-thin scrollbar-thumb-purple-600">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2 text-amber-200 text-[10px] font-medium leading-relaxed">
                📢 <span className="font-bold">System Announcement:</span> Welcome to SK LOVE Audio Party Room! Keep room rules strictly respected. No vulgarity allowed.
              </div>

              {chatMessages.length > 0 ? (
                chatMessages.map((msg, i) => (
                  <div key={i} className="text-[11px] leading-snug">
                    <span className="font-black text-pink-400">{msg.sender || msg.userName || "User"}: </span>
                    <span className="text-white font-medium">{msg.text || msg.message}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="text-[11px]">
                    <span className="font-bold text-amber-300">🎉 Host Jubair: </span>
                    <span className="text-white">Welcome everyone! Enjoy the party and request seats 🎙️</span>
                  </div>
                  <div className="text-[11px]">
                    <span className="font-bold text-pink-400">💖 Samia: </span>
                    <span className="text-slate-200">Hi everyone! Love this theme! ✨</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 5. BOTTOM CONTROL TOOLBAR */}
          <footer className="relative z-20 px-3 py-2 bg-black/80 backdrop-blur-lg border-t border-white/10 flex items-center justify-between gap-2 max-w-lg mx-auto w-full">
            {/* Chat Input */}
            <form onSubmit={handleSendChatSubmit} className="flex-1 flex gap-1.5 min-w-0">
              <input
                type="text"
                value={internalChatInput}
                onChange={(e) => setInternalChatInput(e.target.value)}
                placeholder="Say something..."
                className="w-full bg-slate-900/90 border border-white/20 rounded-full px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shrink-0 hover:opacity-90 active:scale-95 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Mic Toggle */}
              <button
                onClick={handleMicClick}
                className={`p-2.5 rounded-full border transition ${
                  isMicMuted
                    ? "bg-rose-600/80 border-rose-400 text-white"
                    : "bg-emerald-600/80 border-emerald-400 text-white animate-pulse"
                }`}
                title={isMicMuted ? "Unmute Mic" : "Mute Mic"}
              >
                {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Gift Picker Trigger */}
              <button
                onClick={() => onOpenGiftPicker && onOpenGiftPicker()}
                className="p-2.5 rounded-full bg-gradient-to-tr from-amber-500 to-pink-500 text-white font-bold shadow-lg hover:brightness-110 active:scale-95 transition"
                title="Send Gift"
              >
                <Gift className="w-4 h-4" />
              </button>

              {/* Games Launcher Trigger */}
              <button
                onClick={() => onOpenGameLauncher && onOpenGameLauncher()}
                className="p-2.5 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:brightness-110 active:scale-95 transition"
                title="Play Games"
              >
                <Gamepad2 className="w-4 h-4" />
              </button>
            </div>
          </footer>
        </div>
      ) : (
        /* ╔═══════════════════════════════════════════════════════════════════╗ */
        /* ║ VIEW B: EXPLORE & AUDIO PARTY ROOMS LIST                          ║ */
        /* ╚═══════════════════════════════════════════════════════════════════╝ */
        <div className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-4">
          {/* Header */}
          <header className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30">
                  <Radio className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-lg font-black tracking-wide bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 bg-clip-text text-transparent">
                    Audio Party Rooms
                  </h1>
                  <p className="text-xs text-indigo-300/80 font-medium">
                    Live Multi-seat Voice Chat & Social Hangouts
                  </p>
                </div>
              </div>
            </div>

            {/* Create Room Button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-black shadow-lg shadow-pink-500/25 active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create Party</span>
            </button>
          </header>

          {/* Featured Carousel Banner */}
          <div className="relative rounded-2xl overflow-hidden h-36 border border-purple-500/30 shadow-2xl group cursor-pointer">
            <img
              src={theme1}
              alt="Party Event Banner"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-center">
              <span className="px-2 py-0.5 rounded-full bg-pink-600 text-white text-[10px] font-black w-max uppercase mb-1">
                FEATURED EVENT
              </span>
              <h3 className="text-base font-black text-white">
                👑 SK LOVE Royal Voice Competition
              </h3>
              <p className="text-xs text-pink-200 mt-0.5">
                Win 1,000,000 Diamonds & Official SVIP Crown Frame!
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setInternalActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition ${
                  internalActiveCategory === cat
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Party Rooms List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {partyRooms.map((roomItem) => (
              <div
                key={roomItem.id}
                onClick={() => handleRoomClick(roomItem)}
                className="group bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-pink-500/60 rounded-2xl p-3.5 transition-all cursor-pointer shadow-xl hover:shadow-pink-500/20 flex gap-3.5 items-center relative overflow-hidden"
              >
                {/* Host Image with Frame */}
                <div className="relative shrink-0">
                  <img
                    src={roomItem.hostAvatar}
                    alt={roomItem.hostName}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-500/50 group-hover:ring-pink-400 transition"
                  />
                  <img
                    src={frameKing}
                    alt="King Frame"
                    className="absolute -inset-2 w-20 h-20 pointer-events-none object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-500/30">
                      {roomItem.category || "Party"}
                    </span>
                    <span className="text-xs text-emerald-400 font-black flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{roomItem.viewerCount || roomItem.listeners || 1}</span>
                    </span>
                  </div>

                  <h3 className="font-black text-xs text-white truncate group-hover:text-pink-300 transition">
                    {roomItem.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate">Host: <span className="text-amber-300 font-bold">{roomItem.hostName}</span></span>
                    <span className="text-pink-400 font-black shrink-0">
                      {roomItem.occupiedSeats || 4}/{roomItem.seatsCount || 8} Seats
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ╔═══════════════════════════════════════════════════════════════════╗ */}
      {/* ║ MODAL 1: CREATE PARTY ROOM MODAL                                  ║ */}
      {/* ╚═══════════════════════════════════════════════════════════════════╝ */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#120d2b] border border-purple-500/40 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                Create Voice Party Room
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRoomSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Room Title</label>
                <input
                  type="text"
                  value={newRoomTitle}
                  onChange={(e) => setNewRoomTitle(e.target.value)}
                  placeholder="e.g. 🔥 VIP Night Songs & Hangout"
                  className="w-full bg-slate-900 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Number of Seats</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewRoomSeats(8)}
                    className={`py-2 rounded-xl font-bold border ${
                      newRoomSeats === 8
                        ? "bg-pink-600 text-white border-pink-400"
                        : "bg-slate-900 text-slate-400 border-white/10"
                    }`}
                  >
                    8 Seats
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewRoomSeats(12)}
                    className={`py-2 rounded-xl font-bold border ${
                      newRoomSeats === 12
                        ? "bg-pink-600 text-white border-pink-400"
                        : "bg-slate-900 text-slate-400 border-white/10"
                    }`}
                  >
                    12 Seats
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm shadow-xl hover:opacity-90 transition mt-2"
              >
                Launch Room
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ╔═══════════════════════════════════════════════════════════════════╗ */}
      {/* ║ MODAL 2: BACKGROUND THEME PICKER MODAL                            ║ */}
      {/* ╚═══════════════════════════════════════════════════════════════════╝ */}
      {isThemePickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#120d2b] border border-purple-500/40 rounded-3xl p-5 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" />
                Select Party Room Theme
              </h3>
              <button
                onClick={() => setIsThemePickerOpen(false)}
                className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1">
              {THEME_LIST.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => {
                    if (onSelectTheme) onSelectTheme(theme.url);
                    setIsThemePickerOpen(false);
                  }}
                  className="relative rounded-2xl overflow-hidden h-24 border-2 border-transparent hover:border-pink-500 cursor-pointer group shadow-lg"
                >
                  <img
                    src={theme.url}
                    alt={theme.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 p-1 flex items-end">
                    <span className="text-[10px] font-bold text-white truncate">{theme.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

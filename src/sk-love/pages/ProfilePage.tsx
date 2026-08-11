import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Lock,
  Shield,
  Briefcase,
  Eye,
  Unlock,
  Users,
  Settings,
  ChevronRight,
  HelpCircle,
  Pencil,
  Camera,
  Upload,
  RefreshCw,
  Gem,
  Mic,
  Copy,
  Plus,
  Info,
  MapPin,
  Calendar,
  Heart,
  Link,
  GraduationCap,
  ImageIcon,
  Film,
  MessageSquare,
  ChevronDown,
  Gift,
  Crown,
  Sparkles,
  Award,
  CheckCircle2,
  Share2,
  Bell,
  Ban,
  Check,
  X,
  Flame,
  ShieldAlert,
} from "lucide-react";

export interface ProfileUser {
  id?: string;
  name?: string;
  username?: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  gender?: string;
  relationshipStatus?: string;
  work?: string;
  education?: string;
  livesIn?: string;
  hometown?: string;
  followersCount?: number;
  followingCount?: number;
  coins?: number;
  level?: number;
  vipLevel?: string;
  svipLevel?: string;
  isVerified?: boolean;
  agencyName?: string;
  isFollowing?: boolean;
}

export interface ProfilePageProps {
  user?: ProfileUser | null;
  currentUser?: ProfileUser | null;
  isOwnProfile?: boolean;
  onBack?: () => void;
  onNavigateSection?: (section: string) => void;
  onOpenGiftPicker?: () => void;
  onOpenSettings?: () => void;
}

export function ProfilePage({
  user,
  currentUser,
  isOwnProfile = true,
  onBack,
  onNavigateSection,
  onOpenGiftPicker,
  onOpenSettings,
}: ProfilePageProps) {
  // Active primary tab on user profile
  const [activeTab, setActiveTab] = useState<"posts" | "reels" | "gifts" | "about">("posts");
  
  // Settings view state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<
    "menu" | "personal" | "security" | "privacy" | "blocking" | "nid" | "agency"
  >("menu");

  // Edit profile modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Profile data state
  const displayUser = user || currentUser || {
    id: "998822",
    name: "Afrin Sultana",
    username: "@afrin_love",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Afrin",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    bio: "✨ SK Love Official Streamer | Spreading Happiness & Beats 🎵 ❤️",
    gender: "Female",
    relationshipStatus: "Single",
    work: "Official Live Host at SK Love",
    education: "North South University",
    livesIn: "Dhaka, Bangladesh",
    hometown: "Chittagong, Bangladesh",
    followersCount: 14200,
    followingCount: 320,
    coins: 45800,
    level: 28,
    vipLevel: "VIP 3",
    svipLevel: "SVIP 1",
    isVerified: true,
    agencyName: "SK Royal Agency",
    isFollowing: false,
  };

  const [profileData, setProfileData] = useState<ProfileUser>(displayUser);
  const [isFollowing, setIsFollowing] = useState<boolean>(displayUser.isFollowing || false);
  const [followersCount, setFollowersCount] = useState<number>(displayUser.followersCount || 14200);

  // Settings Form States
  const [editName, setEditName] = useState<string>(profileData.name || "");
  const [editBio, setEditBio] = useState<string>(profileData.bio || "");
  const [editLocation, setEditLocation] = useState<string>(profileData.livesIn || "");
  const [editWork, setEditWork] = useState<string>(profileData.work || "");
  const [editEducation, setEditEducation] = useState<string>(profileData.education || "");
  const [editGender, setEditGender] = useState<string>(profileData.gender || "Female");
  const [editRelationship, setEditRelationship] = useState<string>(profileData.relationshipStatus || "Single");

  // Password state
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [passSuccess, setPassSuccess] = useState<string>("");

  // NID state
  const [nidNumber, setNidNumber] = useState<string>("");
  const [nidStatus, setNidStatus] = useState<"pending" | "verified" | "not_submitted">("pending");

  // Blocked users
  const [blockedUsers, setBlockedUsers] = useState([
    { id: "b1", name: "Troll User #1", username: "@spammer99" },
    { id: "b2", name: "Fake Account", username: "@fake_sk" },
  ]);

  const handleSaveProfile = () => {
    setProfileData((prev) => ({
      ...prev,
      name: editName,
      bio: editBio,
      livesIn: editLocation,
      work: editWork,
      education: editEducation,
      gender: editGender,
      relationshipStatus: editRelationship,
    }));
    setIsEditModalOpen(false);
  };

  const handleToggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount((prev) => Math.max(0, prev - 1));
    } else {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    }
  };

  const handleUnblock = (id: string) => {
    setBlockedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="flex-1 bg-[#0b0914] text-slate-100 flex flex-col font-sans select-none h-full min-h-0 overflow-y-auto">
      {/* ----------------- TOP HEADER ----------------- */}
      <div className="shrink-0 px-4 py-3 bg-[#0b0914]/90 backdrop-blur-md border-b border-slate-900 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#131024] hover:bg-slate-900 flex items-center justify-center border border-slate-800 transition active:scale-95"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-extrabold text-sm tracking-wide text-white uppercase truncate">
            {profileData.name}
          </span>
          {profileData.isVerified && (
            <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-500/20 shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-2">
          {isOwnProfile && (
            <button
              onClick={() => {
                if (onOpenSettings) onOpenSettings();
                else setIsSettingsOpen(!isSettingsOpen);
              }}
              className="w-10 h-10 rounded-full bg-[#131024] hover:bg-slate-900 flex items-center justify-center border border-slate-800 transition active:scale-95 text-slate-200"
              title="Settings & Privacy"
            >
              <Settings className="w-5 h-5 text-pink-400" />
            </button>
          )}
        </div>
      </div>

      {/* ----------------- SETTINGS OVERLAY / DRAWER ----------------- */}
      {isSettingsOpen ? (
        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col bg-[#0b0914] p-4 text-slate-100">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <button
              onClick={() => {
                if (activeSettingsTab !== "menu") setActiveSettingsTab("menu");
                else setIsSettingsOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-bold text-pink-400 hover:text-pink-300"
            >
              <ArrowLeft className="w-4 h-4" />
              {activeSettingsTab === "menu" ? "Back to Profile" : "Settings Menu"}
            </button>
            <span className="text-xs font-extrabold uppercase text-slate-300">
              {activeSettingsTab === "menu" && "Settings & Privacy"}
              {activeSettingsTab === "personal" && "Edit Personal Details"}
              {activeSettingsTab === "security" && "Security & Password"}
              {activeSettingsTab === "privacy" && "Profile Lock"}
              {activeSettingsTab === "blocking" && "Blocked Users"}
              {activeSettingsTab === "nid" && "NID Verification"}
              {activeSettingsTab === "agency" && "Agency Contract"}
            </span>
          </div>

          {activeSettingsTab === "menu" && (
            <div className="space-y-2">
              <button
                onClick={() => setActiveSettingsTab("personal")}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#131024] border border-slate-850 hover:border-slate-750 transition"
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-pink-400" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">Personal Information</p>
                    <p className="text-[10px] text-slate-400">Update name, bio, location, education</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => setActiveSettingsTab("security")}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#131024] border border-slate-850 hover:border-slate-750 transition"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">Security & Password</p>
                    <p className="text-[10px] text-slate-400">Change password & active sessions</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => setActiveSettingsTab("privacy")}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#131024] border border-slate-850 hover:border-slate-750 transition"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">Profile Visibility Lock</p>
                    <p className="text-[10px] text-slate-400">Lock photos and posts from strangers</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => setActiveSettingsTab("blocking")}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#131024] border border-slate-850 hover:border-slate-750 transition"
              >
                <div className="flex items-center gap-3">
                  <Ban className="w-5 h-5 text-rose-400" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">Blocked Accounts ({blockedUsers.length})</p>
                    <p className="text-[10px] text-slate-400">Manage blocked users list</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => setActiveSettingsTab("nid")}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#131024] border border-slate-850 hover:border-slate-750 transition"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-amber-400" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">NID Verification Badge</p>
                    <p className="text-[10px] text-slate-400">Submit national ID for verified badge</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => setActiveSettingsTab("agency")}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#131024] border border-slate-850 hover:border-slate-750 transition"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">Agency & Host Registration</p>
                    <p className="text-[10px] text-slate-400">SK Royal Agency official contract</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          )}

          {/* Personal edit tab */}
          {activeSettingsTab === "personal" && (
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400">Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-400">City / Country</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400">Gender</label>
                  <select
                    value={editGender}
                    onChange={(e) => setEditGender(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => {
                  handleSaveProfile();
                  setActiveSettingsTab("menu");
                }}
                className="w-full py-2.5 mt-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl font-extrabold text-xs text-white shadow-lg shadow-pink-500/25"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Security tab */}
          {activeSettingsTab === "security" && (
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400">New Password</label>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>
              {passSuccess && (
                <p className="text-[11px] text-emerald-400 font-bold">{passSuccess}</p>
              )}
              <button
                onClick={() => {
                  setPassSuccess("Password updated successfully!");
                  setTimeout(() => setPassSuccess(""), 3000);
                }}
                className="w-full py-2.5 mt-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl font-extrabold text-xs text-white shadow-lg shadow-blue-500/25"
              >
                Update Password
              </button>
            </div>
          )}

          {/* Block list */}
          {activeSettingsTab === "blocking" && (
            <div className="space-y-2">
              {blockedUsers.length === 0 ? (
                <p className="text-center text-xs text-slate-500 py-6">No blocked users.</p>
              ) : (
                blockedUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{u.name}</p>
                      <p className="text-[10px] text-slate-400">{u.username}</p>
                    </div>
                    <button
                      onClick={() => handleUnblock(u.id)}
                      className="px-3 py-1 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 rounded-lg text-[10px] font-bold"
                    >
                      Unblock
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* NID verification */}
          {activeSettingsTab === "nid" && (
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h4 className="text-xs font-extrabold text-white">NID Verification Status</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Verification unlocks host payouts, VIP badge highlights, and priority room recommendations.
              </p>
              <div>
                <label className="text-[10px] font-bold text-slate-400">NID Number</label>
                <input
                  type="text"
                  placeholder="e.g. 19983482910"
                  value={nidNumber}
                  onChange={(e) => setNidNumber(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                onClick={() => setNidStatus("verified")}
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-xl"
              >
                {nidStatus === "verified" ? "Verified ✅" : "Submit NID Document"}
              </button>
            </div>
          )}

          {/* Agency */}
          {activeSettingsTab === "agency" && (
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <h4 className="text-xs font-extrabold text-white">Host Contract & Agency</h4>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                <p className="text-slate-300 font-bold">Agency: SK Royal Agency BD</p>
                <p className="text-slate-400 text-[11px]">Monthly Target: 50,000 Diamonds</p>
                <p className="text-emerald-400 text-[11px] font-extrabold">Status: Active Official Host</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ----------------- MAIN PROFILE CONTENT ----------------- */
        <div className="flex-1">
          {/* COVER & AVATAR BANNER */}
          <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
            <img
              src={profileData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0914] via-transparent to-black/40" />

            {/* Edit Cover button */}
            {isOwnProfile && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold text-white flex items-center gap-1.5 hover:bg-black/80 transition"
              >
                <Camera className="w-3.5 h-3.5 text-pink-400" />
                Edit Cover
              </button>
            )}
          </div>

          {/* AVATAR & ACTION BAR */}
          <div className="px-4 -mt-12 relative z-10 flex items-end justify-between">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-24 h-24 rounded-full border-4 border-[#0b0914] bg-slate-900 object-cover shadow-2xl"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0b0914]" />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-2 pb-1">
              {isOwnProfile ? (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-pink-500/25 flex items-center gap-1.5 transition active:scale-95"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleToggleFollow}
                    className={`px-4 py-2 font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition active:scale-95 ${
                      isFollowing
                        ? "bg-slate-800 text-slate-200 border border-slate-700"
                        : "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-pink-500/25"
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Following
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        Follow
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (onNavigateSection) onNavigateSection("inbox");
                    }}
                    className="p-2 bg-[#131024] border border-slate-800 hover:bg-slate-900 text-pink-400 rounded-xl transition active:scale-95"
                    title="Send Message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenGiftPicker}
                    className="p-2 bg-[#131024] border border-slate-800 hover:bg-slate-900 text-amber-400 rounded-xl transition active:scale-95"
                    title="Send Gift"
                  >
                    <Gift className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* USER INFO DETAILS */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">{profileData.name}</h2>
              {profileData.isVerified && (
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-[9px] font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 fill-blue-500/30" /> Verified
                </span>
              )}
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">{profileData.username}</p>

            {/* BIO */}
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{profileData.bio}</p>

            {/* BADGES ROW */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-[10px] font-black flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400" />
                {profileData.vipLevel || "VIP 3"}
              </span>

              <span className="px-2.5 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-[10px] font-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Lv.{profileData.level || 28} Host
              </span>

              {profileData.agencyName && (
                <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-[10px] font-black flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-emerald-400" />
                  {profileData.agencyName}
                </span>
              )}
            </div>

            {/* STATS METRICS BAR */}
            <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-[#131024] rounded-2xl border border-slate-850 text-center">
              <div>
                <p className="text-sm font-black text-white">{followersCount.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Followers</p>
              </div>
              <div className="border-x border-slate-800">
                <p className="text-sm font-black text-white">{profileData.followingCount || 320}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Following</p>
              </div>
              <div>
                <p className="text-sm font-black text-amber-400 flex items-center justify-center gap-1">
                  <Gem className="w-3.5 h-3.5" />
                  {(profileData.coins || 45800).toLocaleString()}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Gems / Coins</p>
              </div>
            </div>

            {/* LOCATION & DETAILS */}
            <div className="mt-4 space-y-2 text-xs text-slate-400">
              {profileData.livesIn && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <span>Lives in <strong className="text-slate-200">{profileData.livesIn}</strong></span>
                </div>
              )}
              {profileData.work && (
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Work at <strong className="text-slate-200">{profileData.work}</strong></span>
                </div>
              )}
              {profileData.education && (
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Studied at <strong className="text-slate-200">{profileData.education}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* ----------------- PAGE CONTENT TABS ----------------- */}
          <div className="mt-3 border-b border-slate-850 flex items-center justify-around bg-[#131024]/60 sticky top-[52px] z-20">
            <button
              onClick={() => setActiveTab("posts")}
              className={`py-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "posts"
                  ? "border-pink-500 text-pink-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Posts
            </button>

            <button
              onClick={() => setActiveTab("reels")}
              className={`py-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "reels"
                  ? "border-pink-500 text-pink-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              Reels
            </button>

            <button
              onClick={() => setActiveTab("gifts")}
              className={`py-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "gifts"
                  ? "border-pink-500 text-pink-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              Gift Wall
            </button>

            <button
              onClick={() => setActiveTab("about")}
              className={`py-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "about"
                  ? "border-pink-500 text-pink-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              About
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div className="p-4">
            {activeTab === "posts" && (
              <div className="space-y-4">
                <div className="p-4 bg-[#131024] rounded-2xl border border-slate-850 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={profileData.avatar} alt="Me" className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-extrabold text-white">{profileData.name}</h4>
                      <p className="text-[10px] text-slate-400">2 hours ago • 🌐 Public</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Live stream schedule tonight at 10:00 PM BD time! Come join my party room for exciting PK battles and gifts giveaway! 🎤✨
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80"
                    alt="Post"
                    className="w-full h-48 object-cover rounded-xl border border-slate-800"
                  />
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                    <button className="flex items-center gap-1 hover:text-pink-400 transition">
                      <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                      <span>248 Likes</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-400 transition">
                      <MessageSquare className="w-4 h-4 text-slate-400" />
                      <span>42 Comments</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-emerald-400 transition">
                      <Share2 className="w-4 h-4 text-slate-400" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reels" && (
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="relative aspect-[9/16] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 group cursor-pointer"
                  >
                    <img
                      src={`https://picsum.photos/300/500?random=${i}`}
                      alt="Reel"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] font-bold text-white flex items-center gap-1">
                        <Film className="w-3 h-3 text-pink-400" />
                        {1200 * i}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "gifts" && (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "👑 SVIP Crown", count: 12, value: "12,000" },
                  { name: "🏎️ Lamborghini", count: 4, value: "20,000" },
                  { name: "🌹 Love Rose", count: 450, value: "4,500" },
                  { name: "🏰 Royal Castle", count: 2, value: "40,000" },
                ].map((g, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#131024] rounded-2xl border border-slate-850 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-extrabold text-white">{g.name}</p>
                      <p className="text-[10px] text-slate-400">Received x{g.count}</p>
                    </div>
                    <span className="text-xs font-black text-amber-400">{g.value} 💎</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "about" && (
              <div className="p-4 bg-[#131024] rounded-2xl border border-slate-850 space-y-3 text-xs">
                <h4 className="font-extrabold text-white text-xs uppercase tracking-wide border-b border-slate-800 pb-2">
                  Basic & Contact Details
                </h4>
                <div className="space-y-2 text-slate-300">
                  <p><strong className="text-slate-400">ID Number:</strong> {profileData.id}</p>
                  <p><strong className="text-slate-400">Gender:</strong> {profileData.gender}</p>
                  <p><strong className="text-slate-400">Relationship:</strong> {profileData.relationshipStatus}</p>
                  <p><strong className="text-slate-400">Hometown:</strong> {profileData.hometown}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------- EDIT PROFILE MODAL ----------------- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131024] border border-slate-800 rounded-3xl p-5 w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-extrabold text-white uppercase">Edit Profile Details</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-400">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-400">Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={2}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-400">Location</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-400">Work</label>
                <input
                  type="text"
                  value={editWork}
                  onChange={(e) => setEditWork(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold rounded-xl shadow-lg shadow-pink-500/25"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

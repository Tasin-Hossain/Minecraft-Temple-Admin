import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdSecurity,
  MdOutlinePerson,
  MdOutlineEmail,
  MdVerifiedUser,
  MdLocationOn,
  MdCake,
  MdWork,
  MdLink,
  MdSave,
  MdCancel,
  MdPhotoCamera,
  MdDevices,
  MdPhoneAndroid,
  MdComputer,
} from "react-icons/md";
import { IoMdArrowBack, IoMdMail } from "react-icons/io";
import { IoEarth } from "react-icons/io5";
import { CgToolbox } from "react-icons/cg";
import { TiShoppingCart } from "react-icons/ti";
import { FiDownload } from "react-icons/fi";
import { FaBan } from "react-icons/fa";
import Button from "../../../Components/ui/Button";
import RoleBadge from "../../../Components/RoleBadge";
import StatusBadge from "../../../Components/BanStatusBadge";
import YesNoBadge from "../../../Components/YesNoBadge";
import users from "../../../Api/users";
import profiles from "../../../Api/profiles";
import USER_NOT_FOUND from "../../../Assets/UserNotFound/userNotFound.png";
import { Input } from "../../../Components/ui/Input";
import Dropdown from "../../../Components/ui/Dropdown";
import { Checkbox } from "../../../Components/ui/Checkbox";
import SimpleToggle from "../../../Components/ui/Switches";

const EditMember = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const user = useMemo(
    () => users.find((u) => u.id === Number(userId)),
    [userId],
  );

  const profile = useMemo(() => {
    if (!user || user.profile == null) return null;
    const profileId = Number(user.profile);
    return profiles.find((p) => Number(p.id) === profileId);
  }, [user]);

  // Form state
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "user",
    status: user?.status || "active",
    isVerified: user?.isVerified || false,
    twoFactorEnabled: user?.twoFactor?.enabled || false,
    stayLoggedIn: user?.stayLoggedIn ?? false,
    receiveUpdates: user?.receiveUpdates ?? true,
    agreedToTerms: user?.agreedToTerms ?? true,
    // Profile fields
    customTitle: profile?.customTitle || "",
    creatorTagLine: profile?.creatorTagLine || "",
    dateOfBirth: profile?.dateOfBirth
      ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
      : "",
    location: profile?.location || "",
    gender: profile?.Gender || "",
    occupation: profile?.occupation || "",
    website: profile?.website || "",
    aboutYou: profile?.aboutYou || "",
    socialLinks: profile?.socialLinks || {
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      github: "",
      youtube: "",
    },
  });

  console.log(form)

  // File & preview states
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [bannerPreview, setBannerPreview] = useState(user?.banner || null);

  if (!user) {
    return (
      <div className="min-h-auto bg-(--card) rounded-md border border-(--border)">
        <div className="p-4">
          <Button
            icon={<IoMdArrowBack />}
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2 p-10">
          <div className="w-20">
            <img src={USER_NOT_FOUND} alt="USER NOT FOUND" className="w-full" />
          </div>
          <h1 className="text-[20px] text-(--muted-text)">User Not Found!</h1>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (name.startsWith("social.")) {
      const platform = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [platform]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert("Banner size should be less than 8MB");
        return;
      }
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "socialLinks") {
        submitData.append(key, JSON.stringify(value));
      } else {
        submitData.append(key, value);
      }
    });

    if (avatarFile) submitData.append("avatar", avatarFile);
    if (bannerFile) submitData.append("banner", bannerFile);

    if (!avatarFile) submitData.append("currentAvatar", user.avatar || "");
    if (!bannerFile) submitData.append("currentBanner", user.banner || "");

    try {
      // TODO: Replace with real API
      console.log(
        "Form data ready to send:",
        Object.fromEntries(submitData.entries()),
      );
      alert("Profile updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to save changes. Please try again.");
    }
  };

  const parseUserAgent = (ua) => {
    if (!ua) return { device: "Unknown", browser: "Unknown", os: "Unknown" };

    const lower = ua.toLowerCase();

    let browser = "Unknown";
    if (lower.includes("chrome")) browser = "Chrome";
    else if (lower.includes("firefox")) browser = "Firefox";
    else if (lower.includes("safari")) browser = "Safari";
    else if (lower.includes("edge")) browser = "Edge";
    else if (lower.includes("opera")) browser = "Opera";

    let device =
      lower.includes("mobile") ||
      lower.includes("android") ||
      lower.includes("iphone")
        ? "Mobile"
        : lower.includes("ipad") || lower.includes("tablet")
          ? "Tablet"
          : "Desktop";

    let os = "Unknown";
    if (lower.includes("windows")) os = "Windows";
    else if (lower.includes("mac")) os = "macOS";
    else if (lower.includes("linux")) os = "Linux";
    else if (lower.includes("android")) os = "Android";
    else if (lower.includes("iphone") || lower.includes("ipad")) os = "iOS";

    return { device, browser, os };
  };

  const formatRelativeTime = (dateStr) => {
    if (!dateStr) return "Never";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)} hr ago`;
    return date.toLocaleDateString("en-US", { dateStyle: "medium" });
  };

  const maskIP = (ip) => {
    if (!ip) return "Hidden";
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
    return ip;
  };

  const getDeviceIcon = (ua) => {
    const { device } = parseUserAgent(ua);
    if (device === "Mobile") {
      return <MdPhoneAndroid size={20} className="text-(--muted-text)" />;
    }
    if (device === "Tablet") {
      return <MdDevices size={20} className="text-(--muted-text)" />;
    }
    return <MdComputer size={20} className="text-(--muted-text)" />;
  };

  // Confirmation handlers (এখানে আসল API কল করবে)
  const handleLogoutSession = (sessionId) => {
    console.log("Logging out session:", sessionId);
    // TODO: API call to logout single session
    alert(`Session ${sessionId} logged out`);
  };

  const handleLogoutAllOtherSessions = () => {
    console.log("Logging out all other sessions");
    // TODO: API call
    alert("All other sessions logged out");
  };

  const handleLogoutAll = () => {
    console.log("Logging out ALL sessions");
    // TODO: API call
    alert("Logged out from all devices");
  };

  const confirmLogoutSession = (sessionId) => {
    if (window.confirm("Are you sure you want to log out this session?")) {
      handleLogoutSession(sessionId);
    }
  };

  const confirmLogoutAllOthers = () => {
    if (
      window.confirm(
        "This will log out all other devices except this one. Continue?",
      )
    ) {
      handleLogoutAllOtherSessions();
    }
  };

  const confirmLogoutAll = () => {
    if (
      window.confirm(
        "This will log you out from ALL devices including this one. Are you sure?",
      )
    ) {
      handleLogoutAll();
    }
  };

  return (
    <div className="min-h-auto bg-(--card) rounded-md border border-(--border)">
      <div className="mx-auto px-6 py-6">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            {/* back button */}
            <Button
              icon={<IoMdArrowBack />}
              variant="outline"
              type="button"
              onClick={() => navigate(-1)}
            >
              Back 
            </Button>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                icon={<MdCancel />}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" icon={<MdSave />}>
                Save Changes
              </Button>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-(--card) rounded-md border border-(--border) overflow-hidden divide-y divide-(--border)">
            {/* Banner */}
            <div className="relative w-full group overflow-hidden">
              <div className="relative pb-[25%] md:pb-[20%]">
                <img
                  src={
                    bannerPreview ||
                    user.banner ||
                    `https://via.placeholder.com/1200x300/111827/22c55e?text=${user.username?.[0] || "?"}`
                  }
                  alt="Banner"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>

              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <div className="text-white text-center px-4">
                  <MdPhotoCamera size={48} className="mx-auto mb-3" />
                  <p className="text-lg font-medium text-white opacity-90">
                    Change Banner
                  </p>
                  <p className="text-sm text-white opacity-90">
                    (max 8MB • recommended 1200×300)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Avatar + Basic Info */}
            <div className="py-6 px-6 flex flex-col md:flex-row gap-10 items-start bg-(--card)">
              <div className="relative group mx-auto md:mx-0">
                <img
                  src={
                    avatarPreview ||
                    user.avatar ||
                    `https://via.placeholder.com/200/111827/22c55e?text=${user.username?.[0] || "?"}`
                  }
                  alt={user.username}
                  className="w-35 h-30 rounded-md object-cover border-2 border-(--border) shadow-md transition-all duration-300 group-hover:brightness-75"
                />

                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <MdPhotoCamera size={36} className="text-white mb-2" />
                  <span className="text-white text-sm font-medium px-3 text-center">
                    Change Avatar
                  </span>
                  <span className="text-white/80 text-xs mt-1">(max 5MB)</span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div>
                  <Input
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Input
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-wrap gap-6 items-center">
                  <div>
                    <label className="block text-sm text-(--muted-text) mb-1">
                      Role
                    </label>
                    <Dropdown
                      options={["user", "creator", "moderator", "admin"]}
                      value={form.role}
                      onChange={(newRole) =>
                        setForm((prev) => ({ ...prev, role: newRole }))
                      }
                      placeholder="Select role"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-(--muted-text) mb-1">
                      Status
                    </label>
                    <Dropdown
                      options={["active", "suspended", "banned"]}
                      value={form.status}
                      onChange={(newStatus) =>
                        setForm((prev) => ({ ...prev, status: newStatus }))
                      }
                      placeholder="Select status"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="py-5 px-6 bg-(--card)">
              <div className="flex items-center justify-evenly text-center">
                <div>
                  <p className="text-sm text-(--muted-text)">Resources</p>
                  <p className="text-xl font-bold text-(--theme)">
                    {user.totalResources || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-(--muted-text)">Sales</p>
                  <p className="text-xl font-bold text-(--theme)">
                    {user.totalSales || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-(--muted-text)">Downloads</p>
                  <p className="text-xl font-bold text-(--theme)">
                    {user.totalDownloads || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Three-column panels */}
            <div className="flex flex-col lg:flex-row justify-evenly gap-6 py-8 px-6">
              {/* Security & Auth */}
              <div className="flex-1 py-6 px-8 bg-(--card-foreground) rounded-md border border-(--border)">
                <h2 className="font-bold mb-6 flex items-center gap-2">
                  <MdSecurity size={20} /> Security & Auth
                </h2>
                <div className="space-y-6">
                  {/* 2fa Enabled */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-(--muted-text)">
                      2FA Enabled
                    </span>
                    <SimpleToggle
                      checked={form.twoFactorEnabled}
                      onChange={handleChange}
                      name="twoFactorEnabled"
                    />
                  </div>

                  {/* Email Verified */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-(--muted-text)">
                      Email Verified
                    </span>
                    <SimpleToggle
                      checked={form.isVerified}
                      onChange={handleChange}
                      name="isVerified"
                    />
                  </div>

                  {/* Active Sessions - Full Section */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-medium text-(--muted-text)">
                        Active Sessions
                      </span>

                      <div className="flex items-center justify-between">
                        <span className="text-(--theme) font-bold text-[20px]">
                          {user.refreshTokens?.length || 0}
                        </span>
                      </div>
                    </div>

                    {user.refreshTokens?.length > 0 ? (
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 border-t border-(--border) pt-4">
                        <div className="flex items-center justify-between gap-2">
                          {/* confirmLogoutAllOthers */}
                          {user.refreshTokens?.length > 1 && (
                            <Button
                              variant="outline"
                              className="text-[12px] py-1! bg-red-400 text-white"
                              onClick={confirmLogoutAllOthers}
                            >
                              Log out all others
                            </Button>
                          )}

                          {/* confirmLogoutAll */}
                          {user.refreshTokens?.length > 0 && (
                            <Button
                              variant="outline"
                              className="text-[12px] py-1!"
                              onClick={confirmLogoutAll}
                            >
                              Log out all
                            </Button>
                          )}
                        </div>

                        {/* token.isCurrent || false; */}
                        {user.refreshTokens.map((token, index) => {
                          const isCurrent = token.isCurrent || false;
                          const parsed = parseUserAgent(token.userAgent);
                          const relativeTime = formatRelativeTime(
                            token.lastActive || token.createdAt,
                          );

                          return (
                            <div
                              key={token.id || index}
                              className={`
                                flex items-center justify-between p-4 rounded-md border
                                ${
                                  isCurrent
                                    ? "bg-(--theme)/10 border-(--border)"
                                    : "bg-(--foreground)/50 border-(--border) "
                                }
                                transition-colors group
                              `}
                            >
                              <div className="flex flex-col items-start gap-2 flex-1">
                                <div className="flex items-center gap-2">
                                  {/* icon */}
                                  <div className="">
                                    {getDeviceIcon(token.userAgent)}
                                  </div>
                                  {/* browsers */}
                                  <p className="font-medium text-[12px]">
                                    {parsed.browser} on {parsed.device} •{" "}
                                    {parsed.os}
                                  </p>
                                </div>

                                <div className=" text-(--muted-text) flex flex-col gap-2">
                                  <p className="text-[12px]">
                                    IP: {token.ip ? maskIP(token.ip) : "Hidden"}
                                  </p>
                                  {token.location && (
                                    <p className="text-[12px]">
                                      Approx. location:{" "}
                                      {token.location.country || "Unknown"}
                                    </p>
                                  )}
                                  <p className="text-[12px]">Last active: {relativeTime}</p>
                                </div>
                              </div>
                              {/* log out */}
                              <div className="flex items-center gap-3">
                                {isCurrent ? (
                                  <span className="text-xs font-medium px-3 py-1 bg-green-400 text-(--text-wh) rounded-full">
                                    This device
                                  </span>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                      className="text-[12px] py-1! bg-red-400 text-white"
                                    onClick={() =>
                                      confirmLogoutSession(token.id)
                                    }
                                  >
                                    Log out
                                  </Button>
                                )}
                              </div>
                              

                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-(--muted-text) border-t border-(--border)">
                        <MdDevices
                          size={48}
                          className="mx-auto mb-3 opacity-50 text-(--muted-text)"
                        />
                        <p className="text-lg font-medium text-[16px]">
                          No active sessions
                        </p>
                        <p className="text-[14px]">
                          You're only logged in here right now.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Account Info */}
              <div className="flex-1 py-6 px-8 bg-(--card-foreground) rounded-md border border-(--border) ">
                <h2 className="font-bold mb-6 flex items-center gap-2">
                  <MdOutlinePerson size={20} /> Account Info
                </h2>
                <div className="space-y-6">
                  {/* current status */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-(--muted-text)">
                      Current Status
                    </span>
                    <StatusBadge status={form.status} />
                  </div>
                  
                  {/* Current Role */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-(--muted-text)">
                      Current Role
                    </span>
                    <RoleBadge role={form.role} />
                  </div>

                  {/* stay login */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-(--muted-text)">
                    Stay logged In 
                    </span>
                    <SimpleToggle
                      name="stayLoggedIn"
                      checked={form.stayLoggedIn}
                      
                      onChange={handleChange}
                    />
                  </div>

                </div>
              </div>

              

              {/* Preferences */}
              <div className="flex-1 py-6 px-8 bg-(--card-foreground) rounded-md border border-(--border)">
                <h2 className="font-bold mb-6 flex items-center gap-2">
                  <MdOutlineEmail size={20} /> Preferences
                </h2>
                <div className="space-y-6">

                  {/* Receive Updates */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-(--muted-text)">
                      Receive Updates
                    </span>
                    <SimpleToggle
                      checked={form.receiveUpdates}
                      onChange={handleChange}
                      name="receiveUpdates"
                    />
                  </div>

                    {/* Agreed to Terms */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-(--muted-text)">
                      Agreed to Terms
                    </span>
                    <SimpleToggle
                      checked={form.agreedToTerms}
                      onChange={handleChange}
                      name="agreedToTerms"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="py-6 px-6">
              <h2 className="flex items-center gap-2 px-4 mb-6 text-lg font-semibold">
                <MdOutlinePerson size={24} /> Profile Information
              </h2>

              <div className="space-y-8 px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* custom title */}
                  <div>
                    <label className="block text-sm text-(--muted-text) mb-1">
                      Custom Title
                    </label>
                    <Input
                      name="customTitle"
                      value={form.customTitle}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {/* Tag Line */}
                  <div>
                    <label className="block text-sm text-(--muted-text) mb-1">
                      Tag Line
                    </label>
                    <Input
                      name="creatorTagLine"
                      value={form.creatorTagLine}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {/* Birthday */}
                  <div>
                    <label className="block text-sm text-(--muted-text) mb-1">
                      Birthday
                    </label>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                    
                    />
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label className="block text-sm text-(--muted-text) mb-1">
                      Location
                    </label>
                    <Input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {/* Occupation */}
                  <div>
                    <label className="block text-sm text-(--muted-text) mb-1">
                      Occupation
                    </label>
                    <Input
                      name="occupation"
                      value={form.occupation}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {/* Website */}
                  <div className="">
                    <label className="block text-sm text-(--muted-text) mb-1">
                      Website
                    </label>
                    <Input
                      name="website"
                      type="url"
                      value={form.website}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>

                  
                  {/* Gender */}
                  <div>
                    <label className="block text-sm text-(--muted-text) mb-1">
                      Gender
                    </label>
                    <Dropdown
                      options={[ "male", "female", "other"]}
                      value={form.gender}
                      onChange={(val) =>
                        setForm((prev) => ({ ...prev, gender: val }))
                      }
                      placeholder="Prefer not to say"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-8 border-t border-(--border)">
                  <h3 className="flex items-center gap-2 mb-5 font-semibold text-lg">
                    <IoEarth size={22} /> Social Links
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.keys(form.socialLinks).map((platform) => (
                      <div key={platform}>
                        <label className="block text-sm text-(--muted-text) mb-1 capitalize">
                          {platform}
                        </label>
                        <Input
                          name={`social.${platform}`}
                          value={form.socialLinks[platform] || ""}
                          onChange={handleChange}
                          
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* About You */}
                <div className="pt-8 border-t border-(--border)">
                  <label className="block text-sm font-medium mb-2">
                    About You
                  </label>
                  <textarea
                    name="aboutYou"
                    value={form.aboutYou}
                    onChange={handleChange}
                    rows={8}
                    className="w-full px-4 py-3 bg-(--card-foreground) border border-(--border) rounded-md resize-y focus:outline-none focus:border-(--theme)"
                    placeholder="Tell something about yourself..."
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMember;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdSecurity,
  MdOutlinePerson,
  MdOutlineEmail,
  MdPhotoCamera,
  MdDevices,
  MdPhoneAndroid,
  MdComputer,
  MdSave,
  MdCancel,
} from "react-icons/md";
import { IoMdArrowBack, IoMdMail } from "react-icons/io";
import { IoEarth } from "react-icons/io5";
import Button from "../../../Components/ui/Button";
import RoleBadge from "../../../Components/RoleBadge";
import StatusBadge from "../../../Components/BanStatusBadge";
import { Input } from "../../../Components/ui/Input";
import Dropdown from "../../../Components/ui/Dropdown";
import SimpleToggle from "../../../Components/ui/Switches";
import USER_NOT_FOUND from "../../../Assets/UserNotFound/userNotFound.png";

// Hooks
import { useUserFetch } from "../../../Hooks/useUserFetch";
import { useUpdateUser } from "../../../Hooks/useUpdateUser";
import { REMOVE_AVATAR_API, REMOVE_BANNER_API } from "../../../Api/user";
import { toast } from "react-toastify";

const EditMember = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { user, loading, error: fetchError } = useUserFetch(userId);

  const { updateUser, isUpdating, updateError, isSuccess, reset } =
    useUpdateUser(userId, {
      onSuccess: () => {
        window.location.reload();
      },
      onError: (err) => {
        alert(
          "Update failed: " +
            (err?.response?.data?.message || err?.message || "Unknown error"),
        );
      },
    });

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "member",
    status: "active",
    isVerified: false,
    twoFactorEnabled: false,
    stayLoggedIn: false,
    receiveUpdates: true,
    agreedToTerms: true,
    customTitle: "",
    creatorTagLine: "",
    dateOfBirth: "",
    location: "",
    Gender: "",
    website: "",
    occupation: "",
    aboutYou: "",
    socialLinks: {
      discord: "",
      discordUserId: "",
      facebook: "",
      contectEmail: "",
      portfolio: "",
      twitter: "",
      telegram: "",
      instagram: "",
      youtube: "",
      twitch: "",
      linkedin: "",
      github: "",
    },
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "member",
        status: user.status || "active",
        isVerified: user.isVerified || false,
        twoFactorEnabled: user.twoFactor?.enabled || false,
        stayLoggedIn: user.stayLoggedIn ?? false,
        receiveUpdates: user.receiveUpdates ?? true,
        agreedToTerms: user.agreedToTerms ?? true,
        customTitle: user.profile?.customTitle || "",
        creatorTagLine: user.profile?.creatorTagLine || "",
        dateOfBirth: user.profile?.dateOfBirth
          ? new Date(user.profile.dateOfBirth).toISOString().split("T")[0]
          : "",
        location: user.profile?.location || "",
        website: user.profile?.website || "",
        Gender: user.profile?.Gender || "",
        occupation: user.profile?.occupation || "",
        aboutYou: user.profile?.aboutYou || "",
        socialLinks: {
          discord: user.profile?.socialLinks?.discord || "",
          discordUserId: user.profile?.socialLinks?.discordUserId || "",
          facebook: user.profile?.socialLinks?.facebook || "",
          contectEmail: user.profile?.socialLinks?.contectEmail || "",
          portfolio: user.profile?.socialLinks?.portfolio || "",
          twitter: user.profile?.socialLinks?.twitter || "",
          telegram: user.profile?.socialLinks?.telegram || "",
          instagram: user.profile?.socialLinks?.instagram || "",
          youTube: user.profile?.socialLinks?.youTube || "",
          linkedIn: user.profile?.socialLinks?.linkedIn || "",
          gitHub: user.profile?.socialLinks?.gitHub || "",
        },
      });

      setAvatarPreview(user.avatar || null);
      setBannerPreview(user.banner || null);
    }
  }, [user]);

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
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert("Avatar size should be less than 8MB");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Banner size should be less than 10MB");
      return;
    }

    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  //  Remove Avatar
  const handleRemoveAvatar = async () => {
    if (!window.confirm("Are you sure you want to remove avatar?")) return;

    try {
      const res = await REMOVE_AVATAR_API(userId);
      setAvatarPreview(res.data.avatar || null);
      setAvatarFile(null);

      toast.success(res.data.message || "Avatar removed successfully!");

      navigate(-1);
    } catch (err) {
      console.error("Remove avatar error:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to remove avatar. Please try again.";

      toast.error(errorMessage);
    }
  };

  // Remove Banner
  const handleRemoveBanner = async () => {
    if (!window.confirm("Are you sure you want to remove banner?")) return;

    try {
      const res = await REMOVE_BANNER_API(userId);
      console.log(res);
      // preview clear
      setBannerPreview(res.data.banner || null);
      setBannerFile(null);

      // toast success message
      toast.success(res.data.message || "Banner removed successfully!");

      navigate(-1);
    } catch (err) {
      console.error("Remove banner error:", err);

      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to remove banner. Please try again.";

      toast.error(errorMsg);
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

    if (!avatarFile && user?.avatar)
      submitData.append("currentAvatar", user.avatar);
    if (!bannerFile && user?.banner)
      submitData.append("currentBanner", user.banner);

    try {
      await updateUser(submitData);
      reset();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading user data...</div>;
  }

  if (fetchError || !user) {
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
          <h1 className="text-[20px] text-(--muted-text)">
            {fetchError || "User Not Found!"}
          </h1>
        </div>
      </div>
    );
  }

  // ─── parseUserAgent, formatRelativeTime, maskIP, getDeviceIcon, confirmLogout functions একই রাখা হয়েছে ───
  const parseUserAgent = (ua) => {
    if (!ua) return { device: "Unknown", browser: "Unknown", os: "Unknown" };
    const lower = ua.toLowerCase();
    let browser = "Unknown";
    if (lower.includes("chrome")) browser = "Chrome";
    else if (lower.includes("firefox")) browser = "Firefox";
    else if (lower.includes("safari")) browser = "Safari";
    else if (lower.includes("edge")) browser = "Edge";
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
    if (device === "Mobile")
      return <MdPhoneAndroid size={20} className="text-(--muted-text)" />;
    if (device === "Tablet")
      return <MdDevices size={20} className="text-(--muted-text)" />;
    return <MdComputer size={20} className="text-(--muted-text)" />;
  };

  const confirmLogoutSession = (sessionId) => {
    if (window.confirm("Are you sure you want to log out this session?")) {
      console.log("Logging out session:", sessionId);
      alert(`Session ${sessionId} logged out`);
    }
  };

  const confirmLogoutAllOthers = () => {
    if (window.confirm("Log out all other devices except this one?")) {
      console.log("Logging out all other sessions");
      alert("All other sessions logged out");
    }
  };

  const confirmLogoutAll = () => {
    if (window.confirm("Log out from ALL devices including this one?")) {
      console.log("Logging out ALL sessions");
      alert("Logged out from all devices");
    }
  };

  return (
    <div className="min-h-auto bg-(--card) rounded-md border border-(--border)">
      <div className="mx-auto px-6 py-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between mb-4">
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
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button type="submit" icon={<MdSave />} disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          <div className="bg-(--card) rounded-md border border-(--border) overflow-hidden divide-y divide-(--border)">
            {/* Banner */}
            <div className="relative w-full group overflow-hidden">
              <div className="relative pb-[25%] md:pb-[20%]">
                <img
                  src={bannerPreview || user.banner}
                  alt="Banner"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <div className="text-white text-center px-4">
                  <MdPhotoCamera size={48} className="mx-auto mb-3" />
                  <p className="text-lg font-medium">Change Banner</p>
                  <p className="text-sm">(max 8MB • 1200×300 recommended)</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </label>

              {/* Remove Banner Button - শুধু যোগ করা অংশ */}
              {(bannerPreview || user.banner) && (
                <Button
                  type="button"
                  onClick={handleRemoveBanner}
                  className="absolute top-4 right-4 py-2! "
                  title="Remove Banner"
                >
                  Remove Cover
                </Button>
              )}
            </div>

            {/* Avatar + Basic Info */}
            <div className="py-6 px-6 flex flex-col md:flex-row gap-10 items-start bg-(--card)">
              <div className="flex flex-col gap-2   mx-auto md:mx-0">
                <div className="group relative">
                  <img
                    src={
                      avatarPreview ||
                      user.avatar ||
                      `https://via.placeholder.com/200/111827/22c55e?text=${user.username?.[0] || "?"}`
                    }
                    alt={user.username}
                    className="w-35 h-30 rounded-md object-cover border-2 border-(--border) shadow-md transition-all group-hover:brightness-75"
                  />
                  <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <MdPhotoCamera size={36} className="text-white mb-2" />
                    <span className="text-white text-sm font-medium px-3 text-center">
                      Change Avatar
                    </span>
                    <span className="text-white/80 text-xs mt-1">
                      (max 5MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Remove Avatar Button - শুধু যোগ করা অংশ */}
                {(avatarPreview || user.avatar) && (
                  <Button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="w-full top-4 right-4 py-2! px-2!"
                    title="Remove Avatar"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-2 gap-6">
                  <Input
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                  />
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
                      onChange={(val) => setForm((p) => ({ ...p, role: val }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-(--muted-text) mb-1">
                      Status
                    </label>
                    <Dropdown
                      options={["active", "suspended", "banned"]}
                      value={form.status}
                      onChange={(val) =>
                        setForm((p) => ({ ...p, status: val }))
                      }
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

                  {/* Active Sessions */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-medium text-(--muted-text)">
                        Active Sessions
                      </span>
                      <span className="text-(--theme) font-bold text-[20px]">
                        {user.refreshTokens?.length || 0}
                      </span>
                    </div>

                    {user.refreshTokens?.length > 0 ? (
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 border-t border-(--border) pt-4">
                        <div className="flex items-center justify-between gap-2">
                          {user.refreshTokens?.length > 1 && (
                            <Button
                              variant="outline"
                              className="text-[12px] py-1 bg-red-400 text-white"
                              onClick={confirmLogoutAllOthers}
                            >
                              Log out all others
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            className="text-[12px] py-1"
                            onClick={confirmLogoutAll}
                          >
                            Log out all
                          </Button>
                        </div>

                        {user.refreshTokens.map((token, index) => {
                          const isCurrent = token.isCurrent || false;
                          const parsed = parseUserAgent(token.userAgent);
                          const relativeTime = formatRelativeTime(
                            token.lastActive || token.createdAt,
                          );

                          return (
                            <div
                              key={token.id || index}
                              className={`flex items-center justify-between p-4 rounded-md border ${
                                isCurrent
                                  ? "bg-(--theme)/10 border-(--border)"
                                  : "bg-(--foreground)/50 border-(--border)"
                              } transition-colors group`}
                            >
                              <div className="flex flex-col items-start gap-2 flex-1">
                                <div className="flex items-center gap-2">
                                  {getDeviceIcon(token.userAgent)}
                                  <p className="font-medium text-[12px]">
                                    {parsed.browser} on {parsed.device} •{" "}
                                    {parsed.os}
                                  </p>
                                </div>
                                <div className="text-(--muted-text) flex flex-col gap-2 text-[12px]">
                                  <p>
                                    IP: {token.ip ? maskIP(token.ip) : "Hidden"}
                                  </p>
                                  {token.location && (
                                    <p>
                                      Approx. location:{" "}
                                      {token.location.country || "Unknown"}
                                    </p>
                                  )}
                                  <p>Last active: {relativeTime}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {isCurrent ? (
                                  <span className="text-xs font-medium px-3 py-1 bg-green-400 text-white rounded-full">
                                    This device
                                  </span>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[12px] py-1 bg-red-400 text-white"
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
                          className="mx-auto mb-3 opacity-50"
                        />
                        <p className="text-lg font-medium">
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
              <div className="flex-1 py-6 px-8 bg-(--card-foreground) rounded-md border border-(--border)">
                <h2 className="font-bold mb-6 flex items-center gap-2">
                  <MdOutlinePerson size={20} /> Account Info
                </h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-(--muted-text)">
                      Current Status
                    </span>
                    <StatusBadge status={form.status} />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-(--muted-text)">
                      Current Role
                    </span>
                    <RoleBadge role={form.role} />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-(--muted-text)">
                      Stay Logged In
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

                  <div>
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

                  <div>
                    <label className="block text-sm text-(--muted-text) mb-1">
                      Gender
                    </label>
                    <Dropdown
                      options={["male", "female", "other"]}
                      value={form.Gender}
                      onChange={(val) =>
                        setForm((p) => ({ ...p, Gender: val }))
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

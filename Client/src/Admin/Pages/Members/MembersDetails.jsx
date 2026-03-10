import React, { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  MdSecurity,
  MdOutlinePerson,
  MdOutlineEmail,
  MdVerifiedUser,
  MdOutlineModeEdit,
  MdPhotoCamera,
} from "react-icons/md";
import RoleBadge from "../../../Components/RoleBadge";
import StatusBadge from "../../../Components/BanStatusBadge";
import YesNoBadge from "../../../Components/YesNoBadge";
import Button from "../../../Components/ui/Button";
import { IoMdArrowBack, IoMdMail } from "react-icons/io";
import { IoEarth } from "react-icons/io5";
import { CgToolbox } from "react-icons/cg";
import { TiShoppingCart } from "react-icons/ti";
import { FiDownload } from "react-icons/fi";
import { FaBan } from "react-icons/fa";
import LinkedAccountsButtons from "../../../Components/LinkedAccounts";
import { Input } from "../../../Components/ui/Input";
import USER_NOT_FOUND from "../../../Assets/UserNotFound/userNotFound.png";

import { useUserFetch } from "../../../Hooks/useUserFetch";
import Loader from "../../../Components/Loader";
// ────────────────────────────────────────────────

// ────────────────────────────────────────────────

const UserDetailAdmin = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { user, loading, error, refresh: refreshUser } = useUserFetch(userId);

  // If still loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center text-(--muted-text)">
          <Loader />
        </div>
      </div>
    );
  }

  // API/network error
  if (error) {
    return (
      <div className="min-h-auto bg-(--card) rounded-md border border-(--border) p-8">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-semibold text-red-500">Error</h2>
          <p className="text-(--muted-text)">{error}</p>
          <Button onClick={refreshUser}>Try Again</Button>
          <Button
            variant="outline"
            icon={<IoMdArrowBack />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // User not found (API returned null / 404 handled in hook)
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

  // ────── Dates ──────
  const createdAt = new Date(user.createdAt || "").toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
  const updatedAt = new Date(user.updatedAt || "").toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
  const lastLogin = user.lastLogin
    ? new Date(user.lastLogin).toLocaleString()
    : "Never";

  // ────── Stats ──────
  const stats = [
    { label: "Posts", value: user.totalPosts || 0, link: "/profile/sales" },
    {
      label: "Reactions",
      value: user.totalReactions || 0,
      link: "/profile/downloads",
    },
    {
      label: "Madels",
      value: user.totalMadels || 0,
      link: "/profile/downloads",
    },
    {
      label: "Rating",
      value: user.averageRating?.toFixed(1) || "—",
      extra: "★",
      link: "/profile/reviews",
    },
    {
      label: "Reviews",
      value: user.reviewCount || 0,
      link: "/profile/reviews",
    },
    { label: "Balance", value: user.balance || 0, link: "/profile/reviews" },
    {
      label: "Total Earnings",
      value: user.totalEarnings || 0,
      link: "/profile/reviews",
    },
  ];

  return (
    <div className="min-h-auto bg-(--card) rounded-md border border-(--border)">
      <div className="mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            icon={<IoMdArrowBack />}
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <div className="flex items-center gap-4 btn-outline">
            <span>
              Joined: <span className="text-(--theme)">{createdAt}</span>
            </span>
            <span>
              Updated: <span className="text-(--theme)">{updatedAt}</span>
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-(--card) rounded-md border border-(--border) overflow-hidden divide-y divide-(--border)">
          {/* banner */}
          <div className="relative w-full group overflow-hidden">
            <div className="relative pb-[25%] md:pb-[20%]">
              <img
                src={user.banner}
                alt="Banner"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Top - Avatar + Name */}
          <div className="py-6 px-6 flex flex-col md:flex-row gap-10 items-start bg-(--card)">
            <div className="flex justify-between items-start text-left w-full">
              <div className="relative group flex gap-4">
                <img
                  src={
                    user.avatar ||
                    `https://via.placeholder.com/200/111827/22c55e?text=${user.username?.[0] || "?"}`
                  }
                  alt={user.username}
                  className="w-32 h-30 rounded-md object-cover border-2 border-(--border) transition-all duration-500"
                />

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <h1 className="mb-0">{user.username}</h1>
                    {user.isVerified && <MdVerifiedUser size={18} />}
                  </div>

                  <div className="flex items-center gap-2">
                    <RoleBadge role={user.role} />
                    <StatusBadge status={user.status} />
                  </div>

                  <div className="flex items-center gap-1">
                    <IoMdMail size={19} />
                    <p className="text-[14px]">{user.email}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <CgToolbox size={19} />
                      <h1 className="mb-0 text-(--muted-text) text-[14px]">
                        <span className="text-(--theme) font-bold text-[14px]">
                          {user.totalResources || 0}
                        </span>{" "}
                        Resources
                      </h1>
                    </div>

                    <div className="flex items-center gap-1">
                      <TiShoppingCart size={19} />
                      <h1 className="mb-0 text-(--muted-text) text-[14px]">
                        <span className="text-(--theme) font-bold text-[14px]">
                          {user.totalSales || 0}
                        </span>{" "}
                        sales
                      </h1>
                    </div>

                    <div className="flex items-center gap-1">
                      <FiDownload size={19} />
                      <h1 className="mb-0 text-(--muted-text) text-[14px]">
                        <span className="text-(--theme) font-bold text-[14px]">
                          {user.totalDownloads || 0}
                        </span>{" "}
                        Downloads
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              {
                
              }
              <div className="flex gap-2">
                <Button
                  icon={<MdOutlineModeEdit />}
                  onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                >
                  Edit
                </Button>
                <Button variant="outline" icon={<FaBan />}>
                  Ban {user.username}
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="py-4 px-4">
            <div className="flex items-center justify-evenly">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <Link to={stat.link}>
                    <h1 className="mb-1 text-[14px] text-(--muted-text) hover:text-(--theme) hover:underline">
                      {stat.label}
                    </h1>
                  </Link>
                  <h1 className="mb-0 text-[14px]">
                    {stat.value}
                    {stat.extra && <span className="ml-2">{stat.extra}</span>}
                  </h1>
                </div>
              ))}
            </div>
          </div>

          {/* Security / Account / Preferences */}
          <div className="flex justify-evenly py-4 px-4 flex-wrap gap-6">
            {/* Security & Auth */}
            <div className="w-full md:w-[30%] py-6 px-8 bg-(--card-foreground) rounded-md border border-(--border)">
              <h1 className="font-bold mb-8 flex items-center gap-2">
                <MdSecurity size={20} /> Security & Auth
              </h1>
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    2FA Enabled
                  </span>
                  <YesNoBadge value={user.twoFactor?.enabled ?? false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    Email Verified
                  </span>
                  <YesNoBadge value={user.isVerified} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    Password Reset Pending
                  </span>
                  <YesNoBadge value={!!user.resetPasswordToken} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    Active Sessions
                  </span>
                  <span className="text-(--theme) font-bold text-[20px]">
                    {user.refreshTokens?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="w-full md:w-[30%] py-6 px-8 bg-(--card-foreground) rounded-md border border-(--border)">
              <h1 className="font-bold mb-8 flex items-center gap-2">
                <MdOutlinePerson size={20} /> Account Info
              </h1>
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    Current Status
                  </span>
                  <StatusBadge status={user.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    Last Login
                  </span>
                  <span className="text-[14px] text-(--muted-text)">
                    {lastLogin}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    Logged In Now
                  </span>
                  <YesNoBadge value={user.isLoggedIn ?? false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    Stay Logged In
                  </span>
                  <YesNoBadge value={user.stayLoggedIn ?? false} />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="w-full md:w-[30%] py-6 px-8 bg-(--card-foreground) rounded-md border border-(--border)">
              <h1 className="font-bold mb-8 flex items-center gap-2">
                <MdOutlineEmail size={20} /> Preferences
              </h1>
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    Receive Updates
                  </span>
                  <YesNoBadge value={user.receiveUpdates ?? false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    Agreed to Terms
                  </span>
                  <YesNoBadge value={user.agreedToTerms ?? false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    Linked Accounts
                  </span>
                  <LinkedAccountsButtons user={user} />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="py-6 px-6">
            <h1 className="flex items-center gap-2 px-4 mb-6 text-lg font-semibold">
              <MdOutlinePerson size={25} /> Profile Information
            </h1>

            {user.profile ? (
              <div className="space-y-8 px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.profile.customTitle && (
                    <div>
                      <label className="block text-sm text-(--muted-text) mb-1">
                        Custom Title
                      </label>
                      <Input value={user.profile.customTitle} readOnly />
                    </div>
                  )}

                  {user.profile.creatorTagLine && (
                    <div>
                      <label className="block text-sm text-(--muted-text) mb-1">
                        Custom TagLine
                      </label>
                      <Input value={user.profile.creatorTagLine} readOnly />
                    </div>
                  )}

                  {user.profile.dateOfBirth && (
                    <div>
                      <label className="block text-sm text-(--muted-text) mb-1">
                        Birthday
                      </label>
                      <Input
                        type="date"
                        value={user.profile.dateOfBirth}
                        readOnly
                      />
                    </div>
                  )}

                  {user.profile.location && (
                    <div>
                      <label className="block text-sm text-(--muted-text) mb-1">
                        Location
                      </label>
                      <Input value={user.profile.location} readOnly />
                    </div>
                  )}

                  {user.profile.Gender && (
                    <div>
                      <label className="block text-sm text-(--muted-text) mb-1">
                        Gender
                      </label>
                      <Input value={user.profile.Gender} readOnly />
                    </div>
                  )}

                  {user.profile.occupation && (
                    <div>
                      <label className="block text-sm text-(--muted-text) mb-1">
                        Occupation
                      </label>
                      <Input value={user.profile.occupation} readOnly />
                    </div>
                  )}

                  {user.profile.website && (
                    <div>
                      <label className="block text-sm text-(--muted-text) mb-1">
                        Website
                      </label>
                      <Input value={user.profile.website} readOnly />
                    </div>
                  )}
                </div>

                {/* Social Links */}
                {user.profile.socialLinks &&
                  Object.values(user.profile.socialLinks).some(Boolean) && (
                    <div className="pt-8 border-t border-(--border)">
                      <h3 className="flex items-center gap-2 mb-5 font-semibold text-lg">
                        <IoEarth size={22} /> Social Links
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(user.profile.socialLinks).map(
                          ([key, value]) =>
                            value ? (
                              <div key={key}>
                                <label className="block text-sm text-(--muted-text) mb-1 capitalize">
                                  {key}
                                </label>
                                <Input value={value} readOnly />
                              </div>
                            ) : null,
                        )}
                      </div>
                    </div>
                  )}

                {/* About Me */}
                {user.profile.aboutYou && (
                  <div className="pt-8 border-t border-(--border)">
                    <label className="block text-sm font-medium mb-2">
                      About You
                    </label>
                    <div className="w-full px-4 py-3 bg-(--card-foreground) border border-(--border) rounded-md">
                      <div
                        className="py-2 px-6 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: user.profile.aboutYou,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-24 rounded-md border border-(--border)">
                <p className="text-[20px] font-bold mb-6">
                  No Profile Information
                </p>
                <p className="text-[18px]">
                  This user has not set up their profile yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailAdmin;

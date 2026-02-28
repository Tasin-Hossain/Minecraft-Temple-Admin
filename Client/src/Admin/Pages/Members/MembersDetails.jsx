import React, { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  MdArrowBack,
  MdSecurity,
  MdMonetizationOn,
  MdOutlinePerson,
  MdOutlineEmail,
  MdStar,
  MdDownload,
  MdShoppingCart,
  MdInventory,
  MdLogin,
  MdAccessTime,
  MdLock,
  MdVerifiedUser,
  MdLocationOn,
  MdCake,
  MdWork,
  MdLink,
  MdOutlineModeEdit,
} from "react-icons/md";
import RoleBadge from "../../../Components/RoleBadge";
import StatusBadge from "../../../Components/BanStatusBadge";
import YesNoBadge from "../../../Components/YesNoBadge";
import Button from "../../../Components/ui/Button";
import users from "../../../Api/users";
import profiles from "../../../Api/profiles";
import USER_NOT_FOUND from "../../../Assets/UserNotFound/userNotFound.png";
import { IoMdArrowBack, IoMdMail } from "react-icons/io";
import { IoEarth, IoMailOutline } from "react-icons/io5";
import { CgToolbox } from "react-icons/cg";
import { TiShoppingCart } from "react-icons/ti";
import { FiDownload } from "react-icons/fi";
import LinkedAccountsButtons from "../../../Components/LinkedAccounts";
import { FaBan } from "react-icons/fa";

const UserDetailAdmin = () => {
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

  if (!user) {
    return (
      <div className="min-h-auto bg-(--card) rounded-md border border-(--border)">
        {/* user not found */}
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
          <div className=" w-20 ">
            <img src={USER_NOT_FOUND} alt="USER NOT FOUND" className="w-full" />
          </div>
          <h1 className="text-[20px] text-(--muted-text)">User Not Found!</h1>
        </div>
      </div>
    );
  }

  const createdAt = new Date(user.createdAt || "").toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
  const updatedAt = new Date(user.updatedAt || "").toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
  const lastLogin = user.lastLogin
    ? new Date(user.lastLogin).toLocaleString()
    : "Never";

  const stats = [
    {
      label: "Posts",
      value: user.totalPosts || 0,
      link: "/profile/sales",
    },
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
    {
      label: "Balance",
      value: user.balance || 0,
      link: "/profile/reviews",
    },
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
          {/* Back to Member List */}
          <Button
            icon={<IoMdArrowBack />}
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Back to Member List
          </Button>

          {/* joined and updated */}
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
          <div className="w-full">
            <img
              src={
                user.banner ||
                `https://via.placeholder.com/200/111827/22c55e?text=${user.username?.[0] || "?"}`
              }
              alt={user.username}
              className="w-full"
            />
          </div>

          {/* Top - Avatar + Name */}
          <div className="py-4 px-4 flex gap-16 items-start bg-(--card) ">
            <div className="flex justify-between items-start text-left w-full">
              <div className="relative group flex gap-4">
                {/* Avatar */}
                <img
                  src={
                    user.avatar ||
                    `https://via.placeholder.com/200/111827/22c55e?text=${user.username?.[0] || "?"}`
                  }
                  alt={user.username}
                  className="w-30 h-30 rounded-md object-cover border-2 border-(--border) transition-all duration-500 "
                />

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    {/* username */}
                    <h1 className="mb-0">{user.username}</h1>
                    {/* isverifyed */}
                    {user.isVerified && <MdVerifiedUser size={18} />}
                  </div>
                  <div className=" flex items-center gap-2">
                    {/* role */}
                    <RoleBadge role={user.role} />
                    {/* status */}
                    <StatusBadge status={user.status} />
                  </div>
                  {/* email */}
                  <div className="flex items-center gap-1">
                    <IoMdMail size={19} />
                    <p className="text-[14px]">{user.email}</p>
                  </div>

                  {/* stats */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <CgToolbox size={19} />
                      <h1 className="mb-0 text-(--muted-text) text-[14px]">
                        <span className="text-(--theme) font-bold text-[14px]">
                          {user.totalResources || 0}{" "}
                        </span>
                        Resources
                      </h1>
                    </div>

                    <div className="flex items-center gap-1">
                      <TiShoppingCart size={19} />
                      <h1 className="mb-0 text-(--muted-text) text-[14px]">
                        {" "}
                        <span className="text-(--theme) font-bold text-[14px]">
                          {user.totalSales || 0}
                        </span>{" "}
                        sales
                      </h1>
                    </div>

                    <div className="flex items-center gap-1">
                      <FiDownload size={19} />
                      <h1 className="mb-0 text-(--muted-text) text-[14px]">
                        <span className="text-(--theme) font-bold text-[14px]" >
                          {user.totalDownloads || 0}
                        </span>{" "}
                        Downloads
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button icon={<MdOutlineModeEdit/>}>Edit</Button>
                <Button variant="outline" icon={<FaBan />}>Ban {user.username}</Button>
              </div>
            </div>
          </div>

          {/*  Stats */}
          <div className="py-4 px-4">
            <div className="flex items-center justify-evenly ">
              {stats.map((stat, idx) => (
                <div key={idx} className={`flex flex-col items-center`}>
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
          
          {/*  Security, Account, Preferences */}
          <div className="flex justify-evenly py-4 px-4">
            {/* Security & Auth */}
            <div className="w-[30%] py-6 px-8 bg-(--card-foreground) rounded-md border border-(--border)">
              <h1 className=" font-bold mb-8 flex items-center gap-2 justify-start">
                <MdSecurity size={20} /> Security & Auth
              </h1>
              <div className="space-y-8 ">
               
               {/* 2fa enabled */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">2FA Enabled</span>
                  <YesNoBadge
                    value={user.twoFactor?.enabled ?? false}
                  />
                </div>

                {/* email verified */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">Email Verified</span>
                  <YesNoBadge value={user.isVerified} />
                </div>

                {/* password reset */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">Password Reset Pending</span>
                    <YesNoBadge value={user.resetPasswordToken} />
                </div>
                
                {/* acctive sessions */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">Active Sessions</span>
                  <span className="text-(--theme) font-bold text-[20px]">
                    {user.refreshTokens?.length || 0}
                  </span>
                </div>

              </div>
            </div>

            {/* Account & Activity */}
            <div className="w-[30%] py-6 px-8 bg-(--card-foreground) rounded-md border border-(--border) ">
              <h1 className="font-bold mb-8 flex items-center gap-2 justify-start">
                <MdOutlinePerson size={20} /> Account Info
              </h1>

              <div className="space-y-8 ">

                {/* user status */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">Current Status</span>
                  <StatusBadge status={user.status} />
                </div>

                {/* last login */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">Last Login</span>
                  <span className="text-[14px] text-(--muted-text)">{lastLogin}</span>
                </div>

                {/* loged in now */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">Logged In Now</span>
                  <YesNoBadge value={user.isLoggedIn} />
                </div>

                {/* stay log in  */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">Stay Logged In</span>
                  <YesNoBadge value={user.stayLoggedIn} />
                </div>
              </div>
            </div>

            {/* Preferences & Connections */}
            <div className="w-[30%] py-6 px-8 bg-(--card-foreground) rounded-md border border-(--border) ">
              <h1 className="font-bold mb-8 flex items-center gap-2 justify-start">
                <MdOutlineEmail size={20}/> Preferences
              </h1>

              <div className="space-y-8 ">

              {/* receiveUpdates */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">Receive Updates</span>
                  <YesNoBadge value={user.receiveUpdates}  />
                </div>

                {/* agreedToTerms */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">Agreed to Terms</span>
                  <YesNoBadge value={user.agreedToTerms}  />
                </div>

                {/* link account */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-(--muted-text)">
                    Linked Accounts
                  </span>

                  <LinkedAccountsButtons user={user}/>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details  */}
          <div className="py-4 px-4">
            <h1 className="flex items-center gap-2 px-12">
              <MdOutlinePerson size={25} /> Profile Information
            </h1>

            {profile ? (
              <div className="flex flex-col">
                {/* Basic Info Cards */}
                <div className="flex items-center justify-between px-20 py-4 border-b border-(--border)">
                  <div className="flex flex-col  gap-2 w-[30%] ">
                    {/* customTitle */}
                    {profile.customTitle && (
                      <div className="flex items-center gap-2">
                        <h2 className="text-[14px] font-bold text-(--text-wh)">
                          Custom Title
                        </h2>
                      </div>
                    )}

                    {/* custom Tag line */}
                    {profile.creatorTagLine && (
                      <div className="flex items-center  gap-2 ">
                        <h2 className="text-[14px] font-bold text-(--text-wh)">
                          Tag Line
                        </h2>
                      </div>
                    )}

                    {/* Birthday */}
                    {profile.dateOfBirth && (
                      <div className="flex items-center gap-2">
                        <h2 className="text-[14px] font-bold text-(--text-wh)">
                          Birthday
                        </h2>
                      </div>
                    )}

                    {/* Location */}
                    {profile.location && (
                      <div className="flex items-center gap-2">
                        <h2 className="text-[14px] font-bold text-(--text-wh)">
                          Custom Location
                        </h2>
                      </div>
                    )}

                    {/* gender */}
                    {profile.Gender && (
                      <div className="flex items-center gap-2">
                        <h2 className="text-[14px] font-bold text-(--text-wh)">
                          Gender
                        </h2>
                      </div>
                    )}

                    {/* occupation */}
                    {profile.occupation && (
                      <div className="flex items-center  gap-2">
                        <h2 className="text-[14px] font-bold text-(--text-wh)">
                          Occupation
                        </h2>
                      </div>
                    )}

                    {/* website */}
                    {profile.website && (
                      <div className="flex items-center  gap-2">
                        <h2 className="text-[14px] font-bold text-(--text-wh)">
                          Website
                        </h2>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col  gap-2 w-[70%] ">
                    {/* customTitle value*/}
                    {profile.customTitle && (
                      <div className="flex items-center justify-start gap-2">
                        <p className="text-[14px]">{profile.customTitle}</p>
                      </div>
                    )}

                    {/* custom Tag line value*/}
                    {profile.creatorTagLine && (
                      <div className="flex items-center justify-start gap-2 ">
                        <p className="text-[14px]">{profile.creatorTagLine}</p>
                      </div>
                    )}

                    {/* Birthday value*/}
                    {profile.dateOfBirth && (
                      <div className="flex items-center justify-start gap-2">
                        <p className="text-[14px]">
                          {new Date(profile.dateOfBirth).toLocaleDateString(
                            "en-US",
                            { dateStyle: "long" },
                          )}
                        </p>
                      </div>
                    )}

                    {/* Location value */}
                    {profile.location && (
                      <div className="flex items-center justify-start gap-2">
                        <p className="text-[14px] ">{profile.location}</p>
                      </div>
                    )}

                    {/* gender value*/}
                    {profile.Gender && (
                      <div className="flex items-center justify-start gap-2">
                        <p className="text-[14px] ">Gender</p>
                      </div>
                    )}

                    {/* occupation value*/}
                    {profile.occupation && (
                      <div className="flex items-center justify-start gap-2">
                        <p className="text-[14px]">Occupation</p>
                      </div>
                    )}

                    {/* website value*/}
                    {profile.website && (
                      <div className="flex items-center justify-start gap-2">
                        <p className="text-[14px] ">
                          <a
                            href={profile.website}
                            target="_blank"
                            className="text-[14px] text-(--theme) hover:underline break-all"
                          >
                            {profile.website}
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                {Object.values(profile.socialLinks || {}).some((v) => v) && (
                  <div className="border-b border-(--border) ">
                    <h1 className="flex items-center gap-2 py-4 px-12">
                      <IoEarth size={25} /> Social Information
                    </h1>
                    <div className="pb-4">
                      {Object.entries(profile.socialLinks).map(
                        ([key, value]) =>
                          value ? (
                            <div
                              key={key}
                              className=" flex items-center gap-2 px-20 mb-2 "
                            >
                              <h2 className="w-[30%] text-[14px] text-(--text-wh) capitalize font-bold">
                                {key}
                              </h2>
                              <div className="w-70%">
                                <a
                                  href={
                                    value.startsWith("http")
                                      ? value
                                      : `https://${value}`
                                  }
                                  target="_blank"
                                  className=" text-[14px] text-(--theme) hover:underline break-all"
                                >
                                  {value}
                                </a>
                              </div>
                            </div>
                          ) : null,
                      )}
                    </div>
                  </div>
                )}

                {/* About Me */}
                {profile.aboutYou && (
                  <div className="py-4">
                    <h1 className="flex items-center gap-2 px-12">
                      <MdOutlinePerson size={25} /> About
                    </h1>
                    <div className="px-20">
                      <div
                        className="py-2 px-6 rounded-md bg-(--card-foreground) text-[14px] prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: profile.aboutYou }}
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

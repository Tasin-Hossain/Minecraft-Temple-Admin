import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    customTitle:String,
    creatorTagLine:String,
    dateOfBirth:String,
    location: String,
    website: String,
    Gender:String,
    occupation:String,
    aboutYou:String,
    socialLinks: {
      discord: String,
      discordUserId: String,
      facebook: String,
      contectEmail: String,
      portfolio: String,
      twitter: String,
      telegram: String,
      instagram: String,
      youTube: String,
      twitch: String,
      linkedIn: String,
      gitHub: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
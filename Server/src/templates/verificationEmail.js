export const verificationEmail = ({ name, verifyUrl }) => {
  const logoUrl = "https://cdn.discordapp.com/attachments/1143481780331098183/1436729569272004638/mt-logo-256.png?ex=69a846ae&is=69a6f52e&hm=244e025eb8e53ca0bbaf2e6cd9624cf6377b9ba8a98d1429ab5ab7ad8384714e";
  
  // Social icons – pixel art orange theme (replace with your actual links)
  const socials = [
    { name: "Discord", url: "https://discord.gg/ZZBjJFh4jx", icon: "https://i.pinimg.com/736x/b5/d4/ce/b5d4ce10a744861ffd3314d20d116976.jpg" },
    { name: "YouTube", url: "https://youtube.com/@minitasinstudio", icon: "https://i.pinimg.com/1200x/ca/d6/03/cad6039c053896e2719e664ff6b16705.jpg" },
    { name: "Twitter/X", url: "https://x.com/yourtemple", icon: "https://i.pinimg.com/736x/2c/2e/83/2c2e836359975f03fd5b9ae2c156d04e.jpg" },
   
  ];

  return {
    subject: "🌟 Minecraft Temple - Verify Your Account 🌟",
    text: `Hey ${name}! Verify your email to join the Minecraft Temple: ${verifyUrl}\n\nLink expires in 15 mins.`,
    html: `
      <div style="font-family: Arial, 'Helvetica Neue', sans-serif; background:#f5f5f5; color:#313030; max-width:820px; margin:0 auto; border-radius:8px; overflow:hidden; box-shadow:0 0 40px rgba(255,164,31,0.5);">
        
        <!-- Header with your logo -->
        <div style="background: #f5f5f5; border: 1px solid #0000001a; padding:30px 20px; text-align:center;">
          <img src="${logoUrl}" alt="Minecraft Temple Logo" style="width:60px; height:62px; display:block; border-radius:16px; margin:0 auto;">
          <h1 style="color:#ffa41f; font-size:25px; margin:20px 0 10px;"><span style="color:#313030;">Welcome</span> ${name}!</h1>

        </div>
        
        <!-- Main content -->
        <div style="padding:35px 30px; text-align:center; background:#f5f5f5;">
          <p style="font-size:14px; margin-bottom:30px; color:#313030;">
            Thank you for registering! Click the button below to verify your email and unlock full access to Minecraft Temple server.
          </p>
          
          <a href="${verifyUrl}" style="display:inline-block; padding:8px 16px; background: #ffa41f; color:#ffffff; font-size:14px; font-weight:bold; border-radius:8px; text-decoration:none; border:1px solid #0000001a;">
            VERIFY NOW
          </a>
          
          <!-- Expiry warning with icon vibe -->
          <p style="font-size:14px; color:#313030; background:#ffa41f; padding:12px; border-radius:8px; border:1px solid #0000001a;">
            ⚠️ This verification link expires in 15 minutes. Verify soon to secure your spot in the Temple!
          </p>
        </div>
        
        <!-- Footer with socials -->
        <div style="background:#1a003; padding:25px; text-align:center; font-size:14px; color:#313030; border-top:1px solid #0000001a;">
          <p style="margin:0 0 14px;">Join the community & stay updated:</p>
          <div style="margin:15px 0;">
            ${socials.map(s => `
              <a href="${s.url}" style="margin:0 12px; display:inline-block;">
                <img src="${s.icon}" alt="${s.name}" style="width:36px; border-radius:50%; height:36px; filter:brightness(1.2) hue-rotate(20deg);">
              </a>
            `).join('')}
          </div>
          <p style="margin:20px 0 0; font-size:14px;">
            © Minecraft Temple 2026. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };
};
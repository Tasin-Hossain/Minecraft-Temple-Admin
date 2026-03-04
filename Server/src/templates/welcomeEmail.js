export const welcomeEmail = ({ name }) => ({
  subject: "Welcome to Minecraft-Temple 🎉",
  text: `Welcome ${name}! Thanks for joining.`,
  html: `<p>Welcome <strong>${name}</strong>! We're glad you're here.</p>`,
});
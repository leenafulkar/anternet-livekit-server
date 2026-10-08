// Run: npm install express cors livekit-server-sdk
import express from 'express';
import cors from 'cors';
import { AccessToken } from 'livekit-server-sdk';

const app = express();
app.use(cors());

// Use environment variables in production!
// ✅ Professional way: Securely get keys from Render's settings
const API_KEY = process.env.LIVEKIT_API_KEY || "APITz8SKL9Ayb8b";
const API_SECRET = process.env.LIVEKIT_API_SECRET || "QkC1PDgrhHEsBWUgyyLMgqloUZNTPhktFJg2igVfYEe";

app.get('/get-token', async (req, res) => {
  const { username, role, room } = req.query; // Get room from query

  if (!username) return res.status(400).json({ error: "Username required" });

  // Use the room passed from mobile, or default to quiz-room
  const roomName = room || "quiz-room";

  // ... inside your app.get('/get-token' ...
  const at = new AccessToken(API_KEY, API_SECRET, {
    identity: String(username),
  });

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: role === 'host',
    canPublishData: true,
    canSubscribe: true,
    video: true,
    audio: true,
  });

  const token = await at.toJwt();
  res.json({ token });
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

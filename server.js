// Run: npm install express cors livekit-server-sdk
import express from 'express';
import cors from 'cors';
import { AccessToken } from 'livekit-server-sdk';

const app = express();
app.use(cors());

// Use environment variables in production!
const API_KEY = "APIgdpva63HJnaM";
const API_SECRET = "lsQKKuobqAo0ltKMaAep6AfzijII3CMGbtUx0frKptcB";

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

// Look at the very bottom of your server file:
const PORT = 3000;

// CHANGE THIS LINE to include '0.0.0.0':
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is now reachable by the APK at http://10.0.2.2:${PORT}`);
});
import { OAuth2Client } from "google-auth-library"

const googleAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
)

export { googleAuth2Client }

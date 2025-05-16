import { query } from "./db";

export async function sendOtp(number: string | number, user: string) {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const smsUrl = `https://prpsms.co.in/API/SendMsg.aspx?uname=20230345&pass=DNglxC9h&send=RDNUTR&dest=${number}&msg=Hi ${user},%0AYour One time OTP ${otp} to authenticate your interest in QUA NUTRITION. Our team is looking forward to connect with you. %0AThanks, %0AQUA NUTRITION`;

    const resp = await fetch(smsUrl.toString(), {
      // PrpSMS returns a JSONP‐style response, so we just check status
      method: "GET",
    });
    if (!resp.ok) throw new Error(`SMS API Error ${resp.status}`);
    query("UPDATE users SET OTP = ? WHERE phone = ?", [
      otp.toString(),
      number.toString(),
    ]);
  } catch (error) {
    return error instanceof Error ? error.message : "Cannot send the otp .";
  }
}

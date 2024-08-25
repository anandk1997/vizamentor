export const env = Object.freeze({
  MONGO_URI: process.env.MONGO_URI,

  RAZORPAY_ID: process.env.RAZORPAY_ID,
  RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,

  JWT_SECRET: process.env.JWT_SECRET,

  CLIENT_URL: process.env.CLIENT_URL,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
});

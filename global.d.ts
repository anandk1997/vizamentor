declare global {
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };

  interface Window {
    Razorpay: any;
  }
}

export {};

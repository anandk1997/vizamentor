"use client";

import React, { useEffect, useState } from "react";
import DestinationCard from "../cards/DestinationCard";
import toast from "react-hot-toast";
import axios from "axios";
import { env } from "@/lib/env/intex";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useGetSession } from "@/hooks/useGetSession";
import { useGetToken } from "@/hooks/useGetToken";

function TopSellingSection() {
  const router = useRouter();
  const { data: session } = useGetSession();

  const token = session?.session;
  const user = session?.user;
  const bToken = useGetToken();

  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const createOrderId = async (productId: string, amount?: string) => {
    if (!token) return router.push("/sign-in");

    try {
      const { data: response } = await axios.post("/api/checkout", {
        amount: amount ?? 3000,
        userId: user?._id,
        productId,
      });

      return response.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const processPayment = async (e: any, productId: string, amount?: string) => {
    e.preventDefault();

    setLoadingItemId(productId);

    try {
      const orderId: string = await createOrderId(productId, amount);

      const options = {
        key: env.RAZORPAY_ID,
        amount: parseFloat(amount ?? "3000") * 100,
        currency: "INR",
        name: user?.name,
        description: "description",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const { data: res } = await axios.post("/api/verify", data);

          if (res.isOk) {
            toast.success(res?.message);
            window.location.reload();
          } else toast.error(res.message);
        },

        prefill: {
          name: user?.name,
          email: user?.email,
        },

        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", (response: any) => {
        toast.error(response.error.description);
      });

      paymentObject.open();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingItemId(null);
    }
  };

  const getOrders = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get("/api/getOrders", {
        ...bToken,

        params: { userId: user?._id },
      });

      return data?.data;
    } catch (error) {
      return [];
    }
  };

  const { data: orders } = useQuery({
    queryKey: ["orders", user?._id, token],
    queryFn: getOrders,
  });

  const purchasedProductIds = new Set(
    orders?.map((order: any) => order.productId),
  );

  const destinations = [
    {
      id: 0,
      imageUrl: "/images/canada.jpg",
      title: "Canada",
      amount: "₹ 3000",
      // duration: "10 Days Trip",
      highlighted: false,
    },
    {
      id: 1,
      imageUrl: "/images/austrailia.jpg",
      title: "Australia",
      amount: "₹ 3000",
      // duration: "12 Days Trip",
      highlighted: false,
    },
    {
      id: 2,
      imageUrl: "/images/america.jpg",
      title: "United States",
      amount: "₹ 3000",
      // duration: "28 Days Trip",
      highlighted: true,
    },
  ];

  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
  };

  const formattedDate = futureDate.toLocaleDateString("en-US", options);

  const [seconds, setSeconds] = useState(895);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const startTimer = () => {
      setIsRunning(true);
    };

    // Start the timer automatically when the component mounts
    startTimer();

    let interval: any;

    if (isRunning) {
      interval = setInterval(() => {
        // Decrease seconds by 1
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            // If seconds reach 0, stop the timer
            setIsRunning(false);
            return 895; // Reset seconds to initial value (or set to new value)
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }

    // Clear interval when isRunning changes to false
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <section>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <p className="text-lightGray text-[1.125rem] font-[600] text-center">
        Top Selling
      </p>
      <p className="volkhov text-[3.125rem] text-title font-[700] text-center">
        Top Courses
      </p>
      <div className="flex flex-col gap-4 md:flex-row items-center md:justify-between mt-16 w-full">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            imageUrl={destination.imageUrl}
            title={destination.title}
            // duration={destination.duration??""}
            isLoading={loadingItemId === destination.id.toString()}
            active={purchasedProductIds.has(destination.id.toString())}
            buy={(e: any) => processPayment(e, destination.id.toString())}
            duration={""}
            amount={destination.amount}
            highlighted={destination.highlighted}
          />
        ))}
      </div>

      <span className="flex mx-auto text-center max-w-[800px] py-3 rounded-full text-white text-3xl justify-center flex-wrap mb-3 bg-red-700 bounce">
        {/* Grab your offer before {formattedDate.toString()} */}
        TIME IS RUNNING OUT. GRAB YOUR SPOT FAST
      </span>

      <div className="flex justify-center gap-4">
        <div className="">
          <h1 className="bg-black px-16 py-4 rounded-lg text-green-500 flex flex-col gap-2 justify-center align-middle items-center">
            <span className="text-6xl font-bold">
              {formatTime(seconds).split(":")[1]}
            </span>

            <span className="text-white text-xl">Minutes</span>
          </h1>
        </div>

        <div className="">
          <h1 className="bg-black px-16 py-4 rounded-lg text-green-500 flex flex-col gap-2 justify-center align-middle items-center">
            <span className="text-6xl font-bold">
              {formatTime(seconds).split(":")[2]}
            </span>

            <span className="text-white text-xl">Seconds</span>
          </h1>
        </div>
      </div>

      <button
        className="bg-[black] hover:bg-[black]/90 text-white mx-auto text-2xl transition font-medium duration-200 h-auto rounded-lg px-8 flex items-center justify-center flex-wrap mt-3"
        style={{
          boxShadow:
            "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
        }}
        onClick={(e) => processPayment(e, "3", "9999")}
        disabled={loadingItemId === "3" || purchasedProductIds.has("3")}
      >
        {loadingItemId === "3" ? (
          "Loading"
        ) : purchasedProductIds.has("3") ? (
          "Current Product"
        ) : (
          <>
            Limited seats
            <span className="line-through font-thin mx-3">₹{9999 * 2}</span> ₹
            9999 only
          </>
        )}
      </button>
    </section>
  );
}

export default TopSellingSection;

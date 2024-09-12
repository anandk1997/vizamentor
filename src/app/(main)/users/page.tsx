"use client";

import { useGetSession } from "@/hooks/useGetSession";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";
import { useState, useRef, useEffect, Fragment } from "react";

const Users = () => {
  const session = useGetSession();
  const token = session?.session;
  const [openUser, setOpenUser] = useState<string | null>(null);
  const [heights, setHeights] = useState<Record<string, number>>({});

  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const getUsers = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data?.data;
    } catch (error) {
      return [];
    }
  };

  const { data: userList } = useQuery({
    queryKey: ["users", token],
    queryFn: getUsers,
  });

  if (session?.user?.role !== "ADMIN") redirect("/");

  const toggleOrderDetails = (email: string) => {
    setOpenUser(openUser === email ? null : email);
  };

  useEffect(() => {
    if (userList) {
      const newHeights: Record<string, number> = {};

      userList.forEach((user: any) => {
        if (contentRefs.current[user.email]) {
          newHeights[user.email] = 180;
        }
      });

      setHeights(newHeights);
    }
  }, [userList]);

  return (
    <div className="w-100 overflow-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Orders</h1>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userList && userList.length > 0 ? (
            userList.map((user: any) => (
              <Fragment key={user.email}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleOrderDetails(user.email)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => toggleOrderDetails(user.email)}
                    >
                      Show Orders
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="px-6 py-4">
                    <div
                      ref={(el) => {
                        if (el) {
                          contentRefs.current[user.email] = el;
                        }
                      }}
                      className="overflow-auto transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight:
                          openUser === user.email
                            ? `${heights[user.email] || 0}px`
                            : "0px",
                      }}
                    >
                      {openUser === user.email && (
                        <div>
                          {user.orderDetails && user.orderDetails.length > 0 ? (
                            <>
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Product ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Payment Status
                                    </th>
                                  </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                  {user.orderDetails.map(
                                    (order: any, index: number) => (
                                      <tr className="hover:bg-gray-50 cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          {order.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {order.productId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {order.paymentStatus}
                                        </td>
                                      </tr>
                                    ),
                                  )}
                                </tbody>
                              </table>
                            </>
                          ) : (
                            <p className="text-center">
                              No order details available.
                            </p>
                          )}
                        </div>
                      )}
                      {/* {openUser === user.email && (
                        <div>
                          {user.orderDetails && user.orderDetails.length > 0 ? (
                            <ul className="space-y-2">
                              {user.orderDetails.map(
                                (order: any, index: number) => (
                                  <li key={index} className="border-t pt-2">
                                    <p>
                                      <strong>Amount:</strong> {order.amount}
                                    </p>
                                    <p>
                                      <strong>Product ID:</strong>{" "}
                                      {order.productId}
                                    </p>
                                    <p>
                                      <strong>Payment Status:</strong>{" "}
                                      {order.paymentStatus}
                                    </p>
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            <p>No order details available.</p>
                          )}
                        </div>
                      )} */}
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RootState, useAppSelector } from "@/store";
import { useSession } from "next-auth/react";

// const Payment = ({ orderId }: { orderId: string }) => {
const Payment = () => {
  // const [creditCardAmount, setCreditCardAmount] = useState(0);
  // const [bankTransferAmount, setBankTransferAmount] = useState(0);
  const [creditCardAmount, setCreditCardAmount] = useState(1500000);
  const [bankTransferAmount, setBankTransferAmount] = useState(100000);
  const router = useRouter();
  // const { user } = useAppSelector((state) => state.auth);

  const { data: session, status } = useSession();

  const { order } = useAppSelector((state: RootState) => state.orderItem);
  const orderId = order?.[0]?.id;

  console.log(order, "<=== order");

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        `/api/v1/orders/${orderId}/process-payment`,
        {
          userId: session?.user?.id,
          paymentDetails: {
            CREDIT_CARD: creditCardAmount,
            BANK_TRANSFER: bankTransferAmount,
          },

          //       "CREDIT_CARD": 1500000,
          // "BANK_TRANSFER": 100000
        }
      );

      console.log(JSON.stringify(response.data), "<===");

      if (response.status === 200) {
        alert("Payment processed successfully!");
        router.push("/confirmation");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      // alert("Error processing payment. Please try again.");
    }
  };

  // const handlePayment = async () => {
  //   try {
  //     const response = await fetch(
  //       `/api/v1/orders/${orderId}/process-payment`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${session?.sessionToken}`,
  //         },
  //         body: JSON.stringify({
  //           userId: session?.user?.id,
  //           paymentDetails: {
  //             CREDIT_CARD: creditCardAmount,
  //             BANK_TRANSFER: bankTransferAmount,
  //           },
  //         }),
  //       }
  //     );

  //     const responseData = await response.json(); // Parse JSON response

  //     console.log("Response Data:", responseData); // Log the response data

  //     if (response.ok) {
  //       alert("Payment processed successfully!");
  //       router.push("/confirmation");
  //     } else {
  //       throw new Error(responseData.message || "Failed to process payment");
  //     }
  //   } catch (error) {
  //     console.error("Error processing payment:", error);
  //     alert("Error processing payment. Please try again.");
  //   }
  // };

  return (
    <div className="bg-custom-gradient w-full h-full overflow-x-hidden py-8 pt-24">
      <h1 className="text-[#fff] text-2xl font-semibold text-center mb-8">
        Payment
      </h1>
      <div className="max-w-md mx-auto bg-blue-900 p-6 rounded-lg">
        <div className="mb-4">
          <label htmlFor="creditCard" className="block text-[#fff] mb-2">
            Credit Card Amount
          </label>
          <input
            type="number"
            id="creditCard"
            value={creditCardAmount}
            onChange={(e) => setCreditCardAmount(Number(e.target.value))}
            className="w-full p-2 rounded bg-custom-gradient border border-[#fff] text-[#fff]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bankTransfer" className="block text-[#fff] mb-2">
            Bank Transfer Amount
          </label>
          <input
            type="number"
            id="bankTransfer"
            value={bankTransferAmount}
            onChange={(e) => setBankTransferAmount(Number(e.target.value))}
            className="w-full p-2 rounded bg-custom-gradient border border-[#fff] text-[#fff]"
          />
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-green-700 hover:bg-green-600 text-[#fff] font-semibold py-2 px-4 rounded">
          Process Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;

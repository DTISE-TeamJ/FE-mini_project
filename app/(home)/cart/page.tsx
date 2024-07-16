// ANJING BANG

"use client";

import React, { useEffect, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CiDiscount1 } from "react-icons/ci";
import { styled } from "styled-components";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
// import { RootState, useAppDispatch, useAppSelector } from "store";
import { signIn, useSession } from "next-auth/react";

import {
  deleteItem,
  getOrderItem,
  updateQuantity,
  adjustQuantity,
} from "store/action/order-slice";
import { redirect, useRouter } from "next/navigation";

interface SliderButtonProps {
  isActive: boolean;
}

const SliderContainer = styled.div`
  width: 60px;
  height: 24px;
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const SliderButton = styled.div<SliderButtonProps>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.isActive ? "#16a34a" : "lightgray")};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: ${(props) => (props.isActive ? "80%" : "20%")};
  transform: translate(-50%, -50%);
  transition: left 0.3s ease, background-color 0.3s ease;
`;

const CartPage: React.FC = () => {
  const [isDiscountActive, setIsDiscountActive] = useState(false);
  const [isPointActive, setIsPointActive] = useState(false);
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();
  const router = useRouter();

  const { order } = useAppSelector((state: RootState) => state.orderItem);
  const [selectedTickets, setSelectedTickets] = useState(
    order?.orderItems || []
  );

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "USER") {
        dispatch(getOrderItem(order?.[0]?.userId));
      } else {
        router.push("/");
      }
    } else if (status === "unauthenticated") {
      router.push("/");
    }
    // else {
    //   router.push('/auth/signin');
    // }
  }, [status, session, dispatch, router]);

  const toggleDiscountSlider = () => {
    setIsDiscountActive((prev) => !prev);
  };

  const togglePointSlider = () => {
    setIsPointActive((prev) => !prev);
  };

  const formatPrice = (price: number | undefined) => {
    if (!price) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleIncreaseQuantity = (itemId: number) => {
    const updatedTickets = selectedTickets.map((item: any) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setSelectedTickets(updatedTickets);

    dispatch(updateQuantity({ id: itemId, quantity: 1 }));
  };

  const handleDecreaseQuantity = (itemId: number) => {
    const updatedTickets = selectedTickets.map((item: any) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setSelectedTickets(updatedTickets);

    dispatch(updateQuantity({ id: itemId, quantity: -1 }));
  };

  const handleDeleteItem = (itemId: number) => {
    const updatedTickets = selectedTickets.filter(
      (item: any) => item.id !== itemId
    );
    setSelectedTickets(updatedTickets);

    dispatch(deleteItem(itemId));
  };

  return (
    <div className="bg-custom-gradient w-full h-full overflow-x-hidden">
      <h1 className="text-[#fff] pt-24 text-2xl font-semibold text-center">
        My Cart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="contact-detail mx-4 md:mx-16">
          <h1 className="text-[#fff] text-xl font-mono font-semibold">
            Contact Detail
          </h1>
          <div className="border bg-blue-900 border-x-blue-400 border-y-blue-400 rounded-lg p-4 my-4">
            <div className="flex justify-start gap-4 items-center">
              <IoInformationCircleOutline className="text-[#fff]" size={40} />
              <h1 className="text-[#fff]">
                E-tickets will be sent to your email address, please make sure
                your email address correct
              </h1>
            </div>
          </div>

          <form className="mx-2">
            <div className="mb-4">
              <label htmlFor="name" className="text-[#fff] block mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="border-2 bg-custom-gradient border-[#fff] rounded-lg p-2 w-full text-[#fff] font-semibold font-roboto focus:border-white"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-[#fff] block mb-1">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="border-2 bg-custom-gradient border-[#fff] rounded-lg p-2 w-full text-[#fff] font-semibold font-roboto"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="text-[#fff] block mb-1">
                Phone
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                className="border-2 bg-custom-gradient border-[#fff] rounded-lg p-2 w-full text-[#fff] font-semibold font-roboto"
              />
            </div>
          </form>
        </div>

        <div className="promo-usage mx-4 md:mx-16">
          <div className="border bg-yellow-400 border-orange-400 rounded-lg p-4">
            <div className="flex justify-start gap-4 items-center">
              <CiDiscount1 className="text-[#fff]" size={40} />
              <h1 className="text-[#fff] text-xl font-bold font-mono">
                Name Promo
              </h1>
            </div>

            <h1 className="font-bold text-xl text-[#fff] ms-14 my-2 font-nunito">
              Total Promo
            </h1>

            <div className="flex items-center justify-between border-t border-gray-500 pt-2 mt-2">
              <h3 className="font-semibold text-[#fff] ms-14">Claim:</h3>
              <SliderContainer onClick={toggleDiscountSlider}>
                <SliderButton isActive={isDiscountActive} />
              </SliderContainer>
            </div>
          </div>

          <div className="flex justify-between mx-4 mt-8">
            <h3 className="text-[#fff] text-xl font-roboto">My Point : 1000</h3>
            <SliderContainer onClick={togglePointSlider}>
              <SliderButton isActive={isPointActive} />
            </SliderContainer>
          </div>

          <div className="border-2 border-[#fff] rounded-lg p-4 mt-8">
            <h1 className="text-[#acacac] font-bold text-lg font-mono">
              Order Summary
            </h1>

            {selectedTickets.map((item: any) => (
              <div key={item.id}>
                <div className="my-4">
                  <p className="text-[#fff] text-xl">{item.eventName}</p>
                  <div className="flex justify-between mt-1">
                    <p className="text-[#fff] text-xs">
                      {item.ticketName} x {item.quantity}
                    </p>
                    <p className="text-[#fff] font-bold text-xs">
                      {formatPrice(item.originalPrice)}
                    </p>
                  </div>

                  <div className="mt-2 flex gap-4">
                    <button
                      className="text-[#fff] font-semibold text-xl"
                      onClick={() => handleIncreaseQuantity(item.id)}>
                      +
                    </button>
                    <button
                      className="text-[#fff] font-semibold text-xl"
                      onClick={() => handleDecreaseQuantity(item.id)}>
                      -
                    </button>
                    <button
                      className="p-2 bg-[#fff] text-red-500 font-semibold rounded-full text-xs"
                      onClick={() => handleDeleteItem(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-500 pt-2 mt-4"></div>
              </div>
            ))}

            <div className="flex justify-between items-center my-4">
              <p className="text-[#fff] font-bold">Total :</p>
              <p className="text-[#fff] font-bold">
                {formatPrice(
                  selectedTickets.reduce(
                    (acc: any, item: any) =>
                      acc + item.originalPrice * item.quantity,
                    0
                  )
                )}
              </p>
            </div>

            <button
              type="button"
              className={`p-2 w-full rounded-full text-[#fff] font-semibold mt-4 ${
                selectedTickets.length === 0
                  ? "bg-[#acacac]"
                  : "bg-green-700 hover:bg-green-600"
              }`}
              disabled={selectedTickets.length === 0}
              // onClick={handleOrderNow}
            >
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

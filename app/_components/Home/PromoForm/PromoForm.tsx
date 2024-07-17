import React, { useState } from "react";
import { useAppDispatch } from "@/store";
import axios from "axios";

interface PromoCodeFormProps {
  orderId: number;
  eventId: number;
  userId: number;
}

const PromoCodeForm: React.FC<PromoCodeFormProps> = ({
  orderId,
  eventId,
  userId,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/apply-promo`,
        {
          orderId,
          eventId,
          promoCode,
          userId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setMessage("Promo code applied successfully!");
        // You might want to dispatch an action here to update the order state
        // dispatch(updateOrder(response.data.updatedOrder));
      } else {
        setMessage("Failed to apply promo code. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleApplyPromo} className="flex items-center">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code"
          className="border-2 bg-custom-gradient border-[#fff] rounded-lg p-2 w-full text-[#fff] font-semibold font-roboto mr-2"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-white font-bold py-2 px-4 rounded">
          Apply
        </button>
      </form>
      {message && <p className="text-[#fff] mt-2">{message}</p>}
    </div>
  );
};

export default PromoCodeForm;

import React from "react";
import { IoClose } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  primaryActionText: string;
  onPrimaryAction: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  content,
  primaryActionText,
  onPrimaryAction,
}) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed z-10 inset-0 flex justify-center items-center transition-colors bg-black/20">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow p-6 transition-all scale-100 opacity-100">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
          <IoClose size={24} />
        </button>

        <div className="text-center w-72">
          <IoIosWarning size={44} className="mx-auto text-red-500" />
          <div className="mx-auto my-4 w-60">
            <h3 className="text-lg font-black text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{content}</p>
          </div>
          <div className="flex gap-4">
            <button
              className="p-2 bg-[#1f883d] w-full rounded-lg text-[#fff] font-medium	hover:bg-[#18692f]"
              onClick={onPrimaryAction}>
              {primaryActionText}
            </button>
            <button
              className="p-2 bg-[#ebedf0] w-full rounded-lg text-[#d1242f] font-medium hover:bg-[#dfe1e3]"
              onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;

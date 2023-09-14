import React, { useEffect, useRef } from "react";
import Image from "next/image";

function ModelListPopup({ onClose, openDeletePopup, openPopupRowIndex }: any) {
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="absolute w-40  rounded-[4px] bg-white shadow border border-[#E8E7E7] z-10"
      ref={popupRef}
    >
      <div
        className="flex items-center justify-center gap-4 p-2 my-2 hover:bg-[#F7FAFB] "
        onClick={() => {
          onClose();
          openDeletePopup(openPopupRowIndex);
        }}
      >
        {" "}
        <h2 className="text-xs font-medium	">Delete model</h2>
        <Image
          src="/delete.svg"
          alt="delete"
          width={20}
          height={20}
          className="object-contain cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ModelListPopup;

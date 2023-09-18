import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

function DatasetListPopup({
  onClose,
  openDeletePopup,
  openPopupRowIndex,
}: any) {
  const [loading, setloading] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  // const deleteFunction = async () => {
  //   setloading(true);
  //   try {
  //     const queryParams = new URLSearchParams({
  //       dataset_id: dataset_id,
  //     });

  //     const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/datasets/delete?${queryParams}`;

  //     const response = await fetch(apiUrl, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const status = response.status;
  //     if (status == 200) {
  //       getDataSetsList();
  //       setloading(false);
  //       toast.success("Dataset deleted", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       onClose();
  //     } else {
  //       throw new Error("something went wrong");
  //     }
  //   } catch (error) {
  //     toast.error("something went wrong", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     setloading(false);
  //     onClose();
  //   } finally {
  //     setloading(false);
  //     onClose();
  //   }
  // };

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
        onClick={() => openDeletePopup(openPopupRowIndex)}
      >
        {" "}
        <h2 className="text-xs font-medium">Delete Dataset</h2>
        {loading ? (
          <svg
            aria-hidden="true"
            role="status"
            className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            ></path>
          </svg>
        ) : (
          <Image
            src="/delete.svg"
            alt="delete"
            width={20}
            height={20}
            className="object-contain cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default DatasetListPopup;

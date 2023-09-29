"use client";
import Image from "next/image";

function ViewAllUsersPopup({ handleClose, users }: any) {
  console.log(users);
  return (
    <div className="modal-overlay">
      <div className="modal rounded-[8px] flex justify-start flex-col items-start px-8 py-6 w-[984px] shadow">
        <Image
          src="/close.svg"
          alt="close"
          width={24}
          height={24}
          className="close hover-white"
          onClick={handleClose}
        />
        <h2 className="text-lg font-medium">All Users</h2>
        <div className="max-h-[500px] w-full overflow-y-scroll">
          {users &&
            users.map((user: any, index: any) => (
              <div
                key={index}
                className="w-full flex justify-between items-center px-2 py-2 my-2"
              >
                <div className="grid grid-cols-3 gap-2 w-full p-2">
                  <h2>
                    <span className="font-semibold text-m">Email:</span>
                    {user.email}
                  </h2>
                  <h2>
                    {" "}
                    <span className="font-semibold text-m">First Name:</span>
                    {user.first_name}
                  </h2>
                  <h2>
                    {" "}
                    <span className="font-semibold text-m">Last Name:</span>
                    {user.last_name}
                  </h2>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ViewAllUsersPopup;

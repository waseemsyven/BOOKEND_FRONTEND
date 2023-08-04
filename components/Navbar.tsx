import Link from "next/link";
import Image from "next/image";

const Navbar = () => (
  <header className="w-full z-10 rounded-tl-2xl rounded-none bg-white">
    <nav className="mx-auto flex justify-between items-center px-4 py-4 bg-transparent">
      <div className="flex gap-2">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/office.svg"
            alt="office"
            width={22}
            height={20}
            className="object-contain"
          />
        </Link>
        <h1 className="nav__title">Organization</h1>
      </div>
      <div className="flex gap-2 items-end">
        <h2 className="black-100 text-[13px] font-medium mb-1">User Name</h2>
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/user_icon.svg"
            alt="user_icon"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>
    </nav>
  </header>
);

export default Navbar;

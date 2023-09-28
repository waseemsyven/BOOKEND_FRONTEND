import { useSession } from "next-auth/react";

export function formatCountWithLeadingZeros(count:number) {
    return count.toString().padStart(2, '0');
  }

  export const getUsersList = async () => {
    const { data: session, status } = useSession();
    const user: any = session?.user;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/users/list`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${user.token}`,
          },
        }
      );
      const users = await response.json();

      return users

    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }
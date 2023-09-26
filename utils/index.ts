export function formatCountWithLeadingZeros(count:number) {
    return count.toString().padStart(2, '0');
  }

  export const getUsersList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/list`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
          },
        }
      );
      const users = await response.json();

      return users

    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }
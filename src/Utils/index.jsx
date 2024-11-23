// Helper function to get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// FORMAT NUMBERS WITH COMMAS LIKE (27,444)
export const formatNumberWithCommas = (number) => {
  return number.toLocaleString();
};

// PRICE FUNCTION
export const MrPrice = (Price) => {
  return Price?.toLocaleString("en-US", {
    style: "currency",
    currency: "INR",
  });
};

// GREETING FUNCTION
export const getGreeting = () => {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  const hour = parseInt(currentTime.split(":")[0]);

  if (hour >= 4 && hour < 12) {
    return "Good morning!";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon!";
  } else {
    return "Good evening!";
  }
};

// USER STATUS (2 MONTH'S AGO) FUNCTION
export const timeAgo = (timestamp) => {
  const secondsAgo = Math.floor((Date.now() - timestamp) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let interval in intervals) {
    const value = Math.floor(secondsAgo / intervals[interval]);
    if (value >= 1) {
      return value + " " + (value === 1 ? interval : interval + "s") + " ago";
    }
  }

  return "Just now";
};

// date formate log date
export const formattedDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

//phonenumber formatt
export const formatPhoneNumber = (phoneNumber) => {
  const numericOnly = phoneNumber.replace(/\D/g, "");
  const formattedNumber = `+${numericOnly.slice(0, 2)} ${numericOnly.slice(
    2,
    7
  )} ${numericOnly.slice(7)}`;

  return formattedNumber;
};

// Get First character of each word
export const getFirstCharacters = (name) => {
  if (!name) return null; // Handling null or undefined cases
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

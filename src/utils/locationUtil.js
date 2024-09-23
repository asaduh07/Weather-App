export const getCurrentLocation = async () => {
  if (!navigator.geolocation) {
    // Geolocation is not supported, return null
    return null;
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Location access granted
          resolve(position);
        },
        (error) => {
          // Location access denied or an error occurred
          // Instead of logging or rejecting, resolve with null
          resolve(null);
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 5000, // Set a timeout (in milliseconds)
          maximumAge: 0 // Don't use cached location data
        }
      );
    });

    return position;
  } catch (error) {
    // If there's a catchable error, return null instead of throwing
    return null;
  }
};

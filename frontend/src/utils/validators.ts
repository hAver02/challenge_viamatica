
export const validateUsername = (username: string): string | null => {
  if (!username) return "Username is required";
  
  // Length between 8 and 20 characters
  if (username.length < 8 || username.length > 20) {
    return "Username must be between 8 and 20 characters";
  }
  
  // No symbols or special characters
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "Username cannot contain symbols or special characters";
  }
  
  // At least one uppercase letter
  if (!/[A-Z]/.test(username)) {
    return "Username must contain at least one uppercase letter";
  }
  
  // At least one number
  if (!/[0-9]/.test(username)) {
    return "Username must contain at least one number";
  }
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  
  // Minimum 8 characters
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  
  // At least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  
  // At least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }
  
  // No spaces
  if (/\s/.test(password)) {
    return "Password cannot contain spaces";
  }
  
  return null;
};

export const validateDocument = (document: string): string | null => {
  if (!document) return "Document is required";
  
  // Exactly 10 digits
  if (!/^\d{10}$/.test(document)) {
    return "Document must be exactly 10 digits";
  }
  
  // Check for 4 consecutive repeated digits
  for (let i = 0; i <= document.length - 4; i++) {
    const digit = document[i];
    if (
      digit === document[i + 1] &&
      digit === document[i + 2] &&
      digit === document[i + 3]
    ) {
      return "Document cannot have the same digit repeated 4 times consecutively";
    }
  }
  
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return "This field is required";
  
  if (name.length < 2) {
    return "Must be at least 2 characters";
  }
  
  return null;
};

export const validateDate = (date: string): string | null => {
  if (!date) return "Date is required";
  
  const selectedDate = new Date(date);
  const now = new Date();
  
  if (selectedDate > now) {
    return "Date cannot be in the future";
  }
  
  // Check if person is at least 18 years old
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  
  if (selectedDate > eighteenYearsAgo) {
    return "You must be at least 18 years old";
  }
  
  return null;
};

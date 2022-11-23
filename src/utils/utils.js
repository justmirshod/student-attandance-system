import { toast } from "react-toastify";
import validator from "validator";
export const notify = (text, status) => {
  toast(text, { type: status });
  return;
};

// export const validateEmail = (email) => {
//   if (!validator.isEmail(email)) {
//     toast.error("Please enter valid email!!!");
//     console.log("Hello world");
//     return;
//   }
// };

export function validateEmail(email) {
  if (!validator.isEmail(email)) {
    toast.error("Please enter valid email!!!");
    return;
  }
}

import { toast } from "react-toastify";
export const notify = (text, status) => {
  toast(text, { type: status });
  return;
};

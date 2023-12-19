type AlertProps = {
  message: string;
  type: "error" | "success";
};

export const AlertNotify = ({ message, type }: AlertProps) => {
  type === "error" ? alert(message) : alert(message);
};

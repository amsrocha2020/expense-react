import { useState } from "react";

const useShareableState = () => {
  const [leftOpen, setleftOpen] = useState(true);
  return {
    leftOpen,
    setleftOpen
  };
};

export default useShareableState;
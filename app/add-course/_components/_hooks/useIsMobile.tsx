import { useMediaQuery } from "usehooks-ts";

const useIsMobile = () => {
  const isMobile = useMediaQuery("(max-width: 430px)");

  return isMobile;
};

export default useIsMobile;

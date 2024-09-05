import { useMediaQuery } from "usehooks-ts";

const useIsMobile = () => {
  const isMobile = useMediaQuery("(max-width: 400px)");

  return isMobile;
};

export default useIsMobile;

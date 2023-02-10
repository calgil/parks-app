import { useEffect } from "react";

export const useClickOutside = ({
  onClickOutside,
  dependencies,
  containerRef,
}) => {
  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [...dependencies]);
};

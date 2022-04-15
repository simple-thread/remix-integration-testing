import { useCallback, useMemo } from "react";

export const useSound = (path: string) => {
  const sound = useMemo(() => {
    if (typeof Audio == "undefined") return null; // if we're server-side
    return new Audio(path);
  }, [path]);

  const play = useCallback(async () => {
    if (sound) await sound.play();
  }, [sound]);

  return useMemo(() => [play], [play]);
};

import { useCallback, useEffect, useMemo, useState } from "react";
import { timerString } from "~/helpers/timer";

export const useTimer = (initTime: number, onEnd?: () => void): string => {
  const [time, setTime] = useState(initTime);
  useEffect(() => {
    setTime(initTime); // Reset timer if init time changes
  }, [initTime]);
  const [running, setRunning] = useState(false);

  const countdown = useCallback(() => {}, []);

  useEffect(() => {
    const tick = setTimeout(() => {
      setTime((pastTime) => {
        if (pastTime > 0) {
          return pastTime - 1;
        }
        return 0;
      });
    }, 1000);

    return () => clearTimeout(tick);
  });

  useEffect(() => {
    if (time == 0 && onEnd) onEnd();
  }, [time, onEnd]);

  return useMemo(() => timerString(time), [time]);
};

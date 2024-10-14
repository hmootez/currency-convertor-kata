import { useEffect, useState, useCallback } from "react";

export const useConvert = () => {
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(0.0);

  // Purge history data if it exceeds 5 entries
  useEffect(() => {
    if (history.length > 5) {
      setHistory((prevHistory) => prevHistory.slice(-5));
    }
  }, [history]);

  const handleConvert = useCallback(
    (
      value,
      toSave,
      changeToUSD,
      changeRate,
      actualChangeRate,
      manualChangeRate,
    ) => {
      const isUSD = changeToUSD ? "USD" : "EUR";
      const isEUR = changeToUSD ? "Euro" : "USD";

      let res;
      if (changeToUSD) {
        res = (value * changeRate).toFixed(2);
      } else {
        res = (value / changeRate).toFixed(2);
      }

      if (toSave) {
        setHistory((prevHistory) => [
          ...prevHistory,
          [
            actualChangeRate.toFixed(2),
            manualChangeRate,
            value,
            isEUR,
            res,
            isUSD,
          ],
        ]);
      }

      setResult(res);
    },
    [],
  );

  return {
    result,
    history,
    handleConvert,
  };
};

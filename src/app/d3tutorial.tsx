
import { useEffect, useRef, useState} from 'react';
export function D3tutorial() {
    const generateDataset = () => (
      Array(10).fill(0).map(() => ([
        Math.random() * 80 + 10,
        Math.random() * 35 + 10,
      ]))
    )

    const [dataset, setDataset] = useState(
      generateDataset()
    )
  
    useInterval(() => {
      const newDataset = generateDataset()
      setDataset(newDataset)
    }, 3000)
  
    return (
    <svg viewBox="0 0 100 50">
      {dataset.map(([x, y], i) => (
        <circle
          fill='white'
          key={i}
          cx={x}
          cy={y}
          r="3"
        />
      ))}
    </svg>
    )
}

type Call = () => void;
function useInterval(callback: Call , delay : number) {
  const savedCallback = useRef<Call>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current !== undefined) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
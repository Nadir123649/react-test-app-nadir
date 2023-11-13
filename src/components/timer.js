import React from "react";
import { useState , useEffect} from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, [count]);
  return (
    <div>
      <h1>
        I have saw that the counter is running dynamically {count} times!.
      </h1>
    </div>
  );
}

export default Timer;

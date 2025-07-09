import { Button, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import ChildrenOfCounter from "./ChildrenOfCounter";

function Counter() {
  const [count, setCount] = useState(0);

  const someObj = useMemo(
    () => ({
      firstName: "Tzach",
      lastName: "Dabush",
    }),
    []
  );

  const doSomething = useCallback(() => {
    console.log("something");
  }, []);

  return (
    <div>
      <Typography>{count}</Typography>
      <Button onClick={() => setCount((prev) => prev + 1)}>+</Button>
      <Button onClick={() => setCount((prev) => prev - 1)}>-</Button>

      <ChildrenOfCounter someObj={someObj} doSomething={doSomething} />
    </div>
  );
}

export default Counter;

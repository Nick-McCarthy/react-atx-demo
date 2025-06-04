import { useState, useRef } from "react";

export default async function Test() {
  const [thing, setThing] = useState();
  const countRef = useRef<number>(0);

  useEffect(() => {
    console.log("count changed trigger rerender");
  }, [countRef]);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

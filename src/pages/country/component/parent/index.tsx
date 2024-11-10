/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, useRef } from "react";
import Child from "../child";

const Parent: React.FC<PropsWithChildren> = () => {
  const inputRef = useRef<any>(null);

  const handleParentBtnClick: React.ComponentProps<"button">["onClick"] =
    () => {
      inputRef?.current?.sumOneAndTwo();
    };

  return (
    <>
      <button onClick={handleParentBtnClick}>Parent Button</button>
      <Child title="Child Button" ref={inputRef} />
    </>
  );
};

export default Parent;

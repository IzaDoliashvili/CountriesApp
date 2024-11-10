import { forwardRef, memo, useImperativeHandle } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ref = any;

type Props = { title: string };

const Child = forwardRef<Ref, Props>(({ title }, ref) => {
  const handleSumOneAndTwo = () => {
    console.log(1 + 2);
  };

  useImperativeHandle(ref, () => {
    return {
      sumOneAndTwo: handleSumOneAndTwo,
    };
  }, []);

  return <button>{title}</button>;
});

export default memo(Child);

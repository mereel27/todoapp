import { ArrowLeft2 } from "iconsax-react";

export default function DoubleArrowLeft({ size }) {
  return (
    <>
      <ArrowLeft2 size={size} />
      <ArrowLeft2 size={size} style={{ marginLeft: '-12px' }} />
    </>
  );
}

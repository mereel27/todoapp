import { ArrowLeft2 } from "iconsax-react";

export default function DoubleArrowLeft({ size }) {
  return (
    <>
      <ArrowLeft2 size={size} variant='Bold'/>
      <ArrowLeft2 size={size} variant='Bold' style={{ marginLeft: '-10px' }} />
    </>
  );
}

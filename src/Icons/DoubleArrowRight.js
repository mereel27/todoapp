import { ArrowRight2 } from "iconsax-react";

export default function DoubleArrowRight({ size }) {
  return (
    <>
      <ArrowRight2 size={size} variant='Bold'/>
      <ArrowRight2 size={size} variant='Bold' style={{ marginLeft: '-10px' }} />
    </>
  );
}

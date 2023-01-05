import { ArrowRight2 } from "iconsax-react";

export default function DoubleArrowRight({ size }) {
  return (
    <>
      <ArrowRight2 size={size} />
      <ArrowRight2 size={size} style={{ marginLeft: '-12px' }} />
    </>
  );
}

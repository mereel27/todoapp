import { Badge } from '@nextui-org/react';

export default function ItemList({ items }) {
  const list = items.length > 0 ? items : ['None'];
  return (
    <>
      {list.map((item, index) => (
        <Badge
          variant="flat"
          isSquared
          disableOutline
          color="primary"
          key={index}
          css={{ flexGrow: 1 }}
        >
          {item}
        </Badge>
      ))}
    </>
  );
}

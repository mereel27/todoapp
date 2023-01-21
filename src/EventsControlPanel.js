import { Grid, Dropdown, styled } from '@nextui-org/react';
import { Sort, Filter } from 'iconsax-react';
import { filterOptions } from './utils';

const SortIcon = styled(Sort, {
  marginRight: '$3',
});

const FilterIcon = styled(Filter, {
  marginRight: '$3',
});

const ColorCircle = styled('span');

const CatCircle = ({ color }) => {
  return (
    <ColorCircle
      css={{
        width: '1em',
        height: '1em',
        borderRadius: '50%',
        backgroundColor: `$${color}`,
      }}
    ></ColorCircle>
  );
};

export default function EventsControlPanel({
  setSortBy,
  sortBy,
  filters,
  setFilters,
}) {
  const handleSortChange = value => setSortBy([...value][0]);

  const handleFiltersChange = value => {
    const status = [...value].find(key => key === 'uncompleted' || key === 'completed');
    const cat = [...value].find(key => key.includes('cat'))
    if (value.anchorKey === 'reset') {
      setFilters(filterOptions);
    } else if (!status || !cat) {
      return;
    } else {
      setFilters([...value])
    }
  };

  return (
    <Grid
      css={{
        display: 'flex',
        gap: '$2',
        width: 'calc(100% - 20px)',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '$md 0',
      }}
    >
      <Dropdown>
        <Dropdown.Button light>
          <SortIcon />
          Sort
        </Dropdown.Button>
        <Dropdown.Menu
          selectionMode="single"
          selectedKeys={sortBy}
          color="primary"
          onSelectionChange={handleSortChange}
          disallowEmptySelection
        >
          <Dropdown.Item key="nearest">Date: nearest date</Dropdown.Item>
          <Dropdown.Item key="further">Date: further date</Dropdown.Item>
          <Dropdown.Item key="uncompleted">Uncompleted first</Dropdown.Item>
          <Dropdown.Item key="completed">Completed first</Dropdown.Item>
          <Dropdown.Item key="nameA">Name: A-Z</Dropdown.Item>
          <Dropdown.Item key="nameZ">Name: Z-A</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Button light>
          <FilterIcon />
          Filter
        </Dropdown.Button>
        <Dropdown.Menu
          color="secondary"
          aria-label="Filter"
          selectionMode="multiple"
          selectedKeys={filters}
          onSelectionChange={handleFiltersChange}
          disallowEmptySelection
          /* shouldFocusWrap */
          /* css={{ $$dropdownMenuWidth: '280px' }} */
        >
          <Dropdown.Section title="Category">
            <Dropdown.Item
              key="cat_work"
              icon={<CatCircle color="secondary" />}
            >
              Work
            </Dropdown.Item>
            <Dropdown.Item key="cat_study" icon={<CatCircle color="success" />}>
              Study
            </Dropdown.Item>
            <Dropdown.Item
              key="cat_entertainment"
              icon={<CatCircle color="warning" />}
            >
              Entertainment
            </Dropdown.Item>
            <Dropdown.Item key="cat_workout" icon={<CatCircle color="error" />}>
              Workout
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Section title="Status">
            <Dropdown.Item key="completed">Completed</Dropdown.Item>
            <Dropdown.Item key="uncompleted">Uncompleted</Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Item withDivider key='reset'>Reset</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Grid>
  );
}

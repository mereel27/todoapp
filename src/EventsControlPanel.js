import { Grid, Dropdown, Button, styled } from '@nextui-org/react';
import { Sort, Filter, Task, Trash } from 'iconsax-react';
import { defaultFilters } from './utils';
import DeleteEventDialog from './DeleteEventDialog';
import { useState } from 'react';

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
  isSelect,
  handleSelect,
  handleMultiplyDelete,
  handleMultiplyCategoryChange,
  handleMultiplyStatusChange,
  disabled,
  actionsDisabled,
  itemsQuantity,
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSortChange = (value) => setSortBy([...value][0]);

  const handleFiltersChange = (value) => {
    const status = [...value].find(
      (key) => key === 'uncompleted' || key === 'completed'
    );
    const cat = [...value].find((key) => key.includes('cat'));
    if (value.anchorKey === 'reset') {
      setFilters(defaultFilters);
    } else if (!status || !cat) {
      return;
    } else {
      setFilters([...value]);
    }
  };

  const handleCategoryChange = (key) =>
    handleMultiplyCategoryChange(key.slice(4));

  const handleStatusChange = (key) => {
    if (key === 'completed') {
      handleMultiplyStatusChange(true);
    } else {
      handleMultiplyStatusChange(false);
    }
  };

  const handleDelete = () => {
    handleMultiplyDelete();
    setDialogOpen(false);
  };

  return (
    <Grid
      css={{
        width: 'calc(100% - 20px)',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '$xs 0',
        /* marginTop: '$lg', */
      }}
    >
      <Grid
        css={{
          display: 'flex',
          alignItems: 'center',
          gap: '$2',
          width: '100%',
          paddingBottom: isSelect ? '$sm' : '',
          borderBottom: isSelect ? '1px solid $border' : '',
        }}
      >
        <Button.Group css={{ margin: 0 }}>
          <Dropdown>
            <Dropdown.Button
              disabled={disabled}
              light
              css={{ padding: '0 $xs', flexBasis: '100px' }}
            >
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
            <Dropdown.Button
              disabled={disabled}
              light
              css={{ padding: '0 $xs', flexBasis: '100px' }}
            >
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
            >
              <Dropdown.Section title="Category">
                <Dropdown.Item
                  key="cat_work"
                  icon={<CatCircle color="secondary" />}
                >
                  Work
                </Dropdown.Item>
                <Dropdown.Item
                  key="cat_study"
                  icon={<CatCircle color="success" />}
                >
                  Study
                </Dropdown.Item>
                <Dropdown.Item
                  key="cat_entertainment"
                  icon={<CatCircle color="warning" />}
                >
                  Entertainment
                </Dropdown.Item>
                <Dropdown.Item
                  key="cat_workout"
                  icon={<CatCircle color="error" />}
                >
                  Workout
                </Dropdown.Item>
              </Dropdown.Section>
              <Dropdown.Section title="Status">
                <Dropdown.Item key="completed">Completed</Dropdown.Item>
                <Dropdown.Item key="uncompleted">Uncompleted</Dropdown.Item>
              </Dropdown.Section>
              <Dropdown.Item withDivider key="reset">
                Reset
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Button.Group>
        <Button
          disabled={disabled}
          auto
          light
          icon={<Task />}
          css={{
            marginLeft: 'auto',
            padding: '0 $sm',
            backgroundColor: isSelect ? '$primary' : '',
            color: isSelect ? '$white' : '',
            '@media (max-width: 352px)': {
              '.nextui-button-text': {
                display: 'none',
              },
              '.nextui-button-icon': {
                margin: 0,
              },
              padding: '0 $xs',
            },
          }}
          onPress={handleSelect}
        >
          Select
        </Button>
      </Grid>

      {/* // Actions menu */}

      <Grid
        css={{
          display: 'flex',
          gap: '$3',
          paddingTop: isSelect ? '$sm' : 0,
          opacity: isSelect ? 1 : 0,
          width: isSelect ? '' : 0,
          height: isSelect ? '' : 0,
          scale: isSelect ? 1 : 0,
          transition: 'transform .2s ease-out',
        }}
      >
        <Dropdown>
          <Dropdown.Button
            disabled={actionsDisabled}
            flat
            css={{
              padding: '0 $sm',
              '@media (max-width: 330px)': {
                '.nextui-button-icon-right': {
                  display: 'none',
                },
              },
            }}
          >
            Mark as
          </Dropdown.Button>
          <Dropdown.Menu
            css={{ minWidth: 'unset' }}
            onAction={handleStatusChange}
          >
            <Dropdown.Item key="completed">Completed</Dropdown.Item>
            <Dropdown.Item key="uncompleted">Uncompleted</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Button
            disabled={actionsDisabled}
            flat
            css={{
              padding: '0 $sm',
              '@media (max-width: 330px)': {
                '.nextui-button-icon-right': {
                  display: 'none',
                },
              },
            }}
          >
            Set category
          </Dropdown.Button>
          <Dropdown.Menu
            css={{ minWidth: 'unset' }}
            onAction={handleCategoryChange}
          >
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
          </Dropdown.Menu>
        </Dropdown>
        <DeleteEventDialog
          open={isDialogOpen}
          setOpen={setDialogOpen}
          handleDelete={handleDelete}
          itemsQuantity={itemsQuantity}
        >
          <Button
            disabled={actionsDisabled}
            flat
            auto
            color="error"
            icon={<Trash />}
            css={{
              marginLeft: 'auto',
              padding: '0 $sm',
              '@media (max-width: 380px)': {
                '.nextui-button-text': {
                  display: 'none',
                },
                '.nextui-button-icon': {
                  margin: 0,
                },
              },
            }}
          >
            Delete
          </Button>
        </DeleteEventDialog>
      </Grid>
    </Grid>
  );
}

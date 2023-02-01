import { Navbar, Text, styled } from '@nextui-org/react';

const NavItem = styled(Navbar.Item, {
  cursor: 'pointer',
  width: '33.33333%',
  height: '100%',
  flexWrap: 'nowrap',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  justifyContent: 'center',
  userSelect: 'none',
});

const NavText = ({children, isActive}) => (
  <Text css={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color .2s ease-in',
    }}
    span
    weight={isActive ? 'semibold' : 'normal'}
    color={isActive ? '$white' : '$text'}
  >
    {children}
  </Text>
)

const ActiveHighlight = styled('div', {
  position: 'absolute',
  borderRadius: '$lg',
  height: '100%',
  width: '33.33333%',
  flexShrink: 0,
  backgroundColor: '$primary',
  transform: 'translateX(0%)',
  transition: 'transform .2s ease-in',
  boxShadow: '0 4px 14px 0 var(--nextui-colors-primaryShadow)',
});



export default function ViewNavigation({ active, handleClick }) {
  return (
    <Navbar
      disableShadow
      disableBlur
      containerCss={{
        justifyContent: 'center',
        width: 'calc(100% - 20px)',
        borderRadius: '$lg',
        backgroundColor: /* 'rgba(241, 243, 245, .8)' */ '$accents0' ,
        minHeight: '0',
        height: '50px',
        maxWidth: '350px',
        '@media screen and (max-width: 320px)': {
          height: '40px',
          fontSize: '14px'
        },
        padding: 0,
      }}
    >
      <ActiveHighlight
        css={{
          transform: `translateX(${
            active === 'all' ? '-100%' : active === 'day' ? '100%' : ''
          })`,
        }}
      />
      <Navbar.Content
        css={{
          width: '100%',
          '.nextui-navbar-cursor-highlight': {
            width: 'var(--nextui--width)',
          },
        }}
        gap="$0"
      >
        <NavItem isActive={active === 'all'} onClick={() => handleClick('all')}>
          <NavText isActive={active === 'all'}>All events</NavText>
        </NavItem>
        <NavItem
          isActive={active === 'month'}
          onClick={() => handleClick('month')}
        >
          <NavText isActive={active === 'month'}>Monthly</NavText>
        </NavItem>
        <NavItem isActive={active === 'day'} onClick={() => handleClick('day')}>
          <NavText isActive={active === 'day'}>Daily</NavText>
        </NavItem>
      </Navbar.Content>
    </Navbar>
  );
}

import { useState } from 'react';
import { Button, Navbar, styled } from '@nextui-org/react';
import NewEvent from '../NewEvent/NewEvent';
import MenuIcon from '../Icons/MenuIcon';
import { Add, Clock, Notification, Profile } from 'iconsax-react';

const NavButton = styled(Button, {
  borderRadius: '50%',
  variants: {
    color: {
      nav: {
        backgroundColor: 'transparent',
        color: '$accents7',
        '&:hover': {
          backgroundColor: '$accents1',
        },
      },
    },
  },
});

const CustomToggle = styled(Navbar.Toggle, {
  color: '$accents7',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '.line': { height: '2px', borderRadius: '2px' },
  '&:hover': {
    backgroundColor: '$accents1',
  },
  '&.nextui-navbar-toggle[aria-pressed="true"]': {
    '.line.bottom': {
      transform: 'translateY(-1px) rotate(-45deg)',
    },
  },
});

export default function BottomToolbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <NewEvent open={open} handleClose={handleClose} />
      <Navbar
        disableScrollHandler
        css={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '70px',
          maxWidth: '500px',
          margin: '0 auto',
          zIndex: '1000',
        }}
      >
        <Navbar.Content
          css={{ width: '100%', justifyContent: 'space-between' }}
          gap={'10px'}
        >
          <CustomToggle>
            <MenuIcon />
          </CustomToggle>
          <Navbar.Item>
            <NavButton color="nav" auto icon={<Clock />}></NavButton>
          </Navbar.Item>
          <Navbar.Item css={{ width: '58px', flexShrink: 0 }}>
            <Button
              aria-expanded={open}
              aria-haspopup="dialog"
              auto
              shadow
              css={{
                position: 'absolute',
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                top: '-58px',
                left: 0,
                right: 0,
                '&:hover': {
                  backgroundColor: '$blue700',
                },
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={handleOpen}
              icon={<Add size="50" />}
            ></Button>
          </Navbar.Item>
          <Navbar.Item>
            <NavButton color="nav" auto icon={<Notification />}></NavButton>
          </Navbar.Item>
          <Navbar.Item>
            <NavButton color="nav" auto icon={<Profile />}></NavButton>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </>
  );
}

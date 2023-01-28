import { Calendar1 } from 'iconsax-react';
import { Grid, Text, styled } from '@nextui-org/react';

const LogoIcon = styled(Calendar1, {});

export default function Logo(props) {
  return (
    <Grid css={{ display: 'flex', alignItems: 'center' }}>
      <LogoIcon
        /* size={45} */ css={{
          transform: 'rotate(-10deg)',
          color: '$primary',
          margin: '$2 $5 $2 $2',
          width: '45px',
          height: '45px',
          '@media (max-width: 300px)': {
            width: '35px',
            height: '35px'
          },
        }}
      />
      <Grid>
        <Text
          span
          weight="black"
          size="$xl"
          css={{
            letterSpacing: '$wider',
            color: '$blue900',
            '@media (max-width: 300px)': {
              fontSize: '$lg',
            },
          }}
        >
          ORGANIZE
        </Text>
        <Text
          span
          small
          em
          css={{
            display: 'block',
            marginLeft: 'auto',
            marginTop: '-5px',
            lineHeight: 1,
            textAlign: 'right',
          }}
        >
          Yourself
        </Text>
      </Grid>
    </Grid>
  );
}

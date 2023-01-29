import { Calendar1 } from 'iconsax-react';
import { Grid, Text, styled } from '@nextui-org/react';

const LogoIcon = styled(Calendar1, {});

export default function Logo(props) {
  return (
    <Grid css={{ display: 'flex', alignItems: 'center' }}>
      <LogoIcon
        css={{
          transform: 'rotate(-10deg)',
          color: '$primary',
          margin: '$2 $5 $2 $2',
          width: '30px',
          height: '30px',
          '@media (max-width: 300px)': {
            width: '25px',
            height: '25px',
          },
        }}
      />
      <Grid>
        <Text
          span
          weight="black"
          size="$md"
          css={{
            letterSpacing: '$wider',
            color: '$blue900',
            '@media (max-width: 300px)': {
              fontSize: '$sm',
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

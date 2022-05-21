// gray.900 = #171923 --> body background
// gray.800 = #1A202C --> griditems
// gray.700 = #2D3748 --> highlight and button
// gray.600 = #4A5568 --> on hover
// gray.300 = #CBD5E0 --> text
// gray.200 = #E2E8F0 --> placeholders, border

export const styles = {
  global: (props) => ({
    body: {
      fontFamily: '"Rajdhani", sans-serif',
      color: 'gray.300',
      bgColor: 'gray.900',
      // bgGradient: 'linear-gradient(180deg, #1A202C 0%, #4A5568 100%)',
      lineHeight: 'base',
      minHeight: '100vh',
    },

    '*::placeholder': {
      color: 'gray.600',
      fontSize: 'sm',
      fontWeight: 'semibold',
    },
    '*, *::before, &::after': {
      borderColor: 'gray.700',
      wordWrap: 'break-word',
    },
    '::-webkit-scrollbar': {
      width: '8px',
    },
    '::-webkit-scrollbar-track': {
      background: 'none',
      borderRadius: '30px',
      pl: '20px',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'gray.700',
      borderRadius: '30px',
    },
  }),
};

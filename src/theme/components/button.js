export const Button = {
  baseStyle: {
    fontWeight: 'semibold',
    _focus: {
      shadow: 'none',
    },
    borderRadius: '0',
  },

  sizes: {
    sm: {
      fontSize: 'sm',
      px: 3,
      py: 1,
    },
    md: {
      fontSize: 'md',
      px: 4,
      py: 3,
    },
  },
  variants: {
    simple: {
      bgColor: 'gray.700',
      _hover: {
        bgColor: 'gray.600',
        color: 'white',
      },
    },
    border: {
      boxShadow: 'md',
      border: '2px solid',
      borderColor: 'gray.700',
      bgColor: 'transparent',
      _hover: {
        bgColor: 'gray.700',
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'gray.300',
      _hover: {
        bgColor: 'transparent',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'simple',
  },
};

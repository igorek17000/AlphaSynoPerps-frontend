export const Button = {
  baseStyle: {
    fontWeight: 'semibold',
    _focus: {
      shadow: 'none',
    },
    borderRadius: '10',
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
      border: '2px solid',
      borderColor: 'transparent',
      _hover: {
        bgColor: 'gray.600',
        color: 'white',
      },
    },
    border: {
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
    red: {
      bgColor: 'red.700',
      border: '2px solid',
      borderColor: 'transparent',
      _hover: {
        bgColor: 'red.600',
        color: 'white',
      },
    },
    green: {
      bgColor: 'green.700',
      border: '2px solid',
      borderColor: 'transparent',
      _hover: {
        bgColor: 'green.600',
        color: 'white',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'simple',
  },
}

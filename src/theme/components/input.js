export const Input = {
  baseStyle: {
    fontWeight: 'semibold',
    _focus: {
      shadow: 'none',
    },
    _active: {
      shadow: 'none',
    },
  },

  sizes: {
    sm: {
      fontSize: 'sm',
      px: 2,
      py: 1,
    },
    md: {
      fontSize: 'md',
      px: 4,
      py: 3,
    },
  },
  variants: {
    outline: {
      field: {
        borderRadius: 'none',
        _focus: {
          boxShadow: 'none',
        },
        _active: {
          boxShadow: 'none',
        },
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
};

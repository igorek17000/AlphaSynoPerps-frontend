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
        borderWidth: '2px',
        borderRadius: 'none',
        fontWeight: 'semibold',
        _focus: {
          boxShadow: 'none',
          border: '2px solid #4A5568',
        },
        _active: {
          boxShadow: 'none',
          border: '2px solid #4A5568',
        },
        _hover: {
          borderColor: 'gray.600',
        },
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
};

export const NumberInput = {
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
        borderWidth: '2px',
        borderRadius: 'none',
        fontWeight: 'semibold',
        _focus: {
          boxShadow: 'none',
          border: '2px solid #4A5568',
        },
        _active: {
          boxShadow: 'none',
          border: '2px solid #4A5568',
        },
        _hover: {
          borderColor: 'gray.600',
        },
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
};

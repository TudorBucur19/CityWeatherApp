export const cityCardStyles = {
  cardItemContainer: {
    cursor: "pointer",
    transition: "transform 180ms, box-shadow 180ms",
    "&:hover": {
      transform: "translateY(-8px)",
    },
  },
};

export const cityFormStyles = {
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "1rem",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};

export const cityListStyles = {
  citiesContainer: {
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
    },
    gap: { xs: "1.2rem", sm: "1.6rem", md: "2rem" },
    padding: "1rem",
  },
};

export const genericModalStyles = {
  modalContainer: {
    position: "relative",
    maxWidth: 600,
    margin: "auto",
  },
  closeButton: {
    position: "absolute",
    top: 42,
    right: 16,
  },
};

export const labelValueBoxStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 0.5,
    minWidth: 220,
  },
};

export const searchBarStyles = {
  searchBtn: {
    cursor: "pointer",
  },
};

export const cityCardStyles = {
  card: { width: 300, borderRadius: 2 },
  cardContent: { cursor: "pointer" },
  headerStack: { mb: 1 },
  name: { fontWeight: 700 },
  subheader: { color: "text.secondary", mb: 2, textAlign: "left" },
  divider: { my: 1.5 },
  ratingText: { color: "text.secondary" },
  actions: { px: 2, pb: 2, pt: 0, justifyContent: "flex-end" },
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
  formActions: {
    right: {
      display: "flex",
      gap: 2,
    },
  },
};

export const cityListStyles = {
  citiesContainer: {
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(1, 1fr)",
      md: "repeat(2, 1fr)",
      lg: "repeat(3, 1fr)",
    },
    gap: { xs: "1.2rem", sm: "1.6rem", md: "2rem" },
    padding: "1rem",
  },
};

export const genericModalStyles = {
  modalHeader: {},
  modalContainer: {
    position: "relative",
    maxWidth: 600,
    margin: "2rem auto",
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
  container: {
    width: "100%",
  },
  searchBtn: {
    cursor: "pointer",
  },
};

export const cityDetailsCardStyles = {
  paper: {
    maxWidth: 900,
    width: "100%",
    m: "0 auto",
    borderRadius: 2,
    overflow: "hidden",
  },
  headerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: 3,
    pt: 2,
  },
  headerStack: { py: 1 },
  headerIcon: { fontSize: 32 },
  headerText: { color: "text.secondary" },
  divider: {},
  contentBox: {
    p: 3,
    bgcolor: "background.default",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  card: { borderRadius: 2 },
  cardHeader: { "& .MuiCardHeader-avatar": { color: "text.secondary" } },
  aboutTitle: { fontWeight: 700 },
  labelValueBox: {
    display: "flex",
    flexWrap: "wrap",
    rowGap: 2,
    columnGap: 6,
  },
  ratingCaption: { color: "text.secondary" },
  ratingText: { color: "text.secondary" },
  weatherConditionsBox: {
    mt: 2,
    p: 2,
    borderRadius: 1,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "#ebf3ff",
  },
  weatherConditionsTitle: { color: "text.secondary", mb: 0.5 },
  footerStack: {
    justifyContent: "space-between",
    pt: 1,
    right: {
      display: "flex",
      gap: 2,
    },
  },
};

export const landingPageStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    padding: "2rem",
  },
};

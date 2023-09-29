import { BookmarkRounded } from "@mui/icons-material/";
import { usePathname } from "next/navigation";

const BookmarkIcon = ({ disabled }) => {
  const pathname = usePathname();
  const bookmarkState = disabled ? "primary.main" : "secondary.light";
  const bookmarkClass = disabled ? "cursor-pointer hover:scale-150" : "";

  return (
    <>
      <BookmarkRounded
        className={bookmarkClass}
        sx={{
          color: pathname == "/bookmarked" ? "#FC4747" : bookmarkState,
          fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem", lg: "2rem" },
        }}
      />
    </>
  );
};

export default BookmarkIcon;

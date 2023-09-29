import { TheatersRounded } from "@mui/icons-material/";
import { usePathname } from "next/navigation";

const MovieIcon = () => {
  const pathname = usePathname();

  return (
    <>
      <TheatersRounded
        className="cursor-pointer hover:scale-150"
        sx={{
          color: pathname === "/movie" ? "#FC4747" : "primary.main",
          fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem", lg: "2rem" },
        }}
      />
    </>
  );
};

export default MovieIcon;

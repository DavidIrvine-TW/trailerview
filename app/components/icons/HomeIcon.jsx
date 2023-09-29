import { HomeRounded } from "@mui/icons-material/";
import { usePathname } from "next/navigation";

const HomeIcon = () => {
  const pathname = usePathname();

  return (
    <>
      <HomeRounded
        className="cursor-pointer hover:scale-150"
        sx={{
          color: pathname == "/" ? "#FC4747" : "primary.main",
          fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem", lg: "2rem" },
        }}
      />
    </>
  );
};

export default HomeIcon;

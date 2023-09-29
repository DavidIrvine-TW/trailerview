import React from "react";
import { Button } from "@mui/base/Button";
import useRipple from "use-ripple-hook";

const SearchBtn = () => {
  const [ripple, event] = useRipple();

  return (
    <Button
      type="submit"
      ref={ripple}
      onMouseDown={event}
      variant="outlined"
      className="bg-primary text-secondary hover:bg-primary active:bg-primary-dark active:text-surface uppercase px-3 py-2 rounded-sm font-bold"
    >
      Search
    </Button>
  );
};

export default SearchBtn;

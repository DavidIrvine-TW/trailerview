import React from "react";
import { Button } from "@mui/base/Button";

const StandardBtn = ({ children, onClick, disabled }) => {
  return (
    <Button
      variant="outlined"
      className={
        disabled
          ? " text-primary uppercase px-2 py-1 rounded-sm font-bold text-body"
          : "bg-green-500 text-secondary hover:bg-primary active:bg-primary-dark active:text-surface uppercase px-2 py-1 rounded-sm font-bold text-body"
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default StandardBtn;

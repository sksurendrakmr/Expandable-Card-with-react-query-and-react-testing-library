import { IconButton, IconButtonProps } from "@mui/material";
import React from "react";

type ExpandMoreProps = IconButtonProps & {
  expand: boolean;
};
export const ExpandMore = ({ expand, ...otherProps }: ExpandMoreProps) => {
  return (
    <>
      <IconButton
        {...otherProps}
        sx={{
          transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
          marginLeft: "auto",
          transition: (theme) =>
            theme.transitions.create("transform", {
              duration: theme.transitions.duration.shortest,
            }),
        }}
      />
    </>
  );
};

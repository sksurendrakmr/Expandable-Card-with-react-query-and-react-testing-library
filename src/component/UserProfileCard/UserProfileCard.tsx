import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ExpandMore } from "./ExpandMore";

export type UserProfileCardProps = {
  name: string;
  username: string;
  phone: string;
  email: string;
  address: string;
  image: string;
  website: string;
};

export const UserProfileCard = ({
  name,
  username,
  phone,
  email,
  address,
  image,
  website,
}: UserProfileCardProps) => {
  const [expand, setExpand] = useState(false);

  const handleExpandOnClick = () => {
    setExpand((prevExpand) => !prevExpand);
  };
  return (
    <>
      <Card sx={{ maxWidth: 345, borderRadius: 5 }} role="article">
        <CardMedia component="img" height="200" image={image} alt={username} />
        <CardContent>
          <Stack>
            <Stack direction="row">
              <Typography sx={{ marginRight: 2 }}>{name}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>@{username}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-evenly">
              <Typography>{website}</Typography>
              <ExpandMore
                expand={expand}
                onClick={handleExpandOnClick}
                aria-expanded={expand}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Stack>
          </Stack>
        </CardContent>
        <Collapse in={expand} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>{phone}</Typography>
            <Typography>{email}</Typography>
            <Typography>{address}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

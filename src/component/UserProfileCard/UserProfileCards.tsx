import { Grid, Typography } from "@mui/material";
import React from "react";
import { usePhoto } from "./hooks/usePhoto";
import { useUser } from "./hooks/useUser";
import { UserProfileCard, UserProfileCardProps } from "./UserProfileCard";

type User = Omit<UserProfileCardProps, "address" | "image"> & {
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  id: number;
  website: string;
};
export const UserProfileCards = () => {
  //parallel queries
  const {
    isLoading: isUserLoading,
    data: users,
    error: userError,
    isError: isUserError,
  } = useUser();

  const {
    isLoading: isPhotoLoading,
    data: photos,
    error: photoError,
    isError: isPhotoError,
  } = usePhoto();

  if (isUserLoading || isPhotoLoading) {
    return (
      <Typography variant="h4" textAlign="center">
        Loading...
      </Typography>
    );
  }

  if (isUserError || isPhotoError) {
    const formattedUserError =
      userError instanceof Error
        ? `${userError.message} while retrieving users`
        : "Error while retrieving users";
    const formattedPhotoError =
      photoError instanceof Error
        ? `${photoError.message} while retrieving photos`
        : "Error while retrieving photos";
    return (
      <Typography variant="h4" textAlign="center">
        {formattedUserError || formattedPhotoError}
      </Typography>
    );
  }

  return (
    <>
      <Grid
        sx={{ my: 2 }}
        container
        direction="row"
        justifyContent="center"
        spacing={3}
      >
        {users &&
          photos &&
          users.data?.map((user: User, index: number) => {
            return (
              <Grid item key={user.id}>
                <UserProfileCard
                  name={user.name}
                  username={user.username}
                  phone={user.phone}
                  email={user.email}
                  address={user.address.street}
                  image={photos.data[index].url}
                  website={user.website}
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

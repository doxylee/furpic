import { User } from "@/_interface/backend/entities/user";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { MouseEventHandler } from "react";

export function UserCard({
  user,
  onClick,
}: {
  user: User;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  console.log(user);
  return (
    <Card onClick={onClick} sx={{ cursor: onClick ? "pointer" : "auto" }}>
      <CardMedia
        image={user.pictureURL ?? undefined}
        title={user.name}
        sx={{ paddingTop: "100%" }}
      />
      <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
        <Typography
          noWrap
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {user.name}
        </Typography>
        {(user.username || user.twitterUsername) && (
          <Typography
            fontSize={12}
            color="gray"
            noWrap
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            @{user.username || user.twitterUsername}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

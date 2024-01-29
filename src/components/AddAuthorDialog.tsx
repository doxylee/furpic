"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { AuthorItem } from "./SelectAuthors";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

type FormFields = {
  name: string;
  twitterUsername: string;
};
export function AddAuthorDialog({
  openModal,
  onFinish,
}: {
  openModal: boolean;
  onFinish: (author?: AuthorItem) => void;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormFields>();

  const onSubmit = async (data: FormFields) => {
    onFinish({
      id: "new",
      name: data.name,
      twitterUsername: data.twitterUsername?.startsWith("@")
        ? data.twitterUsername.slice(1)
        : data.twitterUsername,
      username: null,
      bio: "",
      smImage: null,
      xsImage: null,
      create: true,
    });
  };

  useEffect(() => {
    if (openModal) reset();
  }, [openModal]);

  return (
    <Dialog open={openModal} onClose={() => onFinish()}>
      <DialogTitle>작가 추가하기</DialogTitle>
      <DialogContent>
        <form onSubmit={(e)=>{
          e.preventDefault();
          e.stopPropagation();
          handleSubmit(onSubmit)(e);
        }}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  {...field}
                  label="닉네임"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                {error?.type === "required" && (
                  <Typography color="red">
                    작가의 닉네임을 입력해주세요
                  </Typography>
                )}
              </>
            )}
          />

          <Controller
            name="twitterUsername"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="트위터 유저네임 (선택)"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="@username"
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            추가하기
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onFinish()}>취소</Button>
      </DialogActions>
    </Dialog>
  );
}

// function AddyByTwitter() {
//   const [username, setUsername] = useState<string>("");
//   const [usernameQuery, setUsernameQuery] = useState<string>("");
//   const { data, isLoading } = useQuery({
//     queryKey: ["users", "searchOnTwitter", usernameQuery],
//     enabled: !!usernameQuery,
//     queryFn: () => searchOnTwitter(usernameQuery),
//   });

//   const onSearch = () => {
//     if (!username) return;
//     setUsernameQuery(username);
//   };

//   // Search on pressing

//   return (
//     <Stack spacing={1} sx={{ pt: 1 }}>
//       <SearchBar
//         value={username}
//         onChange={setUsername}
//         onRequestSearch={onSearch}
//         placeholder="@username"
//         loading={isLoading}
//       />
//       {data && <UserCard user={data} />}
//     </Stack>
//   );
// }

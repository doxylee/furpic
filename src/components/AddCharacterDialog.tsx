import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { CharacterItem } from "./selectCharacters";

type FormFields = {
  nameKo?: string;
  nameEn?: string;
  species?: string;
  mine: boolean;
  profileImage?: boolean;
};
export function AddCharacterDialog({
  openModal,
  onFinish,
  canSetImage = false,
}: {
  openModal: boolean;
  onFinish: (character?: CharacterItem) => void;
  canSetImage?: boolean;
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
      userId: null,
      nameKo: data.nameKo || null,
      nameEn: data.nameEn || null,
      species: data.species || null,
      imageURL: null,
      create: true,
      mine: data.mine,
      setImage: data.profileImage || false,
    });
  };

  useEffect(() => {
    if (openModal) reset();
  }, [openModal]);

  return (
    <Dialog open={openModal} onClose={() => onFinish()}>
      <DialogTitle>캐릭터 추가하기</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="nameKo"
            control={control}
            rules={{
              validate: {
                required: (_, formValues) =>
                  !!(formValues.nameEn || formValues.nameKo),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  {...field}
                  label="한글 이름 (최소 하나)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                {error?.type === "required" && (
                  <Typography color="red">
                    캐릭터의 이름을 입력해주세요
                  </Typography>
                )}
              </>
            )}
          />
          <Controller
            name="nameEn"
            control={control}
            rules={{
              validate: {
                required: (_, formValues) =>
                  !!(formValues.nameEn || formValues.nameKo),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  {...field}
                  label="영어 이름 (최소 하나)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                {error?.type === "required" && (
                  <Typography color="red">
                    캐릭터의 이름을 입력해주세요
                  </Typography>
                )}
              </>
            )}
          />

          <Controller
            name="species"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="종족 (선택)"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />

          <FormGroup>
            <Controller
              name="mine"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="내 캐릭터로 추가하기"
                />
              )}
            />
          </FormGroup>

          {canSetImage && (
            <FormGroup>
              <Controller
                name="profileImage"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="대표 이미지로 만들기"
                  />
                )}
              />
            </FormGroup>
          )}

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

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ImageUploadInput } from "./ImageUploadInput";
import { SelectUsers } from "./SelectUsers";
import { FormEvent, useState } from "react";
import { SelectSpecies } from "./SelectSpecies";

export function CharacterEditDialog({
  modalOpen,
  setModalOpen,
  onSubmit,
  dialogTitle,
  control,
  isDirty,
}: {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  dialogTitle: string;
  control: any;
  isDirty: boolean;
}) {
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);

  const onCancel = () => {
    if (isDirty) setCloseDialogOpen(true);
    else setModalOpen(false);
  };

  return (
    <>
      <Dialog open={modalOpen} onClose={() => onCancel()}>
        <form onSubmit={onSubmit}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <ImageUploadInput
              control={control}
              name="image"
              rules={{ required: false }}
            />
            <Controller
              name="nameKo"
              control={control}
              defaultValue=""
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
              defaultValue=""
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
              name="alias"
              control={control}
              defaultValue=""
              rules={{
                maxLength: {
                  value: 50,
                  message: "별칭은 50자 이내로 작성해주세요",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    label="별칭 (이 이름으로도 검색돼요)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  {error && (
                    <Typography color="red">{error.message}</Typography>
                  )}
                </>
              )}
            />

            <Controller
              name="species"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <>
                  <SelectSpecies
                    value={field.value}
                    onChange={field.onChange}
                    label="종족 (선택)"
                    sx={{ mt: 2 }}
                  />
                  <Typography color="gray" fontSize={14} mt={1}>
                    고양이인 경우에는 고양이만, 고양이는 아니지만 고양이과인
                    경우 고양이과를 선택해주세요.
                  </Typography>
                </>
              )}
            />

            <Controller
              name="speciesDetail"
              control={control}
              defaultValue=""
              rules={{
                maxLength: {
                  value: 60,
                  message: "세부 종족은 60자 이내로 입력해주세요",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    label="세부 종족 (허스키 등 종족을 더 자세히 적고 싶은 경우)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  {error && (
                    <Typography color="red">{error.message}</Typography>
                  )}
                </>
              )}
            />

            <Controller
              name="bio"
              control={control}
              defaultValue=""
              rules={{
                maxLength: {
                  value: 160,
                  message: "소개는 160자 이내로 입력해주세요",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    label="소개 (선택)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  {error && (
                    <Typography color="red">{error.message}</Typography>
                  )}
                </>
              )}
            />

            <Typography variant="h6">디자이너</Typography>
            <Controller
              control={control}
              name="designers"
              rules={{ required: "디자이너를 선택해주세요" }}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => (
                <>
                  <SelectUsers
                    value={value}
                    onChange={onChange}
                    target="디자이너"
                  />
                  {error && (
                    <Typography color="red">{error.message}</Typography>
                  )}
                </>
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">저장</Button>
            <Button onClick={() => onCancel()}>취소</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={closeDialogOpen} onClose={() => setCloseDialogOpen(false)}>
        <DialogContent>
          수정 중인 내용이 있어요. 정말 닫으실건가요?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCloseDialogOpen(false);
              setModalOpen(false);
            }}
          >
            닫기
          </Button>
          <Button onClick={() => setCloseDialogOpen(false)}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

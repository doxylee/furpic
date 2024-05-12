"use client";

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
import { SelectUsers, UserItem } from "./SelectUsers";
import { SelectSpecies } from "./SelectSpecies";
import { SelectColor } from "./SelectColor";
import { Color } from "@/_interface/backend/entities/character";

type FormFields = {
  nameKo?: string;
  nameEn?: string;
  species: string[];
  speciesDetail?: string;
  color: Color[];
  bio: string;
  mine: boolean;
  profileImage?: boolean;
  designers: UserItem[];
};
export function AddCharacterDialog({
  openModal,
  onFinish,
  canSetImage = false,
  isMine = false,
  canSetDesigner = false,
}: {
  openModal: boolean;
  onFinish: (character?: CharacterItem) => void;
  canSetImage?: boolean;
  isMine?: boolean;
  canSetDesigner?: boolean;
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
      alias: "",
      species: data.species,
      speciesDetail: data.speciesDetail || null,
      color: data.color,
      bio: data.bio,
      smImage: null,
      xsImage: null,
      crop: null,
      createdAt: "",
      updatedAt: "",
      create: true,
      mine: isMine || data.mine,
      setImage: data.profileImage || false,
      designers: data.designers,
    });
  };

  useEffect(() => {
    if (openModal) reset();
  }, [openModal]);

  return (
    <Dialog
      open={openModal}
      onClose={() => onFinish()}
      sx={{ "& .MuiDialog-paper": { maxWidth: 620 } }}
    >
      <DialogTitle>캐릭터 추가하기</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(onSubmit)(e);
          }}
        >
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
                  고양이인 경우에는 고양이만, 고양이는 아니지만 고양이과인 경우
                  고양이과를 선택해주세요.
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
                {error && <Typography color="red">{error.message}</Typography>}
              </>
            )}
          />

          <Controller
            name="color"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                <SelectColor
                  value={field.value}
                  onChange={field.onChange}
                  label="주요 색상 (선택)"
                  sx={{ mt: 2 }}
                />

                <Typography color="gray" fontSize={14} mt={1}>
                  많은 색이 앞에 오도록 순서대로 골라주세요!
                  <br />
                  너무 많이 고르면 오히려 검색이 어려워요. 주요한 색상만
                  골라주세요!
                </Typography>
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
                {error && <Typography color="red">{error.message}</Typography>}
              </>
            )}
          />

          {!isMine && (
            <FormGroup>
              <Controller
                name="mine"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="내 캐릭터에요"
                  />
                )}
              />
            </FormGroup>
          )}

          {canSetImage && (
            <FormGroup>
              <Controller
                name="profileImage"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="이 작품을 대표 이미지로 할래요"
                  />
                )}
              />
            </FormGroup>
          )}

          {canSetDesigner && (
            <>
              <Typography variant="h6">디자이너</Typography>
              <Controller
                control={control}
                name="designers"
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <SelectUsers
                    value={value}
                    onChange={onChange}
                    target="디자이너"
                  />
                )}
              />
            </>
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

import { z } from "zod";
import { UseFormProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type CommonPlaceDetailFormType = {
  // 해당 파일에서는 사용자가 핸들링 가능한 값만 정의
  scheduleId: number;
  name: string;
  type: string;
  url?: string;
  reviewCount?: number;
  starGrade?: number;
  openingHours?: string | null;
  phoneNumber?: string;
  address?: string;
  memo?: string;
  pictures?: File[];
};

const addPlaceDetailSchema = z.object({
  scheduleId: z.number(),
  name: z.string(),
  type: z.string(),
  url: z.string().optional(),
  reviewCount: z.number().optional(),
  starGrade: z.number().optional(),
  openingHours: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  memo: z.string().optional(),
  pictures: z.array(z.any().optional()),
});

export const useAddPlaceDetailForm = (
  options?: UseFormProps<CommonPlaceDetailFormType>
) => {
  return useForm<CommonPlaceDetailFormType>({
    resolver: zodResolver(addPlaceDetailSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    ...options,
  });
};

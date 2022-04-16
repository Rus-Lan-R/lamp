import { SendMessageService } from "@/api/services/SendMessageService";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useSendMessage = () => {
  const { mutate, isSuccess, isError, isLoading } = useMutation(
    ({
      data,
      onSuccess,
      onError,
    }: {
      data: string | number;
      onSuccess?: () => void;
      onError?: () => void;
    }) => SendMessageService.sendMessage(data),
    {
      onSuccess: (resp, { onSuccess }) => {
        if (onSuccess) onSuccess();
      },
      onError: (resp, { onError }) => {
        if (onError) onError();
      },
    },
  );
  return { mutate, isSuccess, isError, isLoading };
};

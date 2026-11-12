"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContactStatus,
} from "@/clientApi/contactsApi";
import {
  CreateContactRequestDto,
  UpdateContactStatusDto,
} from "@/models/contact";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const CONTACTS_QUERY_KEY = ["contacts"] as const;

export function useContactsQuery() {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: CONTACTS_QUERY_KEY,
    queryFn: () => getContacts(),
    enabled: Boolean(accessToken),
    staleTime: 0,
  });
}

export function useContactByIdQuery(id: number | null) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...CONTACTS_QUERY_KEY, id],
    queryFn: () => (id ? getContactById(id) : null),
    enabled: Boolean(accessToken && id),
  });
}

export function useCreateContactMutation(onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: async (payload: CreateContactRequestDto) => {
      const res = await createContact(payload);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to submit inquiry";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Inquiry sent successfully");
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateContactStatusMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateContactStatusDto;
    }) => {
      const res = await updateContactStatus(id, payload);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to update contact status";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Status updated successfully");
      await queryClient.invalidateQueries({
        queryKey: CONTACTS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: CONTACTS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteContactMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteContact(id);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to delete contact inquiry";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Contact deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: CONTACTS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: CONTACTS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

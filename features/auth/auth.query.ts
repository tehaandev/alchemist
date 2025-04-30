import {
  getUser,
  getUserFromCookieAction,
  loginAction,
  logoutAction,
  registerAction,
} from "./auth.action";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTokenUser = () =>
  useQuery({
    queryKey: ["tokenUser"],
    queryFn: () => getUserFromCookieAction(),
  });

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

export const useRegisterUser = () =>
  useMutation({
    mutationFn: registerAction,
    mutationKey: ["registerUser"],
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

export const useLoginUser = () =>
  useMutation({
    mutationFn: loginAction,
    mutationKey: ["loginUser"],
    onSuccess: () => {
      toast.success("Login successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

export const useLogoutUser = () =>
  useMutation({
    mutationFn: logoutAction,
    mutationKey: ["logoutUser"],
    onSuccess: () => {
      toast.success("Logout successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

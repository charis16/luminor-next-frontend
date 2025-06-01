"use client";

import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
  type ForwardRefRenderFunction,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@heroui/switch";
import { useParams, useRouter } from "next/navigation";

import { FormHandle, UserFormValues, UserSchema } from "../_type";
import { useUserContext } from "../_context";
import { useMutateUser } from "../_hooks/use-mutate-user";
import { useUserByUUID } from "../_hooks/use-user-by-uuid";
import { useDeleteImageUser } from "../_hooks/use-delete-user";

import {
  DropzoneInput,
  InputText,
  InputTextArea,
  SelectOption,
} from "@/app/[locale]/admin/_components";
import { showToast } from "@/utils/show-toast";
import { EnumRole } from "@/types/enums";
import { useAuth } from "@/app/[locale]/admin/_context/auth-context";

const Form: ForwardRefRenderFunction<FormHandle> = () => {
  const params = useParams();
  const uuid = params?.id as string | undefined;
  const { user: authUser } = useAuth();

  const { data: user, refetch } = useUserByUUID(uuid);
  const { mutate: mutateDeleteImageUser } = useDeleteImageUser();
  const {
    formRef: sharedFormRef,
    onSetIsSubmitting,
    onRefetch,
  } = useUserContext();
  const { mutate, isPending } = useMutateUser();
  const router = useRouter();
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      isPublished: true,
      slug: "",
      canLogin: false,
      email: "",
      name: "",
      id: "",
      role: undefined,
      password: "",
      photo: undefined,
      urlInstagram: "",
      urlTikTok: "",
      urlFacebook: "",
      urlYoutube: "",
      description: "",
      phoneNumber: "",
    },
  });

  const { watch } = form;

  const canLogin = watch("canLogin");

  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = async (data: UserFormValues) => {
    const isValid = await form.trigger(); // 👈 ini penting

    if (!isValid) return;

    mutate(
      {
        uuid: user?.uuid,
        data,
      },
      {
        onSuccess: () => {
          form.reset();
          onSetIsSubmitting(false);
          onRefetch();
          router.back();

          showToast({
            type: "success",
            title: `${user ? "Edit" : "Create"} User Success`,
            description: `User ${user ? "edited" : "created"} successfully`,
          });
        },
        onError: (err: any) => {
          onSetIsSubmitting(false);

          showToast({
            type: "danger",
            title: `${user ? "Edit" : "Create"} User failed`,
            description:
              err.message || `Failed to ${user ? "Edit" : "Create"} user`,
          });
        },
      },
    );
  };

  useEffect(() => {
    if (sharedFormRef) {
      if (sharedFormRef && "current" in sharedFormRef) {
        (sharedFormRef as MutableRefObject<FormHandle>).current = {
          submit: () => formRef.current?.requestSubmit(),
        };
      }
    }
  }, [sharedFormRef]);

  useEffect(() => {
    if (!canLogin) {
      form.setValue("password", "");
    }
  }, [canLogin, form]);

  useEffect(() => {
    onSetIsSubmitting(isPending);
  }, [isPending]);

  useEffect(() => {
    if (user) {
      form.reset({
        id: user.uuid,
        slug: user.slug,
        isPublished: user.is_published,
        email: user.email,
        name: user.name,
        role: user.role as EnumRole,
        urlInstagram: user.url_instagram,
        urlTikTok: user.url_tiktok,
        urlFacebook: user.url_facebook,
        urlYoutube: user.url_youtube,
        description: user.description,
        phoneNumber: user.phone_number,
        canLogin: user.can_login,
      });
    }
  }, [user]);

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        control={form.control}
        name="isPublished"
        render={({ field }) => (
          <Switch
            ref={field.ref}
            aria-label="published"
            isSelected={field.value}
            name={field.name}
            size="md"
            onBlur={field.onBlur}
            onChange={field.onChange}
          >
            {field.value ? "Published" : "Draft"}
          </Switch>
        )}
      />

      <Controller
        control={form.control}
        name="slug"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Slug"
            placeholder="Ex: john-doe"
          />
        )}
      />

      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Name"
            placeholder="Ex: John Doe"
          />
        )}
      />

      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Email"
            placeholder="Ex: contact@luminor.com"
            type="email"
          />
        )}
      />

      <Controller
        control={form.control}
        name="role"
        render={({ field, fieldState }) => {
          const roles = Object.values(EnumRole).filter((role) =>
            authUser?.role.toLowerCase() === EnumRole.Admin.toLowerCase()
              ? true
              : role.toLowerCase() !== EnumRole.Admin.toLowerCase(),
          );

          return (
            <SelectOption
              error={fieldState.error}
              field={field}
              label="Role"
              placeholder="Select Role"
              selectItems={roles.map((role) => ({
                value: (role as string).toLowerCase(),
                label:
                  (role as string).charAt(0).toUpperCase() +
                  (role as string).slice(1),
              }))}
              selectedValue={field.value}
            />
          );
        }}
      />

      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <InputTextArea
            defaultValue={field.value}
            error={fieldState.error}
            field={field}
            label="Description"
            placeholder="Ex: Provide a brief description about the user, their role, or responsibilities."
            value={field.value}
            onClear={() => {
              field.onChange("");
            }}
          />
        )}
      />

      <Controller
        control={form.control}
        name="photo"
        render={({ field, fieldState }) => (
          <DropzoneInput
            defaultMedia={[{ id: user?.uuid, url: user?.photo_url || "" }]}
            error={fieldState.error?.message}
            label="Photo"
            maxFiles={1}
            maxSize={2}
            type="image"
            onChange={(files) => {
              const file = files?.[0];

              if (file && file.size > 2 * 1024 * 1024) {
                form.setError("photo", {
                  type: "manual",
                  message: "Maximum file size is 2MB",
                });

                return;
              }

              field.onChange(files);
              form.clearErrors("photo");
            }}
            onDeleteDefault={() => {
              mutateDeleteImageUser(
                {
                  uuid: user?.uuid,
                },
                {
                  onSuccess: () => {
                    showToast({
                      type: "success",
                      title: "Delete Image Success",
                      description: "Image deleted successfully",
                    });
                    refetch();
                  },
                  onError: (err: any) => {
                    showToast({
                      type: "danger",
                      title: "Delete Image Failed",
                      description: err.message || "Failed to delete image",
                    });
                  },
                },
              );
            }}
          />
        )}
      />

      <div className="flex items-center gap-4">
        <Controller
          control={form.control}
          name="canLogin"
          render={({ field }) => (
            <Switch
              ref={field.ref}
              aria-label="can-login"
              isSelected={field.value}
              name={field.name}
              size="md"
              onBlur={field.onBlur}
              onChange={field.onChange}
            >
              {field.value ? "Login" : "Only View"}
            </Switch>
          )}
        />

        <div className="flex-1">
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <InputText
                autoComplete="password"
                disabled={!canLogin}
                error={fieldState.error ?? form.formState.errors.password} // ⬅️ fallback manual
                field={field}
                label="Password"
                placeholder="Ex: ********"
                type="password"
              />
            )}
          />
        </div>
      </div>

      <Controller
        control={form.control}
        name="urlInstagram"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Url Instagram"
            placeholder="www.instagram.com/luminor"
          />
        )}
      />

      <Controller
        control={form.control}
        name="urlTikTok"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Url TikTok"
            placeholder="www.tiktok.com/@luminor"
          />
        )}
      />

      <Controller
        control={form.control}
        name="urlFacebook"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Url Facebook"
            placeholder="www.facebook.com/luminor"
          />
        )}
      />
    </form>
  );
};

export default forwardRef(Form);

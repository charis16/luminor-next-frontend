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

import { EnumRole, FormHandle, UserFormValues, UserSchema } from "../_type";
import { useUserContext } from "../_context";

import {
  DropzoneInput,
  InputText,
  InputTextArea,
  SelectOption,
} from "@/app/[locale]/admin/_components";

const CategoryForm: ForwardRefRenderFunction<FormHandle> = () => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      isPublished: true,
      canLogin: false,
      email: "",
      name: "",
      role: undefined,
      password: "",
      photo: null,
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
  const { formRef: sharedFormRef } = useUserContext(); // ⬅️ Ambil dari context

  const onSubmit = async (data: UserFormValues) => {
    const isValid = await form.trigger(); // 👈 ini penting

    console.log({ isValid });
    if (!isValid) return;
    console.log(data);
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
            checked={field.value}
            defaultSelected={field.value}
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
        render={({ field, fieldState }) => (
          <SelectOption
            error={fieldState.error}
            field={field}
            label="Role"
            placeholder="Select Role"
            selectItems={Object.values(EnumRole).map((role) => ({
              value: role,
              label: role.charAt(0).toUpperCase() + role.slice(1),
            }))}
            selectedValue={field.value}
          />
        )}
      />

      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <InputTextArea
            error={fieldState.error}
            field={field}
            label="Description"
            placeholder="Ex: Provide a brief description about the user, their role, or responsibilities."
            onClear={() => {
              field.onChange("");
            }}
          />
        )}
      />

      <Controller
        control={form.control}
        name="photo"
        render={({ field }) => (
          <DropzoneInput
            label="Photo"
            maxFiles={1}
            type="image"
            onChange={(files) => field.onChange(files)}
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
              checked={field.value}
              defaultSelected={field.value}
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
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">https://</span>
              </div>
            }
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
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">https://</span>
              </div>
            }
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
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">https://</span>
              </div>
            }
          />
        )}
      />
    </form>
  );
};

export default forwardRef(CategoryForm);

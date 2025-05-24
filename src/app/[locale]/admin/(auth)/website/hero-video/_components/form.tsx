"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MutableRefObject, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  FormHandle,
  HeroVideoSchema,
  HeroVideoSchemaFormValue,
} from "../_type";
import { useHeroVideoContext } from "../_context";
import {
  useDeleteVideo,
  useMutateHeroVideo,
} from "../_hooks/use-mutate-hero-video";

import { DropzoneInput } from "@/app/[locale]/admin/_components";
import { showToast } from "@/utils/show-toast";

export default function Form() {
  const router = useRouter();
  const form = useForm<HeroVideoSchemaFormValue>({
    resolver: zodResolver(HeroVideoSchema),
    defaultValues: {
      videoMobile: "",
      videoWeb: "",
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    formRef: sharedFormRef,
    data: heroVideo,
    onRefetch,
    onSetIsSubmitting,
  } = useHeroVideoContext(); // ⬅️ Ambil dari context

  const { mutate, isPending } = useMutateHeroVideo();
  const { mutate: mutateDeleteVideo } = useDeleteVideo();
  const onSubmit = (data: HeroVideoSchemaFormValue) => {
    const hasVideoWeb = data.videoWeb && data.videoWeb.length > 0;
    const hasVideoMobile = data.videoMobile && data.videoMobile.length > 0;

    if (!hasVideoWeb && !hasVideoMobile) {
      showToast({
        type: "warning",
        title: "Hero Video Submit",
        description: "Please upload at least one video",
      });

      return;
    }

    mutate(
      {
        uuid: heroVideo?.uuid,
        data,
      },
      {
        onSuccess: () => {
          form.reset();
          onSetIsSubmitting(false);
          showToast({
            type: "success",
            title: `${heroVideo ? "Edit" : "Create"} Hero Video Success`,
            description: `Hero Video ${heroVideo ? "edited" : "created"} successfully`,
          });

          router.refresh();
        },
        onError: (error) => {
          showToast({
            type: "danger",
            title: "Error",
            description: error.message || "Failed to save hero video",
          });

          onSetIsSubmitting(false);
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
    onSetIsSubmitting(isPending);
  }, [isPending]);

  return (
    <form
      ref={formRef}
      className="grid grid-cols-1 gap-4 "
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        control={form.control}
        name="videoWeb"
        render={({ field }) => (
          <DropzoneInput
            defaultMedia={[
              { id: heroVideo?.uuid, url: heroVideo?.video_web || "" },
            ]}
            label="Video (Web Version)"
            maxFiles={1}
            type="video"
            onChange={(files) => {
              field.onChange(files);
              form.clearErrors("videoWeb");
            }}
            onDeleteDefault={() => {
              mutateDeleteVideo(
                {
                  uuid: heroVideo?.uuid,
                  status: "video_web",
                },
                {
                  onSuccess: () => {
                    showToast({
                      type: "success",
                      title: "Delete Video Web Success",
                      description: "Video web deleted successfully",
                    });

                    onRefetch();
                  },
                  onError: (error) => {
                    showToast({
                      type: "danger",
                      title: "Error",
                      description:
                        error.message || "Failed to delete video web",
                    });
                  },
                },
              );
            }}
          />
        )}
      />

      <Controller
        control={form.control}
        name="videoMobile"
        render={({ field }) => (
          <DropzoneInput
            defaultMedia={[
              { id: heroVideo?.uuid, url: heroVideo?.video_mobile || "" },
            ]}
            label="Video (Mobile Version)"
            maxFiles={1}
            type="video"
            onChange={(files) => {
              field.onChange(files);
              form.clearErrors("videoMobile");
            }}
            onDeleteDefault={() => {
              mutateDeleteVideo(
                {
                  uuid: heroVideo?.uuid,
                  status: "video_mobile",
                },
                {
                  onSuccess: () => {
                    showToast({
                      type: "success",
                      title: "Delete Video Mobile Success",
                      description: "Video mobile deleted successfully",
                    });

                    onRefetch();
                  },
                  onError: (error) => {
                    showToast({
                      type: "danger",
                      title: "Error",
                      description:
                        error.message || "Failed to delete video mobile",
                    });
                  },
                },
              );
            }}
          />
        )}
      />
    </form>
  );
}

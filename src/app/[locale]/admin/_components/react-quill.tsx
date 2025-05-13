"use client";

import { Spinner } from "@heroui/spinner";
import dynamic from "next/dynamic";
import { forwardRef, useImperativeHandle, useRef } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: true,
  loading: () => <Spinner color="white" variant="simple" />,
});

const MyReactQuill = forwardRef((props: any, ref) => {
  const internalRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getEditor: () => internalRef.current?.getEditor(),
  }));

  return <ReactQuill ref={internalRef} {...props} />;
});

MyReactQuill.displayName = "MyReactQuill";

export default MyReactQuill;

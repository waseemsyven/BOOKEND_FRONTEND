"use client";

import { NextUIProvider } from "@nextui-org/system";

type Props = {
  children?: React.ReactNode;
};

export const NextUiProvider = ({ children }: Props) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

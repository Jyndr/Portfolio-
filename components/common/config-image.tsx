"use client";

import Image from "next/image";
import { useState } from "react";
import { NeutralPlaceholder } from "@/components/ui/primitives";

type ConfigImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  placeholderLabel: string;
};

export function ConfigImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  className,
  placeholderLabel,
}: ConfigImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return <NeutralPlaceholder label={placeholderLabel} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setError(true)}
    />
  );
}

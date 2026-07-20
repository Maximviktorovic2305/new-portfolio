import { useState, type ImgHTMLAttributes } from "react";

type ImageWithFallbackProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackLabel?: string;
};

export function ImageWithFallback({
  alt,
  className,
  fallbackLabel = "Изображение недоступно",
  loading = "lazy",
  onError,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [failedSource, setFailedSource] = useState<string>();
  const source = typeof src === "string" ? src : undefined;
  const didFail = source === failedSource;

  if (!source || didFail) {
    return (
      <div
        aria-label={alt ?? fallbackLabel}
        className={`flex items-center justify-center bg-muted text-text-secondary ${className ?? ""}`}
        role="img"
      >
        <span aria-hidden="true" className="text-[2rem]">
          🖼️
        </span>
        <span className="sr-only">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      {...props}
      alt={alt ?? ""}
      className={className}
      decoding="async"
      loading={loading}
      onError={(event) => {
        setFailedSource(source);
        onError?.(event);
      }}
      referrerPolicy="no-referrer"
      src={source}
    />
  );
}

import { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({ src, alt, fallbackSrc, className, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  const getFormattedSrc = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const apiBase = (import.meta.env.VITE_API_URL || "https://ishan-backend-g096.onrender.com/api").replace(/\/api\/?$/, '');
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `${apiBase}${cleanPath}`;
  };

  const finalSrc = getFormattedSrc(src);

  if (!finalSrc || error) {
    const formattedFallback = getFormattedSrc(fallbackSrc);
    if (formattedFallback) {
      return <img src={formattedFallback} alt={alt || "Fallback Image"} className={className} {...props} />;
    }
    return (
      <div className={`flex flex-col items-center justify-center bg-muted text-muted-foreground ${className}`} {...(props as any)}>
        <ImageOff className="w-1/4 h-1/4 max-w-[48px] max-h-[48px] opacity-20" />
      </div>
    );
  }

  return (
    <img
      src={finalSrc}
      alt={alt || "Image"}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}

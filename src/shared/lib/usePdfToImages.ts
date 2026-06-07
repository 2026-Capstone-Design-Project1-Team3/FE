import { useEffect, useState } from "react";

import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url,
).toString();

export const usePdfToImages = (pdfUrl: string | null) => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pdfUrl) return;

    let cancelled = false;

    const convert = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const pdf = await pdfjsLib.getDocument({ url: pdfUrl }).promise;
        const pageImages: string[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, viewport, canvas }).promise;
          pageImages.push(canvas.toDataURL("image/jpeg", 0.85));
        }

        if (!cancelled) setImages(pageImages);
      } catch {
        if (!cancelled) setError("PDF를 불러오지 못했습니다.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void convert();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  return { images, isLoading, error };
};

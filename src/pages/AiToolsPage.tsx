import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Eraser, Sparkles, Download, Upload, Clapperboard, Image as ImageIcon } from "lucide-react";

type Box = { x: number; y: number; width: number; height: number };

const defaultBox: Box = { x: 70, y: 70, width: 20, height: 12 };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function copyPatchFromNearArea(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, box: Box) {
  const x = Math.round((box.x / 100) * canvas.width);
  const y = Math.round((box.y / 100) * canvas.height);
  const width = Math.max(1, Math.round((box.width / 100) * canvas.width));
  const height = Math.max(1, Math.round((box.height / 100) * canvas.height));

  const sourceX = clamp(x - Math.round(width * 0.1), 0, Math.max(canvas.width - width, 0));
  const sourceY = y > height + 6 ? y - height - 6 : clamp(y + height + 6, 0, Math.max(canvas.height - height, 0));

  ctx.save();
  ctx.filter = "blur(8px)";
  ctx.drawImage(canvas, sourceX, sourceY, width, height, x, y, width, height);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.setLineDash([6, 4]);
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.restore();
}

function Slider({ label, value, onChange, min = 0, max = 100 }: { label: string; value: number; onChange: (value: number) => void; min?: number; max?: number }) {
  return (
    <label className="space-y-1">
      <div className="text-xs text-muted-foreground font-semibold">{label}: %{Math.round(value)}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
      />
    </label>
  );
}

export default function AiToolsPage() {
  const [activeTool, setActiveTool] = useState<"photo" | "video">("photo");
  const [box, setBox] = useState<Box>(defaultBox);

  const [imageFileName, setImageFileName] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [videoFileName, setVideoFileName] = useState<string>("");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const videoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [imageSrc, videoSrc, downloadUrl]);

  const toolDescription = useMemo(
    () =>
      activeTool === "photo"
        ? "Fotoğrafta watermark olan alanı seçip AI destekli doldurma ile kaldırın."
        : "Videoda watermark bölgesini işaretleyip oynatma sırasında otomatik temizleyin.",
    [activeTool],
  );

  const updateBox = (key: keyof Box, value: number) => {
    setBox((current) => ({ ...current, [key]: value }));
  };

  const drawImageResult = () => {
    const image = imageElementRef.current;
    const canvas = imageCanvasRef.current;
    if (!image || !canvas) {
      return;
    }

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    copyPatchFromNearArea(ctx, canvas, box);
  };

  useEffect(() => {
    if (imageReady) {
      drawImageResult();
    }
  }, [box, imageReady]);

  const renderVideoFrame = () => {
    const video = videoElementRef.current;
    const canvas = videoCanvasRef.current;
    if (!video || !canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    if (video.videoWidth && video.videoHeight) {
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      copyPatchFromNearArea(ctx, canvas, box);
    }

    if (!video.paused && !video.ended) {
      animationRef.current = requestAnimationFrame(renderVideoFrame);
    }
  };

  useEffect(() => {
    if (videoReady) {
      renderVideoFrame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box, videoReady]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }

    const src = URL.createObjectURL(file);
    setImageFileName(file.name);
    setImageSrc(src);
    setImageReady(false);
  };

  const handleVideoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (videoSrc) {
      URL.revokeObjectURL(videoSrc);
    }
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }

    const src = URL.createObjectURL(file);
    setVideoFileName(file.name);
    setVideoSrc(src);
    setVideoReady(false);
  };

  const downloadImage = () => {
    const canvas = imageCanvasRef.current;
    if (!canvas) {
      return;
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `watermark-removed-${imageFileName || "foto"}.png`;
    link.click();
  };

  const exportVideo = async () => {
    const canvas = videoCanvasRef.current;
    const video = videoElementRef.current;
    if (!canvas || !video || isRecording) {
      return;
    }

    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks: Blob[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const nextUrl = URL.createObjectURL(blob);
      setDownloadUrl((current) => {
        if (current) {
          URL.revokeObjectURL(current);
        }
        return nextUrl;
      });
      setIsRecording(false);
      video.pause();
    };

    video.currentTime = 0;
    await video.play();
    recorder.start();
    setIsRecording(true);

    const stopWhenDone = () => {
      if (video.ended) {
        recorder.stop();
        video.removeEventListener("timeupdate", stopWhenDone);
      }
    };

    video.addEventListener("timeupdate", stopWhenDone);
  };

  return (
    <div className="pb-20">
      <div className="px-4 py-6 max-w-3xl mx-auto space-y-5">
        <header className="rounded-3xl bg-card border p-5 shadow-card space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            AI TOOLS
          </div>
          <h1 className="text-2xl font-black">Watermark Remover</h1>
          <p className="text-sm text-muted-foreground">Fotoğraf ve video editörleri için AI destekli watermark kaldırma aracı.</p>
        </header>

        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-muted">
          <button
            onClick={() => setActiveTool("photo")}
            className={`rounded-xl px-3 py-2 text-sm font-bold inline-flex justify-center items-center gap-2 ${
              activeTool === "photo" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Fotoğraf Editörü
          </button>
          <button
            onClick={() => setActiveTool("video")}
            className={`rounded-xl px-3 py-2 text-sm font-bold inline-flex justify-center items-center gap-2 ${
              activeTool === "video" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
          >
            <Clapperboard className="w-4 h-4" /> Video Editörü
          </button>
        </div>

        <p className="text-sm text-muted-foreground">{toolDescription}</p>

        <section className="grid lg:grid-cols-[1fr_320px] gap-4">
          <div className="rounded-2xl border bg-card p-3 min-h-[280px]">
            {activeTool === "photo" ? (
              <>
                {!imageSrc ? (
                  <label className="h-full min-h-[280px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer text-muted-foreground">
                    <Upload className="w-8 h-8" />
                    <span className="font-semibold">Fotoğraf yükle (JPG/PNG)</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground font-semibold">Dosya: {imageFileName}</div>
                    <img
                      ref={imageElementRef}
                      src={imageSrc}
                      alt="Yüklenen"
                      onLoad={() => setImageReady(true)}
                      className="hidden"
                    />
                    <canvas ref={imageCanvasRef} className="w-full rounded-lg border bg-black/5" />
                  </div>
                )}
              </>
            ) : (
              <>
                {!videoSrc ? (
                  <label className="h-full min-h-[280px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer text-muted-foreground">
                    <Upload className="w-8 h-8" />
                    <span className="font-semibold">Video yükle (MP4/WebM)</span>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground font-semibold">Dosya: {videoFileName}</div>
                    <video
                      ref={videoElementRef}
                      src={videoSrc}
                      className="hidden"
                      onLoadedMetadata={() => setVideoReady(true)}
                      onPlay={renderVideoFrame}
                      controls
                    />
                    <canvas ref={videoCanvasRef} className="w-full rounded-lg border bg-black" />
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => videoElementRef.current?.play()}
                        className="rounded-xl px-3 py-2 text-xs font-bold bg-primary text-primary-foreground"
                      >
                        Önizlemeyi Oynat
                      </button>
                      <button
                        type="button"
                        onClick={exportVideo}
                        disabled={!videoReady || isRecording}
                        className="rounded-xl px-3 py-2 text-xs font-bold bg-green-600 text-white disabled:opacity-40"
                      >
                        {isRecording ? "Dışa aktarılıyor..." : "Temizlenmiş videoyu dışa aktar"}
                      </button>
                      {downloadUrl && (
                        <a
                          href={downloadUrl}
                          download={`watermark-removed-${videoFileName || "video"}.webm`}
                          className="rounded-xl px-3 py-2 text-xs font-bold bg-blue-600 text-white inline-flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" /> Videoyu indir
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <aside className="rounded-2xl border bg-card p-4 space-y-3 h-fit">
            <h2 className="font-black text-sm inline-flex items-center gap-2"><Eraser className="w-4 h-4" /> Watermark alanı</h2>
            <Slider label="X Konumu" value={box.x} onChange={(value) => updateBox("x", value)} />
            <Slider label="Y Konumu" value={box.y} onChange={(value) => updateBox("y", value)} />
            <Slider label="Genişlik" value={box.width} onChange={(value) => updateBox("width", value)} min={5} max={50} />
            <Slider label="Yükseklik" value={box.height} onChange={(value) => updateBox("height", value)} min={5} max={50} />
            <p className="text-xs text-muted-foreground">
              İpucu: Watermark alanını ince bir dikdörtgenle işaretleyin. Araç, yakın pikselleri örnekleyerek bölgeyi doldurur.
            </p>
            {activeTool === "photo" && imageSrc && (
              <button
                type="button"
                onClick={downloadImage}
                className="w-full rounded-xl px-3 py-2 text-sm font-bold bg-primary text-primary-foreground inline-flex justify-center items-center gap-1"
              >
                <Download className="w-4 h-4" /> Temizlenmiş görseli indir
              </button>
            )}
          </aside>
        </section>
      </div>
    </div>
  );
}

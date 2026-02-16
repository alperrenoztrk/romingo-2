const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <div className="pointer-events-none absolute -top-20 right-[-80px] h-64 w-64 rounded-full bg-flamingo/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-[-70px] h-56 w-56 rounded-full bg-sky-brand/20 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="splash-float flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-6xl shadow-elevated">
          <span aria-label="flamingo" role="img">
            🦩
          </span>
        </div>

        <div className="text-center">
          <p className="text-4xl font-black tracking-tight text-flamingo">Romingo</p>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">Flamingo ile öğren</p>
        </div>

        <div className="splash-loader h-1.5 w-40 overflow-hidden rounded-full bg-muted" aria-hidden="true">
          <div className="h-full rounded-full bg-flamingo" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

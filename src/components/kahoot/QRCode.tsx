/**
 * Simple QR Code placeholder component.
 * Uses a QR code API to generate the image.
 */
type Props = { value: string; size?: number };

export default function QRCode({ value, size = 160 }: Props) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;
  return (
    <div className="flex justify-center my-3">
      <img
        src={url}
        alt="QR Code"
        width={size}
        height={size}
        className="rounded-xl"
        loading="lazy"
      />
    </div>
  );
}

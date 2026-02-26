import mascotFlamingo from "@/assets/mascot-flamingo.png";
import mascotCat from "@/assets/mascot-cat.png";
import mascotToucan from "@/assets/mascot-toucan.png";
import mascotPanda from "@/assets/mascot-panda.png";

const mascotImages: Record<string, string> = {
  flamingo: mascotFlamingo,
  cat: mascotCat,
  toucan: mascotToucan,
  panda: mascotPanda,
};

interface MascotFaceProps {
  mascotId: "flamingo" | "cat" | "toucan" | "panda";
  mascotName: string;
  className?: string;
}

export default function MascotFace({ mascotId, mascotName, className = "h-20 w-20" }: MascotFaceProps) {
  return (
    <img
      src={mascotImages[mascotId]}
      alt={mascotName}
      className={`${className} object-contain drop-shadow-2xl`}
      draggable={false}
    />
  );
}

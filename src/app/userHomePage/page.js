import Image from "next/image";
import Header from "../_features/Header";

export default function UserHomePage() {
  return (
    <div>
      <Header />
      <div className="relative w-full aspect-[1440/570]">
        <Image
          src="/UserMainPoster.png"
          alt="UserMainPoster"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

import defaultImg from "@/assets/category/adventure.webp";
import Image from "next/image";
function DisplayImageField({ label, info, src }) {
  return (
    <div>
      <p className="text-lg text-[#222222]">{label}</p>
      <p className="text-sm text-[#555555]">{info}</p>
      <Image
        priority={1}
        width={500}
        height={500}
        className="object-cover w-full max-w-96 mt-2 border border-gray-900"
        alt="category img"
        src={src ? src : defaultImg}
      />
    </div>
  );
}

export default DisplayImageField;

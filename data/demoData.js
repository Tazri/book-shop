import img1 from "@/assets/comics/a_silent_voice_by_yoshitoki_oima.webp";
import img2 from "@/assets/comics/anohana_by_alifa_doreo.webp";
import img3 from "@/assets/comics/attack_on_titan_vol_3_by_hajime_isayama.webp";
import img4 from "@/assets/comics/attack_on_titan_vol_9_by_hajime_isayama.jpg.webp";
import img5 from "@/assets/comics/barakamon_by_satsuki_yoshino.webp";
import img6 from "@/assets/comics/death_note_by_tsugumi_ohba.webp";
import img7 from "@/assets/comics/erased_by_key_sanbe.webp";
import img8 from "@/assets/comics/fullmetal_alchemist_brotherhood_hiromu_arakawa.jpg.webp";
import img9 from "@/assets/comics/fullmetal_alchemist_by_kindle_and_comixology.webp";

export const getDemoBook = () => {
  return [
    {
      name: "A Silent Voice",
      author: "Yoshitoki Oima",
      img: img1,
      price: 120,
      discountPercent: 10,
      rating: 3,
      id: 1,
    },
    {
      name: "Anohana",
      author: "Alifa Doreo",
      img: img2,
      price: 250,
      discountPercent: 14,
      rating: 2,
      id: 2,
    },
    {
      name: "Attack On titan Vol 3",
      author: "Hajime Isayama",
      img: img3,
      price: 145,
      discountPercent: 20,
      rating: 4.4,
      id: 3,
    },
    {
      name: "Attack On Titan Vol 9",
      author: "Hajime Isayama",
      img: img4,
      price: 420,
      discountPercent: 14,
      rating: 5,
      id: 4,
    },
    {
      name: "Barakamon",
      author: "Satuski Yoshino",
      img: img5,
      price: 354,
      discountPercent: 22,
      rating: 3.3,
      id: 5,
    },
    {
      name: "Death Note",
      author: "Tsugumi Ohba",
      img: img6,
      price: 852,
      discountPercent: 20,
      rating: 2,
      id: 6,
    },
    {
      name: "Ereased",
      author: "Key Sanbe",
      img: img7,
      price: 320,
      discountPercent: 8,
      rating: 1.8,
      id: 7,
    },
    {
      name: "Full Metal Alchemist Brotherhood",
      author: "Hiromu Arakawa",
      img: img8,
      price: 320,
      discountPercent: 14,
      rating: 4,
      id: 8,
    },
    {
      name: "Fullmetal Alchemist",
      author: "Kindle & Comixology",
      img: img9,
      price: 320,
      discountPercent: 10,
      rating: 3,
      id: 9,
    },
  ];
};

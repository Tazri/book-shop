import img1 from "@/assets/category/history.webp";
import img2 from "@/assets/category/math.webp";
import img3 from "@/assets/category/science.webp";
import img4 from "@/assets/category/story.webp";
import img5 from "./../assets/category/achademic.webp";
import img6 from "./../assets/category/adventure.webp";
import img7 from "./../assets/category/fantasy.webp";
import img8 from "./../assets/category/motivation.webp";
import img9 from "./../assets/category/programming.webp";
import img10 from "./../assets/category/thriller.webp";

export const getDemoCategory = () => {
  return [
    {
      id: 1,
      name: "History",
      img: img1.src,
      totalBooks: 12,
    },
    {
      id: 2,
      name: "Math",
      img: img2.src,
      totalBooks: 1,
    },
    {
      id: 3,
      name: "Science",
      img: img3.src,
      totalBooks: 45,
    },
    {
      id: 4,
      name: "Story",
      img: img4.src,
      totalBooks: 20,
    },
    {
      id: 5,
      name: "Achademic",
      img: img5.src,
      totalBooks: 21,
    },
    {
      id: 6,
      name: "Adventure",
      img: img6.src,
      totalBooks: 34,
    },
    {
      id: 7,
      name: "Fantasy",
      img: img7.src,
      totalBooks: 74,
    },
    {
      id: 8,
      name: "Motivation",
      img: img8.src,
      totalBooks: 15,
    },
    {
      id: 9,
      name: "Programming",
      img: img9.src,
      totalBooks: 23,
    },
    {
      id: 10,
      name: "Thriller",
      img: img10.src,
      totalBooks: 22,
    },
  ];
};

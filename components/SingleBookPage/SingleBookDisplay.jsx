import Image from "next/image";
import defaultImage from "./../../assets/comics/death_note_by_tsugumi_ohba.webp";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import SingleBookDetails from "./SingleBookDetails";
import style from "./styles/SingleBookDisplay.module.css";
import RatingAndReview from "./RatingAndReview";
import BookReview from "./BookReview";

function SingleBookDisplay({ searchParams }) {
  return (
    <div className={style.SingleBookDisplay}>
      {/** book */}
      <div className={style.book}>
        {/** book image */}
        <div>
          <Image
            src={defaultImage}
            alt="book-image"
            width={300}
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/** book details */}
        <div className={style.bookDetails}>
          <h2>Death Note</h2>

          {/** short details */}
          <div className={style.bookShortDetails}>
            <p>
              Author : <span>Ans Anonymo</span>
            </p>

            <p>
              Publisher : <span>Dimik</span>
            </p>

            <div>
              <p>Category :</p>
              <div className="flex flex-wrap gap-0.5">
                <span>History</span>,<span>Story</span>,<span>Mystery</span>
              </div>
            </div>
          </div>

          {/** description */}
          <Description id="book-description" />

          {/** price */}
          <p className={style.price}>
            301$ <span>410$</span> (30%)
          </p>

          {/** order */}
          <div className="flex flex-wrap gap-3 ">
            <button className="py-1.5 px-3 bg-primary text-white text-xs s240:text-sm s410:text-base duration-150 hover:opacity-95">
              Add to Cart
            </button>

            <button className="text-primary flex items-center justify-center text-xl s500:text-2xl duration-150">
              <input type="checkbox" className="peer hidden" id="wish-id" />
              <label
                htmlFor="wish-id"
                className="block peer-checked:hidden cursor-pointer"
              >
                <FaRegHeart />
              </label>
              <label
                className="peer-checked:block hidden cursor-pointer"
                htmlFor="wish-id"
              >
                <FaHeart />
              </label>
            </button>
          </div>
        </div>
      </div>

      <SingleBookDetails />

      <RatingAndReview />

      <div className="h-[0.05rem] bg-[#4444] w-[95%] mx-auto my-3"></div>

      <BookReview searchParams={searchParams} />
    </div>
  );
}

function Description({ id }) {
  return (
    <div className={style.description}>
      <input type="checkbox" id={id} />
      <p>
        The best detective in the world, an eccentric genius named {'"'}L{'"'},
        works with the Japanese police, as well as Light{"'"}s own father, to
        find out Kira{"'"}s identity and catch him. He suspects all along that
        it
        {"'"}s Light, who, as a part of the police department, works alongside L
        in the investigation. It becomes a contest of wit and intelligence
        between L and Light, both of whom are very clever. At one point, Light
        temporarily gives up the Death Note, along his memories of it, as an
        ally continue writing the names of criminals. This {'"'}proves{'"'} to
        the police that he is not Kira. However, he later gets the Death Note
        back and kills L with it. After L dies, his successors, two orphans
        named
        {'"'}Mello{'"'} and {'"'}Near{'"'}, take over the Kira investigation.
        Near is a child prodigy who clearly mirrors L, and Mello is an
        impulsive, antisocial teen obsessed with one-upping Near. Mello refuses
        to work with Near and leaves the orphanage, joining the American Mafia;
        Near forms a task force to catch Kira. In the end, Near proves that
        Light is Kira, leading to Light{"'"}s death.
      </p>
      <label className={style.showMore} htmlFor={id}>
        See More
      </label>
      <label className={style.showLess} htmlFor={id}>
        Show Less
      </label>
    </div>
  );
}

export default SingleBookDisplay;

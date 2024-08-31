import Image from "next/image";
import defaultImage from "./../../assets/comics/death_note_by_tsugumi_ohba.webp";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import SingleBookDetails from "./SingleBookDetails";

function SingleBookDisplay() {
  return (
    <div className="border flex-grow">
      {/** book */}
      <div className="flex gap-3 flex-col md:flex-row">
        {/** book image */}
        <div className="w-full duration-200 max-w-36 s200:max-w-40 s220:max-w-44 s320:max-w-48 s500:max-w-52 md:max-w-56">
          <Image
            src={defaultImage}
            alt="book-image"
            width={300}
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/** book details */}
        <div className="w-full md:pr-1 flex flex-col gap-3">
          <h2 className="text-base s320:text-lg s450:text-xl text-[#222222] duration-150">
            Death Note
          </h2>

          {/** short details */}
          <div className="text-[#555555] text-xs s240:text-sm s410:text-base duration-150">
            <p>
              Author :{" "}
              <span className="text-primary hover:underline cursor-pointer">
                Ans Anonymo
              </span>
            </p>

            <p>
              Publisher :{" "}
              <span className="text-primary hover:underline cursor-pointer">
                Dimik
              </span>
            </p>

            <div>
              <p>Category :</p>
              <div className="flex flex-wrap gap-0.5">
                <span className="text-primary hover:underline cursor-pointer">
                  History
                </span>
                ,
                <span className="text-primary hover:underline cursor-pointer">
                  Story
                </span>
                ,
                <span className="text-primary hover:underline cursor-pointer">
                  Mystery
                </span>
              </div>
            </div>
          </div>

          {/** description */}
          <Description id="book-description" />

          {/** price */}
          <p className="text-xs s240:text-sm s410:text-base s450:text-lg duration-150 text-primary">
            301$ <span className="text-[#555555] line-through">410$</span> (30%)
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
    </div>
  );
}

function Description({ id }) {
  return (
    <div className="text-[0.6rem] s200:text-xs s240:text-sm s410:text-base">
      <input type="checkbox" className="peer hidden" id={id} />
      <p className="line-clamp-4 peer-checked:line-clamp-none text-[#555555] ">
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
      <label
        className="cursor-pointer peer-checked:hidden text-primary hover:underline underline-offset-2"
        htmlFor={id}
      >
        See More
      </label>
      <label
        className="cursor-pointer hidden peer-checked:block text-primary hover:underline underline-offset-2"
        htmlFor={id}
      >
        Show Less
      </label>
    </div>
  );
}

export default SingleBookDisplay;

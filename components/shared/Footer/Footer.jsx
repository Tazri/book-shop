import FooterLogoDescription from "./FooterLogoDescription";
import FooterUlList from "./FooterUlList";

const necessaryLinks = {
  title: "Necessary Links",
  links: [
    {
      link: "#about",
      name: "Home",
    },
    {
      link: "#about",
      name: "About",
    },
    {
      link: "#category",
      name: "Cetegory",
    },
    {
      link: "#contact",
      name: "Authors",
    },
  ],
};

const categoryLinks = {
  title: "Best Category",
  links: [
    {
      link: "#science",
      name: "Science",
    },
    {
      link: "#math",
      name: "Math",
    },
    {
      link: "#anime",
      name: "Anime",
    },
    {
      link: "#history",
      name: "History",
    },
  ],
};

const authorsLinks = {
  title: "Best Authors",
  links: [
    {
      link: "#Alfons",
      name: "Alfons",
    },
    {
      link: "#armin-arlelt",
      name: "Armin Arlelt",
    },
    {
      link: "#king-bradley",
      name: "King Bradley",
    },
    {
      link: "#edward-elric",
      name: "Edward Elric",
    },
  ],
};

const publisherLinks = {
  title: "Best Publisher",
  links: [
    {
      link: "#dimik",
      name: "Dimik Prokashoni",
    },
    {
      link: "#prothoma",
      name: "Prothoma Prokashoni",
    },
    {
      link: "#prio-mokh",
      name: "Pryo Mokh",
    },
    {
      link: "#adommo-prokash",
      name: "adommo-prokash",
    },
  ],
};

function Footer() {
  return (
    <footer className="bg-footer-bg">
      <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8 duration-200">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <FooterLogoDescription />
          <div className="grid grid-cols-1 gap-6 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4 duration-200">
            <FooterUlList links={necessaryLinks} />
            <FooterUlList links={categoryLinks} />
            <FooterUlList links={authorsLinks} />
            <FooterUlList links={publisherLinks} />
          </div>
        </div>
        <p className="mt-8 text-xs text-footer-text">© 2022 Comany Name</p>
      </div>
    </footer>
  );
}

export default Footer;

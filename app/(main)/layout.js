import Nav from "@/components/shared/Nav/Nav";
import SecondNav from "@/components/shared/SecondNav/SecondNav";

export default function GlobalLayout({ children }) {
  return (
    <>
      <Nav />
      <SecondNav />
      {children}
    </>
  );
}

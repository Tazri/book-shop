function AuthorPage({ params }) {
  return (
    <div className="flex-grow flex justify-center items-center h-96 text-center">
      <div className="flex flex-col">
        <h2 className="text-sm s280:text-base s320:text-lg s340:text-xl sm:text-2xl md:text-3xl duration-150">
          This page is under contstruction
        </h2>
        <p className="s320:text-base s280:text-sm text-xs">
          Your author Id is : {params?.authorId}
        </p>
      </div>
    </div>
  );
}

export default AuthorPage;

import PublishersDisplay from "@/components/PublisherSearchForm/PublishersDisplay";
import PublisherSearchForm from "@/components/PublisherSearchForm/PublisherSearchForm";

function PublishersPage({ searchParams }) {
  return (
    <div className="mx-auto container my-2 px-1">
      <h2 className="text-xl font-light text-[#202020]">Publishers</h2>

      <PublisherSearchForm />

      <PublishersDisplay searchParams={searchParams} />
    </div>
  );
}

export default PublishersPage;

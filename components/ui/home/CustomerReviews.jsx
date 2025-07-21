import CustomerReview from "./Review";

export default function CustomerReviews() {
  return (
    <section className="p-8 mx-8 pt-16">
      <p className="koh-santepheap text-2xl sm:text-4xl font-bold">
        What People Are Saying
      </p>
      <section className="py-12 flex flex-col items-center 2xl:flex-row gap-4 justify-evenly ">
        <CustomerReview
          review="Love It!"
          name="Kyle B"
          initials="KB"
          handle="FaceBook Marketplace"
        />
        <CustomerReview
          review="A glowing review!"
          name="Anon"
          initials="AN"
          handle=""
        />
        <CustomerReview
          review="Amazing!"
          name="Someone"
          initials="SS"
          handle="Somewhere"
        />
      </section>
    </section>
  );
}

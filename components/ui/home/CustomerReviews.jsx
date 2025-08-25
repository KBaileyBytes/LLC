import CustomerReview from "./Review";

export default function CustomerReviews() {
  return (
    <section className="p-8 mx-8 pt-16">
      <p className="koh-santepheap text-2xl sm:text-4xl font-bold">
        What People Are Saying
      </p>
      <section className="py-12 flex flex-col items-center 2xl:flex-row gap-4 justify-evenly">
        <CustomerReview
          review="Absolutely love my resin bowl! The craftsmanship is beautiful and the details are even better in person."
          name="Sohpia M."
          initials="SM"
          handle="FaceBook Marketplace"
        />
        <CustomerReview
          review="Great quality and really unique. The colors are vibrant and it feels sturdy."
          name="Daniel R."
          initials="DR"
          handle="LLC Shop"
        />
        <CustomerReview
          review="The turtle bowl is absolutely stunning! The ocean blue resin and shell details catch the light beautifully."
          name="Jessica L."
          initials="JL"
          handle="Instagram"
        />
      </section>
    </section>
  );
}

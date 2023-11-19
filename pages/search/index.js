import AllProductPage from "../../src/components/AllProductPage/index";
import PageHead from "../../src/components/Helpers/PageHead";

export default function allproductsPage(data) {
  return (
    <>
      <PageHead title="Search | Products" />
      <AllProductPage response={data} />
    </>
  );
}
export const getServerSideProps = async (context) => {
  const res = await fetch(
    `${process.env.NEXT_BASE_URL}api/v1/user/search?id=${
      context.query.search
        ? `search=${context.query.search}`
        : context.query.category && context.query.search
        ? `search=${context.query.search}&categories[]=${context.query.category}`
        : `${context.query.category}`
    }`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

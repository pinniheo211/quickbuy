import { useRouter } from "next/router";
import { useEffect } from "react";
import PageHead from "../../src/components/Helpers/PageHead";
import SingleProductPage from "../../src/components/SingleProductPage";
const SingleProduct = ({ data }) => {
  const router = useRouter();
  useEffect(() => {
    if (router && !router.query.slug) {
      router.push("*");
    }
  });

  return (
    <>
      <PageHead title={`${data && data.name}`} metaDes={data && data.name} />
      {router.query.slug && <SingleProductPage details={data} />}
    </>
  );
};
export const getServerSideProps = async (context) => {
  const res = await fetch(
    `${process.env.NEXT_BASE_URL}api/v1/user/product/detail?id=${context.query.slug}`
  );
  const { data } = await res.json();

  return {
    props: {
      data,
    },
  };
};
export default SingleProduct;

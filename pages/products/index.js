import { useRouter } from "next/router";
import { useEffect } from "react";
import AllProductPage from "src/components/AllProductPage/index";
import PageHead from "src/components/Helpers/PageHead";

export default function AllProductsPageData(data) {
  const { seoSetting } = data.data;
  const router = useRouter();
  useEffect(() => {
    if (!data.data) {
      router.push("*");
    }
  });
  return (
    <>
      {data && (
        <>
          <PageHead title={`Now Market`} metaDes={`Now Market Ecommerce`} />
          <AllProductPage response={data?.data} />
        </>
      )}
    </>
  );
}
export const getServerSideProps = async (context) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_BASE_URL}api/v1/user/search?id=${
        context.query.category
          ? `${context.query.category}`
          : context.query.sub_category
          ? `sub_category=${context.query.sub_category}`
          : context.query.child_category
          ? `child_category=${context.query.child_category}`
          : context.query.highlight
          ? `highlight=${context.query.highlight}`
          : context.query.brand
          ? `brand=${context.query.brand}`
          : ""
      }`
    );
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      props: {
        data: false,
      },
    };
  }
};

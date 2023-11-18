import PageHead from "../src/components/Helpers/PageHead";
import Home from "./../src/components/Home/index";

export default function HomePage({ data }) {
  const { seoSetting } = data;
  return (
    <>
      <PageHead
        title={`Home - Welcome to Now Market`}
        metaDes={`Now Market Ecommerce`}
      />
      <Home homepageData={data} />
    </>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_BASE_URL}api/v1/user/product/homeAll`
  );
  const data = await res.json();
  return { props: { data } };
}

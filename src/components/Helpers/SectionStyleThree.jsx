import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";

export default function SectionStyleThree({
  className,
  sectionTitle,
  seeMoreUrl,
  products = [],
}) {
  const rs = products.map((item) => {
    return {
      id: item.product_id,
      title: item.product_name,
      slug: item.product_id,
      image: item.product_image,
      price: item.product_price,
      offer_price: item.product_price_sale,
      campaingn_product: null,
      review: parseInt(item.product_rating),
      variants: [],
    };
  });
  return (
    <div className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
            <DataIteration datas={rs} startLength={0} endLength={rs.length}>
              {({ datas }) => (
                <div data-aos="fade-up" key={datas.id} className="item">
                  <ProductCardStyleOne datas={datas} />
                </div>
              )}
            </DataIteration>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}

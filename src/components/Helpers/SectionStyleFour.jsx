import ProductCardRowStyleTwo from "./Cards/ProductCardRowStyleTwo";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";

export default function SectionStyleFour({
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
          <div className="grid lg:grid-cols-3 grid-cols-1 xl:gap-[30px] lg:gap-5">
            <div className="item-col">
              <DataIteration datas={rs} startLength={0} endLength={4}>
                {({ datas }) => (
                  <ProductCardRowStyleTwo key={datas.id} datas={datas} />
                )}
              </DataIteration>
            </div>
            <div className="item-col">
              <DataIteration datas={rs} startLength={4} endLength={8}>
                {({ datas }) => (
                  <ProductCardRowStyleTwo key={datas.id} datas={datas} />
                )}
              </DataIteration>
            </div>
            <div className="item-col">
              <DataIteration datas={rs} startLength={8} endLength={12}>
                {({ datas }) => (
                  <ProductCardRowStyleTwo key={datas.id} datas={datas} />
                )}
              </DataIteration>
            </div>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}

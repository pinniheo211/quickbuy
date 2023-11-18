import PageHead from "../src/components/Helpers/PageHead";
import Layout from "../src/components/Partials/Layout";
import TrackingOrder from "../src/components/TrackingOrder/index";
function trackingOrderPage() {
  return (
    <>
      <PageHead title="Tracking order" />
      <Layout childrenClasses="pt-0 pb-0">
        <TrackingOrder />
      </Layout>
    </>
  );
}

export default trackingOrderPage;

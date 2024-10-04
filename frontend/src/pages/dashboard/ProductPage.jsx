import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Loader from "../../components/skeletons/Loader";
import AnimationWrapper from "../../shared/components/animation/page-animation";
import NoDataFound from "../../components/skeletons/NoDataFound";
import Product from "../../components/client/Product";

const ProductPage = () => {
  const [products, setProducts] = useState(null);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/client/products`
        );

        setProducts(responseData.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <div>
      <div className="flex flex-col justify-center pb-5">
        <p className="header">products</p>
        <p className="text-xl font-inter text-dark-grey dark:text-[#f0f0f0]">
          See your list of products
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products === null ? (
          <div className="center">
            <Loader />
          </div>
        ) : products.length ? (
          products.map((product, index) => {
            return (
              <AnimationWrapper
                key={index}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                <Product product={product} />
              </AnimationWrapper>
            );
          })
        ) : (
          <NoDataFound message="No related blogs found" />
        )}
      </div>
    </div>
  );
};

export default ProductPage;

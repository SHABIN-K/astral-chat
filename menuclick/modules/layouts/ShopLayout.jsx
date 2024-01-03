import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useShopStore } from "@/utils/state";

const ShopLayout = (shopId) => {
  const router = useRouter();
  const { shops } = useShopStore();
  const [isEffect, setIsEffect] = useState(false);
  const [currentShop, setCurrentShop] = useState(null);

  useEffect(() => {
    // Check if the provided shop ID is not in the array of shop IDs
    if (!shops.map((shop) => shop.id).includes(shopId)) {
      // If the ID is not in the array, log an error message and redirect to the dashboard
      console.error("oops!.Wrong shop url, Please try again");
      router.push("/dashboard");
    } else {
      // If the ID is in the array, set the state variable to true
      const foundShop = shops.find((shop) => shop.id === shopId);
      setCurrentShop(foundShop);
      setIsEffect(true);
    }
  }, [shopId, router, shops]);

  return { isEffect, currentShop, setCurrentShop };
};

export default ShopLayout;

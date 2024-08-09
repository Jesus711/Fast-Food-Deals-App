import { dateRetrieved } from "./RestaurantDisplay/deals"

const Header = () => (
  <section className="flex flex-col justify-center items-center w-full">
    <h1 className="text-center text-[72px] text-blue-500 font-bold italic">Fast Food Deals</h1>
    <p className="text-center text-[24px] text-blue-300">Find all the best deals from popular fast food Restaurants</p>
    <p className="text-center text-[24px] text-blue-300"><span className="font-semibold underline">Deals Last Updated:</span> {dateRetrieved}</p>
  </section>
)

export default Header
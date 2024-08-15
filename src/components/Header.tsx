import { dateRetrieved, area } from "./RestaurantDisplay/deals"

const Header = () => (
  <section className="flex flex-col justify-center items-center w-full">
    <h1 className="text-center text-[72px] text-blue-500 font-bold italic">Fast Food Deals</h1>
    <p className="text-center text-[24px] text-blue-300">Find all the best deals from popular fast food Restaurants</p>
    <p className="text-center text-[24px] text-blue-300">Deals from: <span className="font-semibold underline">{area}</span></p>
    <p className="text-center text-[24px] text-blue-300">Last Updated: <span className="font-semibold underline">{dateRetrieved}</span> </p>
  </section>
)

export default Header
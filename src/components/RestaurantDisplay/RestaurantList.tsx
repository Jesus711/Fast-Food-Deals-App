import restaurantsData from "../../constants/constants";
import deals from "./deals";


interface Restaurant {
  title: string;
  url: string;
  image: string;
  activeSelection: string,
  handleSelection: (name: string) => void,
}


const RestaurantCard = ({ title, url, image, activeSelection, handleSelection }: Restaurant) => (
      <div className={`flex flex-col w-[368px] justify-center items-center p-4 m-2 ${activeSelection === title ? "bg-emerald-400" : "bg-slate-400"} rounded-xl ${activeSelection === title ? "" : "hover:bg-gray-300"}`}>
      <h1 className="text-center text-[28px] font-semibold">{title}</h1>
      <div className="w-full h-[90px] my-2 flex justify-center items-center">
        <img src={image} alt={title} className="w-[60%] h-full object-contain" />
      </div>
          {deals[title].length > 0 ? (
            <div className="w-full flex flex-row justify-between items-center">
              <a href={url} target='_blank' className='text-[18px] px-4 py-2 bg-slate-600 text-white rounded-[16px]' >Go to Website</a>
              <button type="button" onClick={() => handleSelection(title)} className="text-white font-semibold text-[18px] rounded-[16px] bg-slate-600 px-4 py-2" >{activeSelection !== title ? "View Deals" : "Displaying"}</button>
            </div>
          ) : (
            <h1 className="text-[28px] font-bold italic">Coming Soon!!!</h1>
          )}
    </div>
)



const RestaurantList = ({ selection, handleSelect }: { selection: string, handleSelect: (name: string) => void }) => {

  

  return (
    <section className="py-4">
      <h1 className="text-white text-[36px] font-semibold text-center">Popular Fast Food Restaurants</h1>
      <div className="flex flex-row px-4 py-2 justify-center items-center flex-wrap mx-2 my-4">
        {restaurantsData.map(place => (
          <RestaurantCard key={place.title + place.home_url} title={place.title} url={place.deals_url} image={place.image} activeSelection={selection} handleSelection={handleSelect} />
        ) )}
      </div>
    </section>
  )
}

export default RestaurantList;
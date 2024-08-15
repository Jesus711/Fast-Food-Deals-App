import { Deal } from '../../interfaces/Deal';
import restaurantsData from '../../constants/constants';


const DealCard = ( {text, image, url}: Deal ) => (
  <a href={url} target='_blank' className="xl:w-[480px] w-[360px] xl:h-[390px] h-[300px] flex flex-col justify-around items-center gap-y-4 bg-emerald-500 rounded-xl m-5 py-4 px-3">
    <h1 className="text-black font-semibold text-center xl:text-[24px] text-[18px] ">{text}</h1>
    <div className='flex justify-center items-center'>
      <img src={image} alt="Deal Image" className="xl:w-[240px] w-[200px] xl:h-[200px] h-[150px]  object-contain" />
    </div>
  </a>
)


const DealsList = ({selected, dealsList} : { selected: string, dealsList: Deal[]}) => {

  const defaultURL = restaurantsData.filter( (place) => place.title === selected)[0]
    
  return (
    <section className="flex justify-center items-center">
      {dealsList.length > 0 ? (
        <div>
          <h1 className="text-white font-semibold text-center md:text-[32px] text-[24px]">Now Displaying Deals From <span className="font-bold underline">{selected}</span></h1>
          <h2 className="text-white font-semibold text-center md:text-[32px] text-[24px]">Click on Deal Card to view on the Store Page</h2>
          <div className="flex flex-row flex-wrap justify-center items-center">
            {dealsList.map( (deal) => (
              <DealCard key={deal.text + deal.id} text={deal.text} image={deal.image} id={deal.id} url={deal.url ? deal.url : defaultURL.deals_url} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-white font-semibold text-center text-[32px]">Click on <span className="font-bold underline">View Deals</span> on one of the Restaurants to see their current Deals!</h1>
      )}

    </section>
  )
}

export default DealsList
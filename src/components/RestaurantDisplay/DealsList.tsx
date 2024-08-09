import { Deal } from '../../interfaces/Deal';


const DealCard = ( {text, image, id, url}: Deal ) => (
  <a href={url} target='_blank' className="w-[480px] h-[390px] flex flex-col justify-around items-center gap-y-4 bg-emerald-500 rounded-xl m-5 py-4 px-3">
    <h1 className="text-black font-semibold text-center text-[24px] ">{text}</h1>
    <div className='flex justify-center items-center border-[2px] border-red-500'>
      <img src={image} alt="Deal Image" className=" w-[240px] h-[200px] object-contain" />
    </div>
  </a>
)


const DealsList = ({selected, dealsList} : { selected: string, dealsList: Deal[]}) => {
    
  return (
    <section className="flex justify-center items-center">
      {dealsList.length > 0 ? (
        <div>
          <h1 className="text-white font-semibold text-center text-[32px]">Now Displaying Deals From <span className="font-bold underline">{selected}</span></h1>
          <h2 className="text-white font-semibold text-center text-[24px]">Click on Deal Card to go to Store Page</h2>
          <div className="flex flex-row flex-wrap justify-center items-center">
            {dealsList.map( (deal) => (
              <DealCard key={deal.text + deal.id} text={deal.text} image={deal.image} id={deal.id} url={deal.url} />
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
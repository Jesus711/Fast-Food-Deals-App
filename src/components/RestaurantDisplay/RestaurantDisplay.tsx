import RestaurantList from './RestaurantList'
import DealsList from './DealsList'
import { useState } from 'react'
import deals from './deals'
import { Deal } from '../../interfaces/Deal';


const RestaurantDisplay = ()  => {

    const [selection, setSelection] = useState("")
    const [displayDeals, setDisplayDeals] = useState<Deal[]>([])

    const handleRestaurantSelect = (title: string) => {
        if (title === selection){
            console.log("Already Displaying")
            return;
        }
        console.log(deals)

        console.log(`Previous Selection: ${selection}`)
        console.log(`You Pressed ${title}`);
        setSelection(title);
        console.log(deals[title])

        setDisplayDeals(deals[title])
    }


    return (
        <div className='flex flex-col'>
            <RestaurantList selection={selection} handleSelect={handleRestaurantSelect} />
            <DealsList selected={selection} dealsList={displayDeals}/>
        </div>
    )
}

export default RestaurantDisplay

type Restaurant = {
    title: string,
    home_url: string,
    deals_url: string,
    digital_exclusives: string,
    image: string
}

const restaurantsData: Array<Restaurant> = [
    {
        title: "Little Caesars",
        home_url: "https://littlecaesars.com",
        deals_url: "https://littlecaesars.com/en-us/deals/",
        digital_exclusives: "",
        image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/crm/grapevine/2-LittleCaesars_Logo-2_00_f8dad21a-5056-a36a-07ce9ae56cdf25d1.jpg",
    },
    {
        title: "Burger King",
        home_url: "https://www.bk.com/",
        deals_url: "https://www.bk.com/rewards/offers",
        digital_exclusives: "https://www.bk.com/menu/section-960d229d-c691-4dac-ad95-0593c69f4d9b",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Burger_King_logo_2020.png",
    },
    {
        title: "Wendy's",
        home_url: "https://www.wendys.com/",
        deals_url: "https://order.wendys.com/categories?site=menu&lang=en_US",
        digital_exclusives: "",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Wendy%E2%80%99s_Logo.png",
    },
    {
        title: "KFC",
        home_url: "https://www.kfc.com/",
        deals_url: "https://www.kfc.com/menu#deals",
        digital_exclusives: "",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/640px-KFC_logo-image.svg.png"
    },
    {
        title: "Jack In The Box",
        home_url: "https://www.jackinthebox.com/",
        deals_url: "https://www.jackinthebox.com/location/1670-w-mission-blvd/menu",
        digital_exclusives: "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWUlfMKoI3U5j4BlZR-vB5jrtqzaIswDJokw&s",
    },
    {
        title: "Wingstop",
        home_url: "https://www.wingstop.com/",
        deals_url: "https://www.wingstop.com/menu",
        digital_exclusives: "",
        image: "https://www.wingstop.com/assets/images/wingstop-logo-green-340.png",
    },
    {
        title: "Carl's Jr",
        home_url: "https://www.carlsjr.com/",
        deals_url: "https://www.carlsjr.com/full-menu",
        digital_exclusives: "",
        image: "https://www.carlsjr.com/getmedia/86e3fd7c-1bb2-449c-ac2e-d9c24289ef19/carls_jr_logo.svg?ext=.svg",
    },
]

export default restaurantsData;
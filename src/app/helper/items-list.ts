export const sorting = [
    {
        label: "Sort by newest",
        value: "new arrivals",
    },{
        label: "Sort by latest",
        value: "latest",
    },{
        label: "Sort by price: High to Low",
        value: "price: high to low",
    },{
        label: "Sort by price: Low to High",
        value: "price: low to high",
    },
]


export const category = [
    {
        label: "Men",
        value: "men"
    },
    {
        label: "Women",
        value: "women"
    },
    {
        label: "Running",
        value: "running"
    },
    {
        label: "Sneaker",
        value:  "sneaker"
    },
    {
        label: "Training",
        value:  "training"
    },
]

export const price = [
    {
        label: "Filter by price",
        value: "0",
        min: "40",
        max: "110"
    },
]


export const lookbookItems = [
    {
        image: "/lookbok-1.jpg",
        title: "Fall/Winter 2021",
        disc: "Elementum donec leo vulputate sit proin suspendisse malesuada neque proin gravida ut platea vitae duis hac hac vel id ipsum ultricies ut faucibus ultrices.",
        button: "Shop Now"
    },
    {
        image: "/lookbok-2.jpg",
        title: "Spring/Summer 2021",
        disc: "Elementum donec leo vulputate sit proin suspendisse malesuada neque proin gravida ut platea vitae duis hac hac vel id ipsum ultricies ut faucibus ultrices.",
        button: "Shop Now"
    },
    {
        image: "/lookbok-3.jpg",
        title: "Go & Play",
        disc: "Elementum donec leo vulputate sit proin suspendisse malesuada neque proin gravida ut platea vitae duis hac hac vel id ipsum ultricies ut faucibus ultrices.",
        button: "Shop Now"
    },
    {
        image: "/lookbok-4.jpg",
        title: "Adventurer Gear",
        disc: "Elementum donec leo vulputate sit proin suspendisse malesuada neque proin gravida ut platea vitae duis hac hac vel id ipsum ultricies ut faucibus ultrices.",
        button: "Shop Now"
    },
]

export const navbarItems = [
    {
        path: "/product-category/men",
        labels: "MEN",
    },
    {
        path: "/product-category/women",
        labels: "Women",
    },
    {
        path: "/collection",
        labels: "Collection",
    },
    {
        path: "/lookbook",
        labels: "Lookbook",
    },
    {
        path: "/sale",
        labels: "Sale",
    },
]
export const sidebarItems = [
    {
        path: "/product-category/men",
        labels: "MEN",
    },
    {
        path: "/product-category/women",
        labels: "Women",
    },
    {
        path: "/collection",
        labels: "Collection",
    },
    {
        path: "/lookbook",
        labels: "Lookbook",
    },
    {
        path: "/sale",
        labels: "Sale",
    },
    {
        path: "/story",
        labels: "Our Story"
    },
    {
        path: "/contact",
        labels: "Contact"
    }
]

export const footerShop = [
    {
        link: "/product-category/men",
        label: "Shop Men",
    },
    {
        link: "/product-category/women",
        label: "Shop Women",
    },
    {
        link: "/lookbook",
        label: "Lookbook",
    },
    {
        link: "/sale/#gift",
        label: "Gift Card",
    },
    {
        link: "/sale",
        label: "Sale",
    },
]

export const footerAbout = [
    {
        link: "/story",
        label: "Our Story",
    },
    {
        link: "",
        label: "Our Materials",
    },
    {
        link: "",
        label: "Our Value",
    },
    {
        link: "",
        label: "Sustainability",
    },
    {
        link: "",
        label: "Manufacture",
    },
]

export const footerHelp = [
    {
        link: "/contact/#faqs",
        label: "FAQs",
    },
    {
        link: "",
        label: "Shipping & Returns",
    },
    {
        link: "",
        label: "Shoe Care",
    },
    {
        link: "",
        label: "Size Chart",
    },
    {
        link: "/contact",
        label: "Contact Us",
    },
]


export const filteredOptions = [
    {
      id: "sort",
      title: "Default sorting",
      options: sorting,
      filterType: "radio",
      onClick: "sorting",
      className: "sorting",
    },
    {
      id: "category",
      title: "Category",
      options: category,
      filterType: "checkbox",
      onClick: "category",
      className: "category",
    },
  ];
  
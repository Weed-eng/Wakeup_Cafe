export type Category = "Burgers" | "Fries" | "Drinks" | "Combos";

export interface MenuItem {
  id: number;
  name: string;
  category: Category;
  price: string;
  priceNum: number;
  tag: string;
  desc: string;
  longDesc: string;
  image: string;
  spicy?: boolean;
  popular?: boolean;
  new?: boolean;
}

export const MENU: MenuItem[] = [
  // ── BURGERS ──────────────────────────────────────────────
  {
    id: 1,
    name: "Wakeup Classic",
    category: "Burgers",
    price: "Rs. 890",
    priceNum: 890,
    tag: "BESTSELLER",
    desc: "Double beef · secret sauce · brioche bun",
    longDesc:
      "Two hand-pressed beef patties, caramelised onions, house pickles, iceberg lettuce, ripe tomato, and our signature Wakeup secret sauce — all stacked inside a butter-toasted brioche bun. The one that started it all.",
    image: "/burger-classic.png",
    popular: true,
  },
  {
    id: 2,
    name: "Hot Grill Summer",
    category: "Burgers",
    price: "Rs. 950",
    priceNum: 950,
    tag: "SPICY",
    desc: "Spicy chicken · jalapeños · chipotle mayo",
    longDesc:
      "Crispy fried chicken fillet marinated in a red chilli brine, stacked with pickled jalapeños, shredded slaw, and a smoky chipotle mayo that hits you right at the end. Handle with care.",
    image: "/burger-hot.png",
    spicy: true,
  },
  {
    id: 3,
    name: "Premium Smash",
    category: "Burgers",
    price: "Rs. 1,190",
    priceNum: 1190,
    tag: "PREMIUM",
    desc: "Wagyu smash · American cheese · Wakeup sauce",
    longDesc:
      "Two thin wagyu patties smashed hard on a screaming-hot flat top, draped in melted American cheese, finished with our secret Wakeup sauce, diced white onions, and mustard. Crispy edges mandatory.",
    image: "/burger-smash.png",
    popular: true,
  },
  {
    id: 4,
    name: "Chicken in Buns",
    category: "Burgers",
    price: "Rs. 820",
    priceNum: 820,
    tag: "CRISPY",
    desc: "Crispy fried chicken · coleslaw · pickles",
    longDesc:
      "A thick buttermilk-brined chicken fillet fried to a golden shatter, topped with creamy house coleslaw and bread-and-butter pickles. Simple. Perfect. Every time.",
    image: "/chicken-bun.png",
  },
  {
    id: 5,
    name: "BBQ Stack",
    category: "Burgers",
    price: "Rs. 990",
    priceNum: 990,
    tag: "SMOKY",
    desc: "Beef patty · BBQ glaze · crispy onions · cheddar",
    longDesc:
      "A thick beef patty glazed with house-made smoky BBQ sauce, layered with aged cheddar, crispy fried onion strings, and a dill pickle slice. Low and slow energy in every bite.",
    image: "/burger-classic.png",
  },
  {
    id: 6,
    name: "Mushroom Swiss",
    category: "Burgers",
    price: "Rs. 1,050",
    priceNum: 1050,
    tag: "NEW",
    desc: "Beef · sautéed mushrooms · Swiss cheese · truffle aioli",
    longDesc:
      "A single thick beef patty topped with buttery sautéed cremini mushrooms, melted Swiss cheese, and a swipe of black truffle aioli. Earthy, rich, completely different from everything else on this menu.",
    image: "/burger-smash.png",
    new: true,
  },

  // ── FRIES ──────────────────────────────────────────────
  {
    id: 7,
    name: "Loaded Fries",
    category: "Fries",
    price: "Rs. 490",
    priceNum: 490,
    tag: "FAN FAVE",
    desc: "Cheese sauce · jalapeños · bacon · sour cream",
    longDesc:
      "Shoestring fries buried under a flood of molten nacho cheese sauce, scattered with pickled jalapeños, crispy bacon bits, and a dollop of cool sour cream. Share it. Or don't.",
    image: "/fries-loaded.png",
    popular: true,
  },
  {
    id: 8,
    name: "Classic Fries",
    category: "Fries",
    price: "Rs. 250",
    priceNum: 250,
    tag: "SIMPLE",
    desc: "Golden shoestring fries · seasoning salt",
    longDesc:
      "The baseline. Thin-cut shoestring fries fried twice for maximum crunch, tossed in our house seasoning salt. Comes with a side of ketchup and Wakeup dip.",
    image: "/fries-loaded.png",
  },
  {
    id: 9,
    name: "Chili Fries",
    category: "Fries",
    price: "Rs. 420",
    priceNum: 420,
    tag: "HOT",
    desc: "Fries · chilli con carne · red onion · cheddar",
    longDesc:
      "Crispy fries topped with slow-cooked beef chilli con carne, raw diced red onion, shredded cheddar, and a swirl of sour cream to cool the burn. Proper meal energy.",
    image: "/fries-loaded.png",
    spicy: true,
  },
  {
    id: 10,
    name: "Waffle Fries",
    category: "Fries",
    price: "Rs. 350",
    priceNum: 350,
    tag: "THICK",
    desc: "Thick-cut waffle fries · Wakeup dipping sauce",
    longDesc:
      "Thick waffle-cut fries with all those crispy ridges that hold the sauce perfectly. Served with our signature Wakeup dipping sauce — a creamy, tangy, faintly smoky blend.",
    image: "/fries-loaded.png",
  },

  // ── DRINKS ──────────────────────────────────────────────
  {
    id: 11,
    name: "Craft Cola",
    category: "Drinks",
    price: "Rs. 180",
    priceNum: 180,
    tag: "CLASSIC",
    desc: "House-made cola · fresh ice · lemon zest",
    longDesc:
      "Our house-blended cola made with cane sugar, real vanilla, citrus zest, and a hint of spice. Served over crushed ice. Way better than the can.",
    image: "/drink-cola.png",
  },
  {
    id: 12,
    name: "Neon Lemonade",
    category: "Drinks",
    price: "Rs. 250",
    priceNum: 250,
    tag: "FRESH",
    desc: "Fresh lemon · mint · blue salt rim",
    longDesc:
      "Cold-pressed lemon juice, fresh mint leaves, house simple syrup, and a striking blue mineral salt rim. Looks like neon. Tastes like summer at midnight.",
    image: "/drink-cola.png",
    new: true,
  },
  {
    id: 13,
    name: "Midnight Shake",
    category: "Drinks",
    price: "Rs. 420",
    priceNum: 420,
    tag: "THICK",
    desc: "Oreo · vanilla bean · whipped cream",
    longDesc:
      "A thick, old-school milkshake blended with Oreo crumble, real vanilla bean ice cream, whole milk, and topped with a mountain of whipped cream. Served with a black straw. Iconic.",
    image: "/drink-cola.png",
    popular: true,
  },
  {
    id: 14,
    name: "Mango Lassi",
    category: "Drinks",
    price: "Rs. 320",
    priceNum: 320,
    tag: "LOCAL",
    desc: "Chaunsa mango · yoghurt · cardamom",
    longDesc:
      "Pakistan's best mango — Chaunsa — blended with thick full-fat yoghurt, a pinch of cardamom, and a few ice cubes. Cold. Thick. Completely Pakistani.",
    image: "/drink-cola.png",
  },

  // ── COMBOS ──────────────────────────────────────────────
  {
    id: 15,
    name: "Classic Combo",
    category: "Combos",
    price: "Rs. 1,290",
    priceNum: 1290,
    tag: "SAVE Rs.230",
    desc: "Classic Burger · Classic Fries · Craft Cola",
    longDesc:
      "The full Wakeup experience in one tray. The Classic burger, a side of our shoestring fries, and a house craft cola. Everything you need. Nothing you don't.",
    image: "/combo-meal.png",
    popular: true,
  },
  {
    id: 16,
    name: "Smash Deal",
    category: "Combos",
    price: "Rs. 1,790",
    priceNum: 1790,
    tag: "SAVE Rs.320",
    desc: "Premium Smash · Loaded Fries · Midnight Shake",
    longDesc:
      "Go big. The Premium Smash burger, a full portion of Loaded Fries drowning in cheese sauce, and a thick Midnight Shake. This is the move.",
    image: "/combo-meal.png",
  },
  {
    id: 17,
    name: "Date Night",
    category: "Combos",
    price: "Rs. 2,990",
    priceNum: 2990,
    tag: "FOR TWO",
    desc: "2 Burgers · Loaded Fries · 2 Shakes",
    longDesc:
      "Two burgers of your choice, one sharing Loaded Fries, and two Midnight Shakes. Designed for two. Definitely eaten by one.",
    image: "/combo-meal.png",
    new: true,
  },
  {
    id: 18,
    name: "Family Pack",
    category: "Combos",
    price: "Rs. 4,490",
    priceNum: 4490,
    tag: "FEEDS 4",
    desc: "4 Burgers · 2 Loaded Fries · 4 Drinks",
    longDesc:
      "Four Classic Burgers, two sharing portions of Loaded Fries, and four house Craft Colas. Enough for the whole table. Or just you — we don't judge.",
    image: "/combo-meal.png",
  },
];

export const CATEGORIES: Category[] = ["Burgers", "Fries", "Drinks", "Combos"];

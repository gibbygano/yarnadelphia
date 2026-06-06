import type { Inventory } from "./yarnadelphia.types.ts";

const inventory: Inventory = {
  earrings: [
    {
      id: "3090108490",
      name: "Black Skull Earrings",
      description: "x in x in black earrings with skull design.",
      images: [
        "earrings/blackskulls-1.jpeg",
        "earrings/blackskulls-2.jpeg",
      ],
      price: 30.00,
      availability: { available: false, reason: "Coming Soon" },
    },
    {
      id: "427787896",
      name: "Blue Kanzashi Earrings",
      description:
        "x in x in blue kanzashi flower earrings with blue glass bead.",
      images: [
        "earrings/bluekanzashi.jpeg",
      ],
      price: 25.00,
      availability: { available: false, reason: "Sold Out" },
    },
  ],
  headwear: [
    {
      id: "1136379407",
      name: "Granny Square Bucket Hat",
      description: "Wool and Nylon Yarn.",
      images: [
        "headwear/grannyhat-1.jpeg",
        "headwear/grannyhat-2.jpeg",
      ],
      price: 60.00,
      availability: { available: false, reason: "Coming Soon" },
    },
    {
      id: "figureitoutlaterhahthath",
      name: "Paros Cover",
      description: "Yarn Crocheted Paros Cover",
      images: [
        "headwear/paros-1.jpeg",
        "headwear/paros-2.jpeg",
      ],
      price: 30.00,
      availability: { available: false, reason: "Sold Out" },
    },
  ],
};

export default inventory;

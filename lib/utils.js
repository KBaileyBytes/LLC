import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import ResinBowl from "@/public/images/LeeLeeCreationz-ResinBowlBotanical.png";
import AcrylicCoaster from "@/public/images/LeeLeeCreationz-AcrylicCoasters.png";
import LeafCoasterSet from "@/public/images/LeeLeeCreationz-LeafCoasterSet.png";
import PumpkinJars from "@/public/images/LeeLeeCreationz-PumpkinJars.png";
import ResinCoasters from "@/public/images/LeeLeeCreationz-ResinCoasters.png";
import RoadstoolHuts from "@/public/images/LeeLeeCreationz-RoadstoolHuts.png";
import PinkThinker from "@/public/images/LeeLeeCreationz-ThinkerPink.png";
import TurtleSet from "@/public/images/LeeLeeCreationz-TurtleSet.png";
import TurtleTray2 from "@/public/images/LeeLeeCreationz-TurtleTray(2).png";
import PinkBlueCoasters from "@/public/images/LeeLeeCreationz-PinkBlueCoasters.png";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Shop = {
  categories: [
    "New & Unique",
    "Seasonal",
    "Resin Bowls",
    "Coasters",
    "Thinkers",
    "Turtles",
  ],
  contentSections: {
    FeaturedCarousel: ["10", "1", "2"],
    FeaturedCreations: ["7", "8", "5"],
    BestSeller: ["9", "3", "2"],
    HighlightNew: ["6", "9"],
  },
  products: [
    {
      id: "1", //
      title: "Botanical Resin Bowl",
      categories: ["New & Unique", "Resin Bowls"],
      colors: ["FFFFFF"],
      description:
        "Beautiful sage green botanical resin bowl with a rose pedal bottom",
      image: ResinBowl,
      size: "25 x 25",
      price: 24.99,
    },
    {
      id: "2",
      title: "Toadstool Huts",
      categories: ["Seasonal"],
      description: "Description of product test",
      image: RoadstoolHuts,
      size: "25 x 25",
      price: 24.99,
    },
    {
      id: "3",
      title: "Pumpkin Jars",
      categories: ["Seasonal"],
      description: "Description of product test",
      image: PumpkinJars,
      size: "25 x 25",
      price: 24.99,
    },
    {
      id: "4", // replace with product.id
      title: "Acrylic Coaster",
      categories: ["Coasters"],
      description: "Description of product test",
      image: AcrylicCoaster,
      size: "25 x 25",
      price: 24.99,
    },
    {
      id: "5", // replace with product.id
      title: "Leaf Tray",
      categories: ["Coasters"],
      description: "Description of product test",
      image: LeafCoasterSet,
      size: "25 x 25",
      price: 24.99,
    },
    {
      id: "6", // replace with product.id
      title: "Resin Coaster",
      categories: ["Coasters"],
      description: "Description of product test",
      image: ResinCoasters,
      size: "25 x 25",
      price: 24.99,
    },
    {
      id: "7", // replace with product.id
      title: "Thinkers",
      categories: ["Thinkers", "New & Unique"],
      description: "Description of product test",
      image: PinkThinker,
      size: "25 x 25",
      price: 24.99,
    },
    {
      id: "8", // replace with product.id
      title: "Turtle Set",
      categories: ["Turtles"],
      description: "Description of product test",
      image: TurtleSet,
      size: "25 x 25",
      price: 24.99,
    },
    {
      id: "9", // replace with product.id
      title: "Turtle Tray",
      categories: ["Turtles"],
      description: "Description of product test",
      image: TurtleTray2,
      size: "25 x 25",
      price: 24.99,
    },
    {
      id: "10", // replace with product.id
      title: "Poured Coasters",
      categories: ["Coasters"],
      description: "Description of product test",
      image: PinkBlueCoasters,
      size: "25 x 25",
      price: 24.99,
    },
  ],
};

export const Orders = [
  {
    id: 0,
    details: ["1x Botanical Resin Bowl", "2x Thinkers"],
    status: "Pending",
    total: 49.98,
  },
  {
    id: 1,
    details: ["2x Coasters"],
    status: "Pending",
    total: 49.98,
  },
  {
    id: 2,
    details: ["1x Coasters"],
    status: "Ongoing",
    total: 29.99,
  },
  {
    id: 3,
    details: ["2x Turtle Set"],
    status: "Delivered",
    total: 59.98,
  },
  {
    id: 4,
    details: ["1x Turtle Family", "2x Thinkers"],
    status: "Delivered",
    total: 59.98,
  },
];

export const Events = {
  categories: ["Craft Show", "News", "New Release"],
  events: [
    {
      id: 0,
      title: "Assiniboia Downs Craft Show",
      date: "May 20, 2025",
      time: "10 AM - 4 PM",
      category: "Craft Show",
      place: "Assiniboia Downs",
      description:
        "Come visit at booth 6 and take a look at my new Thinker and Turtle sets!",
    },
    {
      id: 1,
      title: "Coastal Turtle Tray",
      date: "May 20, 2025",
      category: "New Release",
      description:
        "Enjoy the new coastal turtle tray set that brings a beautiful green ...",
    },
    {
      id: 2,
      title: "New Stock",
      date: "June 5, 2025",
      category: "News",
      description: "Turtle family set will be back in stock May",
    },
    {
      id: 3,
      title: "Turtle Family Set",
      date: "July 20, 2025",
      category: "New Release",
      description: "Enjoy the new turtle family set that brings ...",
    },
  ],
};

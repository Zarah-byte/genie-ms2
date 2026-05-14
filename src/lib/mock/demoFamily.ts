export type DemoPerson = {
  id: string;
  name: string;
  relationship: string;
  dates: string;
  place: string;
  story: string;
  memories: string[];
  color: "you" | "first" | "second";
  x: number;
  y: number;
};

export type DemoMemory = {
  id: string;
  title: string;
  dateOrPlace: string;
  excerpt: string;
  relatedPeople: string[];
  x: number;
  y: number;
};

export type DemoRelationship = {
  id: string;
  from: string;
  to: string;
};

export const demoPeople: DemoPerson[] = [
  {
    id: "you",
    name: "You",
    relationship: "Archive keeper",
    dates: "Living branch",
    place: "Present day",
    story:
      "The first point of light in this archive: the person gathering names, photographs, and the stories that might otherwise drift away.",
    memories: ["A first photo upload", "Voice note from family reunion"],
    color: "you",
    x: 47,
    y: 42
  },
  {
    id: "amina",
    name: "Amina Rahman",
    relationship: "Grandmother",
    dates: "1942-2018",
    place: "Lahore -> Queens",
    story:
      "She carried recipes in memory long before anyone wrote them down.",
    memories: [
      "Wedding photograph, 1964",
      "Voice note from Eid dinner",
      "Handwritten recipe for cardamom tea",
      "Migration story"
    ],
    color: "first",
    x: 66,
    y: 27
  },
  {
    id: "samir",
    name: "Samir Yusuf",
    relationship: "Grandfather",
    dates: "1929-2001",
    place: "Chittagong -> London",
    story:
      "A railway ticket folded into his passport marked the year the family crossed water and began again in a smaller kitchen.",
    memories: ["The tea tin with the train ticket"],
    color: "first",
    x: 36,
    y: 74
  },
  {
    id: "leila",
    name: "Leila Rahman",
    relationship: "Aunt",
    dates: "b. 1962",
    place: "Brooklyn",
    story:
      "Leila remembers the songs, but not the exact street. Her stories hold the map until someone finds the address.",
    memories: ["Porch photograph, three unknown cousins"],
    color: "second",
    x: 29,
    y: 31
  },
  {
    id: "nora",
    name: "Nora Yusuf",
    relationship: "Mother",
    dates: "b. 1966",
    place: "Queens",
    story:
      "The shoebox of photographs came from her closet, each envelope labeled with a place, a season, or a question mark.",
    memories: ["Shoebox photo labels", "First school portrait"],
    color: "second",
    x: 76,
    y: 78
  },
  {
    id: "idris",
    name: "Idris Noor",
    relationship: "Cousin",
    dates: "b. 1989",
    place: "Queens",
    story:
      "Idris added voice notes from family calls, preserving the pauses and laughter between remembered facts.",
    memories: ["Voice note after dinner"],
    color: "first",
    x: 84,
    y: 10
  }
];

export const demoRelationships: DemoRelationship[] = [
  { id: "r1", from: "you", to: "amina" },
  { id: "r2", from: "you", to: "samir" },
  { id: "r3", from: "you", to: "leila" },
  { id: "r4", from: "you", to: "nora" },
  { id: "r5", from: "amina", to: "idris" },
  { id: "r6", from: "leila", to: "samir" },
  { id: "r7", from: "samir", to: "nora" },
  { id: "r8", from: "idris", to: "nora" }
];

export const demoMemories: DemoMemory[] = [
  {
    id: "m1",
    title: "The mango pickle recipe",
    dateOrPlace: "Queens, 1984",
    excerpt:
      "A stained recipe card remembers what no one wrote in full: less mustard oil if the mangoes are young.",
    relatedPeople: ["Amina Rahman", "Nora Yusuf"],
    x: 24,
    y: 52
  },
  {
    id: "m2",
    title: "A letter from the port",
    dateOrPlace: "Chittagong, 1961",
    excerpt:
      "Three lines about weather, work, and a promise to send photographs once the baby learned to stand.",
    relatedPeople: ["Samir Yusuf", "Leila Rahman"],
    x: 58,
    y: 68
  },
  {
    id: "m3",
    title: "Porch photograph",
    dateOrPlace: "Brooklyn, possibly 1978",
    excerpt:
      "Five cousins on the porch. Two names are certain, one is disputed, and two are waiting for someone to remember.",
    relatedPeople: ["Leila Rahman", "Nora Yusuf", "Idris Noor"],
    x: 90,
    y: 35
  },
  {
    id: "m4",
    title: "Voice note after dinner",
    dateOrPlace: "Ramadan, 2020",
    excerpt:
      "A cousin records the way Amira pronounced the village name, because spelling never quite caught it.",
    relatedPeople: ["You", "Idris Noor"],
    x: 71,
    y: 16
  },
  {
    id: "m5",
    title: "Unknown street",
    dateOrPlace: "Sylhet, date unknown",
    excerpt:
      "A place remembered by the smell of rain and the turn after the bakery, waiting to become coordinates.",
    relatedPeople: ["Amina Rahman", "Samir Yusuf"],
    x: 92,
    y: 86
  }
];

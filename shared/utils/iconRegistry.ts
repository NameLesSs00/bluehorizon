import { IconType } from "react-icons";
import {
  MdVilla,
  MdApartment,
  MdBeachAccess,
  MdStorefront,
  MdHotel,
  MdBalcony,
  MdAcUnit,
  MdPool,
  MdFitnessCenter,
  MdOutlineSecurity,
  MdLocalParking,
  MdHotTub,
  MdRestaurant,
  MdLocalCafe,
  MdWifi,
  MdTv,
  MdLocalHospital,
  MdShoppingBag,
  MdElevator,
  MdOutdoorGrill,
  MdPets,
  MdRoomService,
  MdLocalLaundryService,
  MdShower,
  MdOutlineSoupKitchen,
  MdOutlineDry,
  MdOutlineCurtains,
  MdOutlineTableRestaurant,
  MdOutlineBlender,
  MdLockOutline,
} from "react-icons/md";
import {
  TbBuildingEstate,
  TbHome2,
  TbBeach,
  TbSailboat,
  TbBuildingSkyscraper,
  TbBuildings,
  TbCrown,
  TbStack2,
  TbBed,
  TbBriefcase,
  TbTrees,
  TbAirConditioning,
  TbPool,
  TbBarbell,
  TbShieldCheck,
  TbCamera,
  TbParking,
  TbMassage,
  TbSparkles,
  TbPlant,
  TbBabyCarriage,
  TbMoodKid,
  TbToolsKitchen2,
  TbCoffee,
  TbWifi,
  TbDeviceTv,
  TbSolarElectricity,
  TbBolt,
  TbFirstAidKit,
  TbShoppingCart,
  TbBallTennis,
  TbElevator,
  TbShip,
  TbAnchor,
  TbFlame,
  TbDog,
  TbBike,
  TbRun,
  TbWashMachine,
  TbEye,
  TbFridge,
  TbMicrowave,
  TbBath,
  TbIroning,
  TbDesk,
  TbKey,
  TbFireExtinguisher,
  TbHanger,
  TbBread,
  TbWash,
  TbTeapot,
  TbPropeller,
  TbWashTumbleDry,
  TbAlarmSmoke,
  TbLuggage,
  TbChargingPile,
  TbBottle,
  TbGlass,
  TbLock,
} from "react-icons/tb";
import { FaHouseChimney, FaWaterLadder, FaBellConcierge } from "react-icons/fa6";
import { LuCastle, LuCctv, LuHouse, LuTreePalm, LuWaves } from "react-icons/lu";

export type IconCategory = "projectType" | "facility" | "service" | "rentalAmenity";

export interface RegisteredIcon {
  name: string;
  label: string;
  category: IconCategory;
  categories?: IconCategory[];
  tags: string[];
  icon: IconType;
}

export const ICON_REGISTRY: RegisteredIcon[] = [
  // Real Estate Project & Property Types
  { name: "MdVilla", label: "Villa / Standalone Villa", category: "projectType", tags: ["villa", "home", "luxury", "house"], icon: MdVilla },
  { name: "TbBuildingEstate", label: "Luxury Estate / Compound", category: "projectType", tags: ["estate", "villa", "compound"], icon: TbBuildingEstate },
  { name: "FaHouseChimney", label: "Family House / Home", category: "projectType", tags: ["house", "home", "residence"], icon: FaHouseChimney },
  { name: "TbHome2", label: "Residential Home", category: "projectType", tags: ["home", "house", "living"], icon: TbHome2 },
  { name: "TbBeach", label: "Beachfront Chalet", category: "projectType", tags: ["chalet", "beach", "sea", "resort"], icon: TbBeach },
  { name: "MdBeachAccess", label: "Chalet / Sea Access", category: "projectType", tags: ["chalet", "sea", "beach", "cabana"], icon: MdBeachAccess },
  { name: "TbSailboat", label: "Marina Villa / Chalet", category: "projectType", tags: ["chalet", "marina", "sea", "boat"], icon: TbSailboat },
  { name: "MdApartment", label: "Apartment / Flat", category: "projectType", tags: ["apartment", "flat", "building"], icon: MdApartment },
  { name: "TbBuildingSkyscraper", label: "High-Rise Apartment", category: "projectType", tags: ["apartment", "tower", "skyscraper"], icon: TbBuildingSkyscraper },
  { name: "TbBuildings", label: "Townhouses & Twin Houses", category: "projectType", tags: ["townhouse", "twin", "buildings"], icon: TbBuildings },
  { name: "TbCrown", label: "Penthouse / Sky Villa", category: "projectType", tags: ["penthouse", "luxury", "sky", "crown"], icon: TbCrown },
  { name: "MdBalcony", label: "Penthouse with Sea View", category: "projectType", categories: ["projectType", "service"], tags: ["penthouse", "balcony", "view", "terrace"], icon: MdBalcony },
  { name: "TbStack2", label: "Duplex Residence", category: "projectType", tags: ["duplex", "multilevel", "floors"], icon: TbStack2 },
  { name: "TbBed", label: "Studio / Hotel Suite", category: "projectType", categories: ["projectType", "rentalAmenity"], tags: ["studio", "suite", "bed", "bedroom"], icon: TbBed },
  { name: "MdHotel", label: "Hotel / Resort Residences", category: "projectType", tags: ["hotel", "resort", "serviced"], icon: MdHotel },
  { name: "MdStorefront", label: "Commercial / Retail Shop", category: "projectType", tags: ["commercial", "shop", "retail", "store"], icon: MdStorefront },
  { name: "TbBriefcase", label: "Administrative Office", category: "projectType", tags: ["office", "business", "commercial"], icon: TbBriefcase },
  { name: "LuCastle", label: "Mansion / Palace", category: "projectType", tags: ["mansion", "palace", "castle"], icon: LuCastle },
  { name: "TbTrees", label: "Land Plot / Development Area", category: "projectType", tags: ["land", "plot", "garden"], icon: TbTrees },

  // Project Facilities & Property Services
  { name: "MdPool", label: "Swimming Pool", category: "facility", categories: ["facility", "service"], tags: ["pool", "swimming", "water", "service"], icon: MdPool },
  { name: "TbPool", label: "Private / Infinity Pool", category: "facility", categories: ["facility", "service"], tags: ["pool", "infinity", "swim", "service"], icon: TbPool },
  { name: "FaWaterLadder", label: "Heated / Lagoon Pool", category: "facility", categories: ["facility", "service"], tags: ["pool", "lagoon", "ladder"], icon: FaWaterLadder },
  { name: "TbAirConditioning", label: "Central Air Conditioning", category: "facility", categories: ["facility", "service"], tags: ["ac", "air", "cooling", "climate"], icon: TbAirConditioning },
  { name: "MdAcUnit", label: "Climate Control", category: "facility", categories: ["facility", "service"], tags: ["ac", "cool", "air"], icon: MdAcUnit },
  { name: "MdFitnessCenter", label: "Fitness Center / Gym", category: "facility", categories: ["facility", "service"], tags: ["gym", "fitness", "workout", "service"], icon: MdFitnessCenter },
  { name: "TbBarbell", label: "Equipped Gym", category: "facility", categories: ["facility", "service"], tags: ["gym", "workout", "weights"], icon: TbBarbell },
  { name: "TbShieldCheck", label: "24/7 Security & Guard", category: "facility", categories: ["facility", "service"], tags: ["security", "guard", "safe", "shield", "service"], icon: TbShieldCheck },
  { name: "MdOutlineSecurity", label: "Gated Community Security", category: "facility", categories: ["facility", "service"], tags: ["security", "gated", "protection"], icon: MdOutlineSecurity },
  { name: "TbCamera", label: "CCTV Surveillance", category: "facility", categories: ["facility", "service"], tags: ["cctv", "camera", "surveillance", "service"], icon: TbCamera },
  { name: "LuCctv", label: "Security Cameras", category: "facility", categories: ["facility", "service"], tags: ["cctv", "security", "cameras"], icon: LuCctv },
  { name: "TbParking", label: "Underground Parking", category: "facility", categories: ["facility", "service"], tags: ["parking", "garage", "car", "service"], icon: TbParking },
  { name: "MdLocalParking", label: "Designated Parking", category: "facility", categories: ["facility", "service"], tags: ["parking", "lot", "vehicle"], icon: MdLocalParking },
  { name: "MdHotTub", label: "Jacuzzi & Spa", category: "facility", categories: ["facility", "service"], tags: ["jacuzzi", "spa", "wellness", "tub", "service"], icon: MdHotTub },
  { name: "TbMassage", label: "Wellness & Spa Center", category: "facility", categories: ["facility", "service"], tags: ["spa", "massage", "relaxation", "service"], icon: TbMassage },
  { name: "TbSparkles", label: "Sauna & Steam Room", category: "facility", categories: ["facility", "service"], tags: ["sauna", "steam", "luxury", "spa"], icon: TbSparkles },
  { name: "TbPlant", label: "Botanical Gardens", category: "facility", categories: ["facility", "service"], tags: ["garden", "greenery", "plant", "landscape"], icon: TbPlant },
  { name: "TbBabyCarriage", label: "Kids Club & Daycare", category: "facility", categories: ["facility", "service"], tags: ["kids", "children", "baby", "play", "service"], icon: TbBabyCarriage },
  { name: "TbMoodKid", label: "Children Playground", category: "facility", tags: ["playground", "kids", "fun"], icon: TbMoodKid },
  { name: "MdRestaurant", label: "Fine Dining Restaurant", category: "facility", categories: ["facility", "service"], tags: ["restaurant", "food", "dining", "catering"], icon: MdRestaurant },
  { name: "MdLocalCafe", label: "Coffee Shop & Lounge", category: "facility", tags: ["cafe", "coffee", "lounge"], icon: MdLocalCafe },
  { name: "MdWifi", label: "High-Speed Fiber Wi-Fi", category: "facility", categories: ["facility", "service"], tags: ["wifi", "internet", "network", "service"], icon: MdWifi },
  { name: "TbDeviceTv", label: "Living Room TV", category: "facility", tags: ["tv", "media", "screen"], icon: TbDeviceTv },
  { name: "TbSolarElectricity", label: "Solar Energy System", category: "facility", categories: ["facility", "service"], tags: ["solar", "green", "power", "energy"], icon: TbSolarElectricity },
  { name: "TbBolt", label: "Backup Generator", category: "facility", categories: ["facility", "service"], tags: ["generator", "power", "backup", "electricity", "maintenance"], icon: TbBolt },
  { name: "MdLocalHospital", label: "On-site Healthcare", category: "facility", categories: ["facility", "service"], tags: ["hospital", "doctor", "health", "medical"], icon: MdLocalHospital },
  { name: "TbShoppingCart", label: "Supermarket & Groceries", category: "facility", tags: ["market", "shopping", "groceries"], icon: TbShoppingCart },
  { name: "MdShoppingBag", label: "Retail & Shopping Arcade", category: "facility", tags: ["shopping", "retail", "mall"], icon: MdShoppingBag },
  { name: "TbBallTennis", label: "Tennis & Padel Courts", category: "facility", tags: ["tennis", "padel", "sports", "court"], icon: TbBallTennis },
  { name: "MdElevator", label: "High-Speed Elevators", category: "facility", categories: ["facility", "service"], tags: ["elevator", "lift", "access"], icon: MdElevator },
  { name: "TbElevator", label: "Passenger Lift", category: "facility", tags: ["elevator", "lift"], icon: TbElevator },
  { name: "TbShip", label: "Private Yacht Marina", category: "facility", tags: ["marina", "yacht", "boat", "sea"], icon: TbShip },
  { name: "TbAnchor", label: "Water Sports Pier", category: "facility", tags: ["pier", "water", "anchor", "sports"], icon: TbAnchor },
  { name: "TbFlame", label: "BBQ & Social Firepit", category: "facility", categories: ["facility", "service"], tags: ["bbq", "firepit", "grill", "lounge"], icon: TbFlame },
  { name: "MdOutdoorGrill", label: "Outdoor BBQ Zone", category: "facility", categories: ["facility", "service"], tags: ["bbq", "grill", "outdoor"], icon: MdOutdoorGrill },
  { name: "MdPets", label: "Pet Friendly Community", category: "facility", categories: ["facility", "service"], tags: ["pet", "dog", "cat", "animals", "service"], icon: MdPets },
  { name: "TbDog", label: "Dedicated Dog Park", category: "facility", tags: ["dog", "pet", "park"], icon: TbDog },
  { name: "TbBike", label: "Cycling & Bike Track", category: "facility", tags: ["bike", "cycling", "track"], icon: TbBike },
  { name: "TbRun", label: "Jogging & Walking Track", category: "facility", tags: ["run", "jogging", "walking", "fitness"], icon: TbRun },
  { name: "FaBellConcierge", label: "Concierge & Reception", category: "facility", categories: ["facility", "service"], tags: ["concierge", "reception", "hospitality", "service"], icon: FaBellConcierge },
  { name: "MdRoomService", label: "Housekeeping & Cleaning", category: "service", categories: ["service", "facility"], tags: ["housekeeping", "cleaning", "roomservice", "service"], icon: MdRoomService },
  { name: "MdLocalLaundryService", label: "Laundry & Dry Clean", category: "service", categories: ["service", "facility"], tags: ["laundry", "dryclean", "clothes", "service"], icon: MdLocalLaundryService },
  { name: "TbEye", label: "Panoramic Sea View", category: "facility", categories: ["facility", "service"], tags: ["view", "sea", "panorama", "eye"], icon: TbEye },

  // Rental Unit Amenities & Equipment
  { name: "TbToolsKitchen2", label: "Kitchen & Dining", category: "rentalAmenity", categories: ["rentalAmenity", "service"], tags: ["kitchen", "dining", "cook", "dishes"], icon: TbToolsKitchen2 },
  { name: "MdOutlineSoupKitchen", label: "Fully Equipped Kitchen", category: "rentalAmenity", tags: ["kitchen", "cooking", "appliances"], icon: MdOutlineSoupKitchen },
  { name: "TbFridge", label: "Refrigerator / Fridge", category: "rentalAmenity", tags: ["fridge", "refrigerator", "kitchen", "freezer"], icon: TbFridge },
  { name: "TbMicrowave", label: "Microwave Oven", category: "rentalAmenity", tags: ["microwave", "oven", "kitchen", "heating"], icon: TbMicrowave },
  { name: "TbCooker", label: "Stove / Cooktop / Oven", category: "rentalAmenity", tags: ["stove", "oven", "cooktop", "kitchen"], icon: TbFlame },
  { name: "TbCoffee", label: "Coffee Machine / Espresso", category: "rentalAmenity", tags: ["coffee", "espresso", "maker", "cafe"], icon: TbCoffee },
  { name: "TbTeapot", label: "Electric Kettle / Tea Maker", category: "rentalAmenity", tags: ["kettle", "tea", "hotwater", "kitchen"], icon: TbTeapot },
  { name: "TbBread", label: "Toaster / Breakfast", category: "rentalAmenity", tags: ["toaster", "bread", "breakfast", "kitchen"], icon: TbBread },
  { name: "MdOutlineBlender", label: "Blender / Food Mixer", category: "rentalAmenity", tags: ["blender", "mixer", "smoothie", "kitchen"], icon: MdOutlineBlender },
  { name: "TbWash", label: "Dishwasher Machine", category: "rentalAmenity", tags: ["dishwasher", "dishes", "cleaning", "kitchen"], icon: TbWash },
  { name: "MdOutlineTableRestaurant", label: "Dining Table & Chairs", category: "rentalAmenity", tags: ["table", "dining", "chairs", "furniture"], icon: MdOutlineTableRestaurant },
  { name: "TbGlass", label: "Wine Glasses & Drinkware", category: "rentalAmenity", tags: ["glass", "wine", "drink", "cutlery"], icon: TbGlass },
  { name: "TbBottle", label: "Shampoo & Body Wash", category: "rentalAmenity", tags: ["shampoo", "soap", "toiletries", "bathroom"], icon: TbBottle },
  { name: "TbBath", label: "Bathtub / Soaking Tub", category: "rentalAmenity", tags: ["bath", "bathtub", "bathroom", "soak"], icon: TbBath },
  { name: "MdShower", label: "Hot Rain Shower", category: "rentalAmenity", tags: ["shower", "bathroom", "water", "hotwater"], icon: MdShower },
  { name: "MdOutlineDry", label: "Hairdryer / Hand Dryer", category: "rentalAmenity", tags: ["hairdryer", "dryer", "bathroom"], icon: MdOutlineDry },
  { name: "TbIroning", label: "Iron & Ironing Board", category: "rentalAmenity", tags: ["iron", "ironing", "laundry", "clothes"], icon: TbIroning },
  { name: "TbWashMachine", label: "In-unit Washing Machine", category: "rentalAmenity", categories: ["rentalAmenity", "service"], tags: ["laundry", "washing", "appliance", "washer", "service"], icon: TbWashMachine },
  { name: "TbWashTumbleDry", label: "Clothes Dryer Machine", category: "rentalAmenity", tags: ["dryer", "laundry", "clothes", "drying"], icon: TbWashTumbleDry },
  { name: "TbHanger", label: "Wardrobe & Clothes Hangers", category: "rentalAmenity", tags: ["hanger", "closet", "wardrobe", "bedroom"], icon: TbHanger },
  { name: "TbBed", label: "King / Queen Size Bedding", category: "rentalAmenity", tags: ["bed", "linens", "pillows", "bedroom"], icon: TbBed },
  { name: "MdOutlineCurtains", label: "Room-Darkening Shades", category: "rentalAmenity", tags: ["curtains", "blackout", "shades", "sleep"], icon: MdOutlineCurtains },
  { name: "TbDesk", label: "Dedicated Workspace / Desk", category: "rentalAmenity", tags: ["desk", "workspace", "office", "laptop", "remote"], icon: TbDesk },
  { name: "TbWifi", label: "High-Speed Wi-Fi Internet", category: "rentalAmenity", tags: ["wifi", "smart", "internet", "streaming"], icon: TbWifi },
  { name: "MdTv", label: "Smart TV with Netflix", category: "rentalAmenity", tags: ["tv", "netflix", "cable", "entertainment"], icon: MdTv },
  { name: "TbKey", label: "Keyless / Smart Lock", category: "rentalAmenity", tags: ["key", "checkin", "smart", "lock", "access"], icon: TbKey },
  { name: "TbLock", label: "In-Room Security Safe", category: "rentalAmenity", tags: ["safe", "lock", "security", "valuables"], icon: TbLock },
  { name: "TbFireExtinguisher", label: "Fire Extinguisher", category: "rentalAmenity", tags: ["safety", "fire", "extinguisher", "emergency"], icon: TbFireExtinguisher },
  { name: "TbAlarmSmoke", label: "Smoke Alarm Detector", category: "rentalAmenity", tags: ["smoke", "alarm", "detector", "safety"], icon: TbAlarmSmoke },
  { name: "TbFirstAidKit", label: "First Aid Safety Kit", category: "rentalAmenity", categories: ["rentalAmenity", "service"], tags: ["medical", "safety", "firstaid", "health"], icon: TbFirstAidKit },
  { name: "TbPropeller", label: "Ceiling Fan & Air Circulation", category: "rentalAmenity", tags: ["fan", "ceiling", "air", "cooling"], icon: TbPropeller },
  { name: "TbLuggage", label: "Luggage Dropoff Allowed", category: "rentalAmenity", tags: ["luggage", "dropoff", "travel", "bags"], icon: TbLuggage },
  { name: "TbChargingPile", label: "EV Electric Vehicle Charger", category: "rentalAmenity", tags: ["ev", "charger", "electric", "car"], icon: TbChargingPile },
];

export const ICON_MAP = new Map<string, IconType>(
  ICON_REGISTRY.map((item) => [item.name.toLowerCase(), item.icon])
);

// Fallback aliases for sample data and legacy names
ICON_MAP.set("luhome", LuHouse);
ICON_MAP.set("luhouse", LuHouse);
ICON_MAP.set("lupalmtree", LuTreePalm);
ICON_MAP.set("lutreepalm", LuTreePalm);
ICON_MAP.set("luwaves", LuWaves);
ICON_MAP.set("reacticonswillbeused", MdVilla);
ICON_MAP.set("test", MdPool);
ICON_MAP.set("fa-solid fa-person-swimming", MdPool);
ICON_MAP.set("fa-solid fa-dumbbell", MdFitnessCenter);

export function resolveIcon(iconName?: string | null): IconType | null {
  if (!iconName) return null;
  const trimmed = iconName.trim().toLowerCase();
  return ICON_MAP.get(trimmed) || null;
}

export function getIconMetadata(iconName?: string | null): RegisteredIcon | null {
  if (!iconName) return null;
  const trimmed = iconName.trim().toLowerCase();
  return (
    ICON_REGISTRY.find(
      (item) => item.name.toLowerCase() === trimmed
    ) || null
  );
}

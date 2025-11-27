const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const sampleProducts = [
  // Electronics (15 items)
  {
    name: 'iPhone 14 Pro Max',
    price: 1099,
    description: 'Latest Apple flagship with Dynamic Island, A16 Bionic chip, and Pro camera system',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500',
    rating: 4.8,
    stock: 45
  },
  {
    name: 'Samsung Galaxy S23 Ultra',
    price: 1199,
    description: '200MP camera, S Pen, Snapdragon 8 Gen 2, stunning AMOLED display',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
    rating: 4.7,
    stock: 38
  },
  {
    name: 'MacBook Pro 16" M3',
    price: 2499,
    description: 'Powerful M3 chip, 16GB RAM, 512GB SSD, stunning Liquid Retina XDR display',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    rating: 4.9,
    stock: 22
  },
  {
    name: 'Sony WH-1000XM5',
    price: 399,
    description: 'Industry-leading noise cancellation, 30-hour battery, premium sound quality',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
    rating: 4.8,
    stock: 67
  },
  {
    name: 'iPad Pro 12.9" M2',
    price: 1099,
    description: 'M2 chip, Liquid Retina XDR display, Apple Pencil support, all-day battery',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    rating: 4.7,
    stock: 31
  },
  {
    name: 'Dell XPS 15',
    price: 1799,
    description: 'Intel i7, 16GB RAM, RTX 3050 Ti, InfinityEdge display, Windows 11',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
    rating: 4.6,
    stock: 18
  },
  {
    name: 'Apple Watch Series 9',
    price: 429,
    description: 'Advanced health sensors, always-on Retina display, water resistant',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
    rating: 4.7,
    stock: 54
  },
  {
    name: 'Canon EOS R6 Mark II',
    price: 2499,
    description: 'Full-frame mirrorless, 24.2MP, 4K 60fps video, dual card slots',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1606980294108-b8f5edcbbdb8?w=500',
    rating: 4.9,
    stock: 12
  },
  {
    name: 'LG OLED C3 65"',
    price: 2199,
    description: '4K OLED TV, 120Hz, Dolby Vision IQ, webOS smart platform',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
    rating: 4.8,
    stock: 8
  },
  {
    name: 'PlayStation 5',
    price: 499,
    description: 'Next-gen gaming console, 4K gaming, ultra-fast SSD, DualSense controller',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
    rating: 4.9,
    stock: 25
  },
  {
    name: 'Bose SoundLink Revolve+',
    price: 329,
    description: 'Portable Bluetooth speaker, 360° sound, 16-hour battery, water resistant',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    rating: 4.6,
    stock: 43
  },
  {
    name: 'GoPro HERO 12 Black',
    price: 399,
    description: '5.3K video, HyperSmooth 6.0, waterproof, HDR photo & video',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=500',
    rating: 4.7,
    stock: 29
  },
  {
    name: 'Samsung 34" Ultrawide Monitor',
    price: 699,
    description: 'WQHD curved display, 144Hz, HDR10, USB-C connectivity',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    rating: 4.7,
    stock: 16
  },
  {
    name: 'Kindle Paperwhite Signature',
    price: 189,
    description: '6.8" display, adjustable warm light, wireless charging, waterproof',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=500',
    rating: 4.8,
    stock: 71
  },
  {
    name: 'Logitech MX Master 3S',
    price: 99,
    description: 'Wireless mouse, ultra-precise scrolling, multi-device control, USB-C',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    rating: 4.8,
    stock: 88
  },

  // Fashion (15 items)
  {
    name: 'Levi\'s 501 Original Jeans',
    price: 89,
    description: 'Classic straight fit, button fly, durable denim, timeless style',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    rating: 4.6,
    stock: 124
  },
  {
    name: 'Nike Air Max 270',
    price: 150,
    description: 'Max Air cushioning, breathable mesh, sleek design, all-day comfort',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    rating: 4.7,
    stock: 56
  },
  {
    name: 'Adidas Originals Hoodie',
    price: 75,
    description: 'Classic trefoil logo, soft fleece, kangaroo pocket, ribbed cuffs',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    rating: 4.5,
    stock: 89
  },
  {
    name: 'Ray-Ban Aviator Sunglasses',
    price: 169,
    description: 'Iconic teardrop shape, UV protection, metal frame, multiple colors',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    rating: 4.8,
    stock: 47
  },
  {
    name: 'Tommy Hilfiger Polo Shirt',
    price: 59,
    description: 'Classic fit, soft cotton pique, signature flag logo, breathable',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500',
    rating: 4.4,
    stock: 103
  },
  {
    name: 'Zara Leather Jacket',
    price: 199,
    description: 'Genuine leather, slim fit, zippered pockets, biker style',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    rating: 4.6,
    stock: 32
  },
  {
    name: 'H&M Cotton T-Shirt 3-Pack',
    price: 29,
    description: 'Soft organic cotton, regular fit, crew neck, everyday basics',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    rating: 4.3,
    stock: 215
  },
  {
    name: 'Puma Running Shorts',
    price: 45,
    description: 'Moisture-wicking fabric, elastic waistband, zippered pocket, lightweight',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500',
    rating: 4.5,
    stock: 78
  },
  {
    name: 'Calvin Klein Boxer Briefs 3-Pack',
    price: 42,
    description: 'Stretch cotton, elastic waistband with logo, comfortable fit',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=500',
    rating: 4.7,
    stock: 156
  },
  {
    name: 'Timberland Classic Boots',
    price: 189,
    description: 'Waterproof leather, padded collar, durable rubber sole, iconic style',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500',
    rating: 4.8,
    stock: 41
  },
  {
    name: 'North Face Puffer Jacket',
    price: 249,
    description: 'Down insulation, water-resistant, adjustable hood, winter warmth',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500',
    rating: 4.7,
    stock: 35
  },
  {
    name: 'Fossil Leather Watch',
    price: 155,
    description: 'Quartz movement, genuine leather strap, minimalist design, date display',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
    rating: 4.6,
    stock: 62
  },
  {
    name: 'Coach Leather Wallet',
    price: 128,
    description: 'Full-grain leather, multiple card slots, bill compartment, signature logo',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    rating: 4.7,
    stock: 54
  },
  {
    name: 'Uniqlo Ultra Light Down Vest',
    price: 49,
    description: 'Packable design, lightweight, water-repellent, versatile layering',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=500',
    rating: 4.5,
    stock: 97
  },
  {
    name: 'Michael Kors Tote Bag',
    price: 298,
    description: 'Saffiano leather, spacious interior, top handles, detachable strap',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500',
    rating: 4.6,
    stock: 28
  },

  // Home & Kitchen (12 items)
  {
    name: 'Dyson V15 Detect Vacuum',
    price: 649,
    description: 'Laser detection, 60min runtime, HEPA filtration, cordless power',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
    rating: 4.8,
    stock: 23
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    price: 99,
    description: 'Pressure cooker, slow cooker, rice cooker, steamer, 6-quart capacity',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500',
    rating: 4.7,
    stock: 67
  },
  {
    name: 'KitchenAid Stand Mixer',
    price: 449,
    description: '5-quart bowl, 10 speeds, tilt-head design, includes attachments',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=500',
    rating: 4.9,
    stock: 34
  },
  {
    name: 'Nespresso Vertuo Plus',
    price: 179,
    description: 'One-touch brewing, 5 cup sizes, centrifusion technology, sleek design',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    rating: 4.6,
    stock: 51
  },
  {
    name: 'Breville Smart Oven Air',
    price: 399,
    description: 'Convection oven, air fryer, dehydrator, 13 cooking functions',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1584990347449-39b4aa180342?w=500',
    rating: 4.7,
    stock: 19
  },
  {
    name: 'iRobot Roomba j7+',
    price: 799,
    description: 'Self-emptying robot vacuum, smart mapping, obstacle avoidance, app control',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1586864387634-baab1087e3e8?w=500',
    rating: 4.6,
    stock: 27
  },
  {
    name: 'Philips Hue Starter Kit',
    price: 199,
    description: 'Smart LED bulbs (4-pack), hub included, voice control, millions of colors',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    rating: 4.7,
    stock: 73
  },
  {
    name: 'Cuisinart Food Processor',
    price: 199,
    description: '14-cup capacity, powerful motor, multiple blades, dishwasher safe',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1621441193099-4629e63f9da4?w=500',
    rating: 4.5,
    stock: 42
  },
  {
    name: 'Lodge Cast Iron Skillet 12"',
    price: 44,
    description: 'Pre-seasoned, even heat distribution, oven safe, lifetime durability',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1609090815467-8ca0e79cd315?w=500',
    rating: 4.8,
    stock: 118
  },
  {
    name: 'Vitamix 5200 Blender',
    price: 449,
    description: 'Professional-grade, variable speed, 64oz container, self-cleaning',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500',
    rating: 4.9,
    stock: 31
  },
  {
    name: 'Shark Navigator Lift-Away',
    price: 199,
    description: 'Upright vacuum, HEPA filter, lift-away pod, pet hair pickup',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1629716894082-a8b0b2b5b9d5?w=500',
    rating: 4.6,
    stock: 45
  },
  {
    name: 'Ninja Air Fryer Max XL',
    price: 149,
    description: '5.5-quart capacity, 450°F max temp, 7 cooking functions, easy clean',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1622806957577-b26e239cea90?w=500',
    rating: 4.7,
    stock: 58
  },

  // Books (8 items)
  {
    name: 'Atomic Habits - James Clear',
    price: 16,
    description: 'Transform your habits, master tiny changes, achieve remarkable results',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500',
    rating: 4.9,
    stock: 234
  },
  {
    name: 'The Psychology of Money',
    price: 18,
    description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500',
    rating: 4.8,
    stock: 187
  },
  {
    name: 'Project Hail Mary - Andy Weir',
    price: 22,
    description: 'Sci-fi adventure from the author of The Martian, thrilling space odyssey',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    rating: 4.7,
    stock: 142
  },
  {
    name: 'Thinking, Fast and Slow',
    price: 17,
    description: 'Daniel Kahneman explores the two systems that drive human thinking',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
    rating: 4.6,
    stock: 98
  },
  {
    name: 'The Midnight Library',
    price: 15,
    description: 'Matt Haig\'s bestseller about infinite possibilities and second chances',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500',
    rating: 4.5,
    stock: 176
  },
  {
    name: 'Sapiens - Yuval Noah Harari',
    price: 20,
    description: 'A brief history of humankind from the Stone Age to modern times',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500',
    rating: 4.8,
    stock: 156
  },
  {
    name: 'The 48 Laws of Power',
    price: 19,
    description: 'Robert Greene\'s guide to attaining and maintaining power and influence',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
    rating: 4.7,
    stock: 123
  },
  {
    name: 'Deep Work - Cal Newport',
    price: 16,
    description: 'Rules for focused success in a distracted world, productivity masterpiece',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500',
    rating: 4.6,
    stock: 201
  },

  // Sports (8 items)
  {
    name: 'Bowflex SelectTech Dumbbells',
    price: 549,
    description: 'Adjustable weights 5-52.5 lbs per dumbbell, space-saving design',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500',
    rating: 4.8,
    stock: 34
  },
  {
    name: 'Peloton Bike Basics',
    price: 1445,
    description: 'Indoor cycling bike, live & on-demand classes, compact footprint',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500',
    rating: 4.7,
    stock: 12
  },
  {
    name: 'TRX Home2 Suspension Trainer',
    price: 169,
    description: 'Total body workout system, portable, includes training guides',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
    rating: 4.6,
    stock: 67
  },
  {
    name: 'Fitbit Charge 6',
    price: 159,
    description: 'Fitness tracker, heart rate monitor, GPS, sleep tracking, 7-day battery',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
    rating: 4.5,
    stock: 89
  },
  {
    name: 'Wilson Evolution Basketball',
    price: 64,
    description: 'Official size indoor basketball, microfiber composite leather, superior grip',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=500',
    rating: 4.8,
    stock: 124
  },
  {
    name: 'Hydro Flask 32oz Water Bottle',
    price: 44,
    description: 'Insulated stainless steel, keeps cold 24 hours, leak-proof lid',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    rating: 4.7,
    stock: 203
  },
  {
    name: 'Manduka PRO Yoga Mat',
    price: 120,
    description: 'High-density cushioning, lifetime guarantee, eco-friendly, non-slip',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    rating: 4.8,
    stock: 78
  },
  {
    name: 'NordicTrack Treadmill',
    price: 1299,
    description: 'Folding design, 10% incline, iFIT compatible, 300 lb weight capacity',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500',
    rating: 4.6,
    stock: 9
  }
];

const seedProducts = async () => {
  try {
    // Delete existing products
    await Product.deleteMany({});
    console.log('🗑️  Deleted existing products');

    // Insert all products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully added ${sampleProducts.length} products!`);
    
    // Show summary by category
    const electronics = sampleProducts.filter(p => p.category === 'Electronics').length;
    const fashion = sampleProducts.filter(p => p.category === 'Fashion').length;
    const home = sampleProducts.filter(p => p.category === 'Home').length;
    const books = sampleProducts.filter(p => p.category === 'Books').length;
    const sports = sampleProducts.filter(p => p.category === 'Sports').length;
    
    console.log('\n📊 Products by Category:');
    console.log(`   📱 Electronics: ${electronics}`);
    console.log(`   👕 Fashion: ${fashion}`);
    console.log(`   🏠 Home: ${home}`);
    console.log(`   📚 Books: ${books}`);
    console.log(`   ⚽ Sports: ${sports}`);
    console.log(`   ✅ Total: ${sampleProducts.length}\n`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

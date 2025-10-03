const products = [
    {
        productId: "PROD001",
        productName: "Classic White T-Shirt",
        category: "Men",
        size: "M",
        description: "Premium cotton t-shirt with a comfortable fit, perfect for everyday wear",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
        price: 1500,
        stock: 50,
        isAvailable: true
    },
    {
        productId: "PROD002",
        productName: "Black Polo Shirt",
        category: "Men",
        size: "L",
        description: "Elegant polo shirt for casual and semi-formal occasions",
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"],
        price: 2500,
        stock: 35,
        isAvailable: true
    },
    {
        productId: "PROD003",
        productName: "Blue Denim Jeans",
        category: "Men",
        size: "L",
        description: "Comfortable slim fit jeans made from high-quality denim",
        images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"],
        price: 4500,
        stock: 40,
        isAvailable: true
    },
    {
        productId: "PROD004",
        productName: "Leather Jacket",
        category: "Men",
        size: "XL",
        description: "Premium leather jacket perfect for winter, stylish and warm",
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
        price: 12000,
        stock: 15,
        isAvailable: true
    },
    {
        productId: "PROD005",
        productName: "Red Hoodie",
        category: "Men",
        size: "M",
        description: "Warm and comfortable hoodie with kangaroo pocket",
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"],
        price: 3500,
        stock: 60,
        isAvailable: true
    },
    {
        productId: "PROD006",
        productName: "Grey Sweatpants",
        category: "Men",
        size: "L",
        description: "Perfect for workouts and lounging, made from soft fleece",
        images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500"],
        price: 2800,
        stock: 45,
        isAvailable: true
    },
    {
        productId: "PROD007",
        productName: "Formal White Shirt",
        category: "Men",
        size: "M",
        description: "Crisp white shirt for formal occasions and office wear",
        images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500"],
        price: 3200,
        stock: 30,
        isAvailable: true
    },
    {
        productId: "PROD008",
        productName: "Summer Floral Dress",
        category: "Women",
        size: "M",
        description: "Light and breezy summer dress with beautiful floral patterns",
        images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500"],
        price: 4200,
        stock: 25,
        isAvailable: true
    },
    {
        productId: "PROD009",
        productName: "Black Evening Gown",
        category: "Women",
        size: "L",
        description: "Elegant evening gown for special occasions and parties",
        images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500"],
        price: 8500,
        stock: 12,
        isAvailable: true
    },
    {
        productId: "PROD010",
        productName: "Pink Blouse",
        category: "Women",
        size: "S",
        description: "Stylish blouse for office wear and casual outings",
        images: ["https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=500"],
        price: 2900,
        stock: 40,
        isAvailable: true
    },
    {
        productId: "PROD011",
        productName: "Skinny Black Jeans",
        category: "Women",
        size: "M",
        description: "Comfortable skinny fit jeans that look great with any top",
        images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"],
        price: 3800,
        stock: 38,
        isAvailable: true
    },
    {
        productId: "PROD012",
        productName: "Winter Coat",
        category: "Women",
        size: "L",
        description: "Warm winter coat with fur lining, perfect for cold weather",
        images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500"],
        price: 11500,
        stock: 18,
        isAvailable: true
    },
    {
        productId: "PROD013",
        productName: "Yoga Pants",
        category: "Women",
        size: "M",
        description: "Stretchable pants for yoga, fitness, and everyday comfort",
        images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500"],
        price: 2500,
        stock: 55,
        isAvailable: true
    },
    {
        productId: "PROD014",
        productName: "Denim Jacket",
        category: "Women",
        size: "M",
        description: "Classic denim jacket that never goes out of style",
        images: ["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500"],
        price: 5500,
        stock: 28,
        isAvailable: true
    },
    {
        productId: "PROD015",
        productName: "Kids Cartoon T-Shirt",
        category: "Kids",
        size: "M",
        description: "Colorful t-shirt with cartoon prints that kids will love",
        images: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500"],
        price: 1200,
        stock: 70,
        isAvailable: true
    },
    {
        productId: "PROD016",
        productName: "Kids Blue Jeans",
        category: "Kids",
        size: "L",
        description: "Comfortable jeans for kids, perfect for school and play",
        images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500"],
        price: 2200,
        stock: 48,
        isAvailable: true
    },
    {
        productId: "PROD017",
        productName: "Kids Red Hoodie",
        category: "Kids",
        size: "M",
        description: "Warm hoodie for kids with fun design and soft fabric",
        images: ["https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500"],
        price: 2800,
        stock: 42,
        isAvailable: true
    },
    {
        productId: "PROD018",
        productName: "Girls Summer Dress",
        category: "Kids",
        size: "S",
        description: "Pretty dress for little girls, perfect for summer days",
        images: ["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500"],
        price: 2500,
        stock: 35,
        isAvailable: true
    },
    {
        productId: "PROD019",
        productName: "Kids Sports Shorts",
        category: "Kids",
        size: "M",
        description: "Comfortable shorts for playtime and sports activities",
        images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500"],
        price: 1500,
        stock: 60,
        isAvailable: true
    },
    {
        productId: "PROD020",
        productName: "Kids Winter Jacket",
        category: "Kids",
        size: "L",
        description: "Warm jacket for cold weather, keeps kids cozy and comfortable",
        images: ["https://images.unsplash.com/photo-1635944095210-23114a1fb7c0?w=500"],
        price: 4500,
        stock: 22,
        isAvailable: true
    },
    {
        productId: "PROD021",
        productName: "Sports Tracksuit",
        category: "Men",
        size: "L",
        description: "Complete tracksuit for sports and gym, includes jacket and pants",
        images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500"],
        price: 5500,
        stock: 32,
        isAvailable: true
    },
    {
        productId: "PROD022",
        productName: "Striped Casual Shirt",
        category: "Men",
        size: "M",
        description: "Casual striped shirt perfect for weekend outings",
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"],
        price: 2700,
        stock: 44,
        isAvailable: true
    },
    {
        productId: "PROD023",
        productName: "Women's Cardigan",
        category: "Women",
        size: "L",
        description: "Cozy cardigan perfect for layering in any season",
        images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500"],
        price: 3600,
        stock: 30,
        isAvailable: true
    },
    {
        productId: "PROD024",
        productName: "Kids Pajama Set",
        category: "Kids",
        size: "M",
        description: "Comfortable pajama set with fun prints for a good night's sleep",
        images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"],
        price: 2000,
        stock: 50,
        isAvailable: true
    },
    {
        productId: "PROD025",
        productName: "Men's Cargo Shorts",
        category: "Men",
        size: "L",
        description: "Practical cargo shorts with multiple pockets for summer",
        images: ["https://images.unsplash.com/photo-1591195120717-6630aad85312?w=500"],
        price: 3200,
        stock: 38,
        isAvailable: true
    }
];

export default products;
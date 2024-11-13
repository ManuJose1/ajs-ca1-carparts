require('dotenv').config();
const { connect, disconnect } = require('../utils/db');
const User = require('../models/user.model');
const Part = require('../models/part.model');
const Location = require('../models/location.model');

const users = [
    {
        full_name:'Manu Jose',
        email:'admin@email.com',
        password: bcrypt.hashSync("Secret123", 10),
    },
    {
        full_name:'Jon Jones',
        email:'jon@email.com',
        password: bcrypt.hashSync("Secret123", 10),
    }

];

const parts = [
    {
        title:'Brembo Front Brake Pads',
        price:32.99,
        description:'Full set of front axle brake pads  by Brembo',
        category:'Brakes',
        subcategory:'Front Brake Pads'
    },
    {
        title:'Brembo Rear Brake Pads',
        price:24.99,
        description:'Full set of rear axle brake pads  by Brembo',
        category:'Brakes',
        subcategory:'Rear Brake Pads'
    },
    {
        title:'Castrol 5W30 Engine Oil - 5L',
        price:44.99,
        description:'Castrol 5W30 fully synthetic engine oil - 5 litres',
        category:'Service Parts',
        subcategory:'Engine Oil'
    },
    {
        title:'KYB Rear Shock Absorber',
        price:58.99,
        description:'Single KYB shock absorber for rear axle',
        category:'Suspension',
        subcategory:'Shock Absorbers'
    },
    {
        title:'KYB Front Shock Absorber',
        price:84.99,
        description:'Single KYB shock absorber for front axl',
        category:'Suspension',
        subcategory:'Shock Absorbers'
    },
    {
        title:'Bosch Spark Plug',
        price:5.99,
        description:'Single spark plug by Bosch',
        category:'Service Parts',
        subcategory:'Spark Plug'
    },
];

const locations = [
    {
        title:"Joe's Car Parts",
        address:'11 Ross Road, Ashford, Co. Wicklow',
        email:'support@joescars.ie',
        phone:'01 4549462',
     //   part:
    },
    {
        title:"EastCoast Mechanics",
        address:'24 Bray Business Park, Bray, Co. Wicklow',
        email:'info@ecoastmech.org',
        phone:'01 ',
      //  part:
    },
]

let seedDB = async () => {
    await connect();
    await User.deleteMany();
    await Part.deleteMany();
    await Location.deleteMany();

    await User.insertMany(users);
    await Part.insertMany(parts);
    await Location.insertMany(locations)
};

seedDB().then(() => {
    console.log('Operation successfull!');
    disconnect();
});

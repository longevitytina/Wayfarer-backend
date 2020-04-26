require("dotenv").config();
const db = require("./models");
// const bcrypt = require("bcrypt");

// const hash = (passwd) => {
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       console.log(err);
//     }
//     // Hash the user's password using the salt that was generated
//     bcrypt.hash(passwd, salt, (err, hash) => {
//       if (err) {
//         console.log(err);
//       }
//       return hash;
//     });
//   });
// }

const users = [
  {
    name: "Bob",
    email: "bob@gmail.com",
    city: "San Francisco",
    password: "123456789",
    // pic: 'https://images.unsplash.com/photo-1563302628-6d8ad9cdbcf5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300'
  },
  {
    name: "Daphne",
    email: "daphne@gmail.com",
    city: "San Francisco",
    password: "123456789",
    // pic: 'https://images.unsplash.com/photo-1579034628318-b14c8ab399a9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300'
  },
  {
    name: "Jo",
    email: "jo@gmail.com",
    city: "Paris",
    password: "123456789",
    // pic: 'https://images.unsplash.com/photo-1541112324160-e8a425b58dac?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300'
  },
  {
    name: "Uneeq",
    email: "uneeq@gmail.com",
    city: "San Francisco",
    password: "123456789",
    // pic: 'https://images.unsplash.com/photo-1559024922-9ade05850615?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300'
  },
  {
    name: "Hamza",
    email: "hamza@hotmail.com",
    city: "Seattle",
    password: "123456789",
    // pic: 'https://images.unsplash.com/photo-1555620535-58093c34ea13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300'
  },
];

// https://source.unsplash.com/300x300/?place

const posts = [
  {
    title: "Easter is there",
    body: [
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
      "Duis magna sit aliquip aliqua velit elit exercitation velit elit veniam. Mollit officia dolor proident incididunt nisi. Sit reprehenderit occaecat pariatur elit eiusmod est consectetur enim dolor aute proident officia voluptate. Sit in amet eiusmod minim ipsum esse exercitation sit cupidatat ullamco dolore et cupidatat nisi. Anim ut amet anim est amet consectetur ad cillum dolore excepteur aliquip cupidatat. Ullamco non minim culpa est nostrud ex ad non.",
      "Pariatur nisi magna veniam occaecat sit elit eiusmod ad veniam enim et in anim. Est mollit fugiat adipisicing est esse reprehenderit reprehenderit qui elit aliqua ullamco. Veniam dolore eiusmod ipsum dolore. Quis labore nostrud consectetur nulla anim dolor sint tempor eu.",
      "Tempor excepteur est cillum consectetur dolor officia elit cillum veniam minim culpa do. Pariatur occaecat cillum nostrud enim ea laborum veniam sit dolore eiusmod nisi amet ex. Sit dolor ad ipsum et adipisicing et aliquip dolor deserunt. Anim incididunt nisi consequat cillum sit adipisicing elit eiusmod. Eiusmod voluptate veniam ea adipisicing enim consectetur esse veniam duis dolor incididunt labore deserunt deserunt. Laborum mollit do ad dolore. Culpa pariatur laboris proident laboris.",
    ],
    image:
      "https://images.unsplash.com/photo-1543153694-4a27d3bfeca6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Snowy times",
    body: [
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
      "Fugiat cupidatat dolor minim et sunt. Dolor culpa velit ex veniam amet. Aliquip non laboris voluptate laborum. Sit enim duis laboris magna id nulla consectetur esse qui duis. Mollit proident culpa adipisicing veniam commodo sint ex aliqua reprehenderit laborum in id aute Lorem. Cillum consequat quis nulla elit enim et occaecat ipsum exercitation nulla ea adipisicing.",
      "Exercitation elit ullamco ut excepteur enim dolore eu commodo anim laboris sint magna nulla mollit. Ut ipsum laboris eiusmod nulla tempor mollit. Aliquip ad est non eiusmod esse non tempor. Esse sint proident incididunt nisi in mollit dolore sunt Lorem ut laboris incididunt dolor.",
      "Ea exercitation esse enim laborum minim. Labore commodo duis proident labore exercitation dolor mollit fugiat quis ad labore amet occaecat nostrud. Consectetur mollit sunt ipsum do veniam eu proident. Culpa nulla velit do ipsum.",
    ],
    image:
      "https://images.unsplash.com/photo-1515466579786-f8000c1b0998?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Florian cafe",
    body: [
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
      "Nisi laborum ipsum velit voluptate ipsum pariatur proident elit proident aute qui et. Nisi adipisicing elit voluptate exercitation in. Deserunt laborum mollit anim ad officia. In mollit incididunt laboris minim.",
      "Tempor tempor excepteur minim ad. Commodo voluptate officia do eiusmod anim pariatur velit consequat consequat. Irure ex qui Lorem fugiat consectetur sint duis ut. Reprehenderit minim id cillum reprehenderit eiusmod consectetur non nulla nulla reprehenderit Lorem minim irure aute.",
      "Reprehenderit nisi pariatur sunt amet cillum voluptate consectetur proident nostrud aliqua fugiat Lorem. Fugiat laborum ad veniam minim aute sint nisi et sit labore incididunt. Esse ut ullamco laboris laboris consequat. Nulla ea cupidatat consequat est Lorem sint. Occaecat est anim velit qui voluptate pariatur excepteur ullamco amet proident fugiat sit nisi.",
    ],
    image:
      "https://images.unsplash.com/photo-1572732952263-11da8c4b06c9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Lake like",
    body: [
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
      "Voluptate aliquip ad labore culpa aliquip irure cillum laboris consequat reprehenderit culpa cillum. Dolore eu in elit cillum voluptate cillum sint ad reprehenderit elit ad deserunt aliquip Lorem. Ea aliquip mollit eiusmod sunt irure. Nulla qui exercitation amet ad nostrud fugiat Lorem in quis non ea laborum.",
      "Aute labore ea consequat eu id laborum nulla Lorem. Magna duis ut mollit aliqua ullamco eu proident cupidatat enim aliquip. Sunt et incididunt deserunt culpa velit ipsum aute qui. Commodo ex eu id adipisicing laborum cillum ad ad exercitation consectetur elit eu. Et qui irure irure dolore ipsum irure duis eu commodo enim sint. Deserunt commodo minim dolore do id non occaecat irure ullamco pariatur ipsum dolor et consequat.",
      "Sit ut sint sit tempor nostrud ut enim sint aliquip. Enim ad anim dolore non aliqua amet do eu sint. Consequat amet exercitation enim magna commodo anim aliqua incididunt eiusmod qui. Mollit aute dolor ad ipsum consequat. Velit veniam officia exercitation magna anim do nisi aute laboris magna eiusmod. Sunt eu non ullamco qui ipsum adipisicing est. Ullamco minim sit adipisicing eu minim officia mollit veniam.",
    ],
    image:
      "https://images.unsplash.com/photo-1500468228039-a1769cf9cb41?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Street cafe",
    body: [
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
      "Incididunt irure qui ullamco reprehenderit consectetur duis veniam ea ad ut tempor officia nulla. Do consectetur ut ad esse esse. Sunt aliqua esse excepteur veniam elit labore ut anim.",
      "Culpa Lorem ex fugiat ut aliqua. Deserunt dolor in minim commodo cillum aliqua voluptate. Culpa qui voluptate aute dolor magna esse consequat ullamco ex aliquip fugiat exercitation esse. Velit enim eu esse excepteur proident. Elit ex ut ut occaecat ad irure nisi ea proident adipisicing sit.",
      "Ut ullamco irure aliqua excepteur eu aliquip excepteur dolor anim. Dolore ad proident ipsum ad labore tempor minim. Consectetur quis quis consequat et nisi eu.",
    ],
    image:
      "https://images.unsplash.com/photo-1495562569060-2eec283d3391?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Pagoda surprise",
    body: [
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
      "Laboris ex ut adipisicing incididunt ut tempor sit fugiat Lorem. Sint sit qui elit consectetur consectetur adipisicing quis Lorem reprehenderit id in sit. Reprehenderit officia nisi id sit eu magna non dolore pariatur excepteur. Magna quis magna ut nostrud consequat exercitation consectetur exercitation occaecat minim irure Lorem.",
      "Sunt ut aliqua duis commodo. Incididunt ut amet ut enim aliquip deserunt velit ullamco ad. Amet consequat adipisicing voluptate Lorem mollit occaecat officia magna elit commodo aute duis ullamco magna. Mollit exercitation ut officia commodo aute sunt ad officia non. Nulla consectetur sint anim amet proident dolore. Anim enim fugiat ex fugiat consequat id voluptate velit exercitation nostrud. Laboris commodo ut quis ex eu dolor Lorem in deserunt ut ad.",
      "Elit tempor et deserunt nulla aute anim quis excepteur ea esse non minim exercitation. Amet ad quis magna reprehenderit in dolore ad ut magna sit cupidatat voluptate amet dolor. Voluptate proident ullamco labore laboris eu ex.",
    ],
    image:
      "https://images.unsplash.com/photo-1580651316320-a8fd7e199e9c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Crop circles",
    body: [
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
      "Ex ex cupidatat labore sit incididunt cupidatat voluptate reprehenderit pariatur labore irure esse pariatur officia. Id mollit occaecat irure veniam amet pariatur deserunt consequat ut ad amet id dolore. Exercitation et ex laboris ullamco. Sunt officia officia non in consectetur exercitation. Commodo dolor id non esse laboris veniam elit elit adipisicing. Occaecat enim est Lorem dolor Lorem deserunt velit voluptate ex. Aliquip aute consequat qui ut eu.",
      "Esse eu incididunt ad aliqua fugiat aliquip amet nulla ad culpa. Dolor sunt commodo adipisicing est sunt nulla qui est cupidatat. Est exercitation do aliqua sint aliqua ipsum. Ad ullamco pariatur anim nisi ullamco ullamco ut.",
      "Occaecat voluptate anim consectetur ex incididunt. Non amet cillum duis Lorem sit aliqua irure cillum. Aute qui non elit consequat dolore incididunt et qui veniam eiusmod. Occaecat exercitation cupidatat amet sunt aliquip commodo consectetur consectetur do do deserunt cupidatat dolore do. Tempor aliqua velit excepteur esse elit quis labore occaecat occaecat eiusmod. Consequat tempor incididunt qui consequat nostrud irure nisi aute. Occaecat ex irure excepteur eiusmod proident.",
    ],
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Pub expo",
    body: [
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
      "Anim sint exercitation fugiat nisi tempor non laboris aute cupidatat exercitation est cillum. Anim cillum non nostrud aute velit est officia quis dolore velit ut incididunt do et. Occaecat elit fugiat irure mollit exercitation qui voluptate sint nulla. Mollit est elit velit proident aliquip labore officia pariatur nisi esse nostrud et velit aliqua.",
      "Dolor ipsum id mollit ad sint dolor in duis labore cupidatat amet. Aliquip nostrud non ad excepteur est ad sint cillum est excepteur culpa cupidatat consequat. Commodo et in incididunt incididunt dolore mollit sit duis. Minim cillum nostrud labore fugiat aliquip minim amet exercitation laborum magna enim fugiat. Nostrud do magna deserunt sit eiusmod dolore aute aliqua. Id in excepteur in est veniam excepteur deserunt laborum occaecat exercitation consequat deserunt.",
      "Nostrud duis occaecat nostrud magna aliqua id officia qui ex excepteur Lorem laborum. Do ad labore adipisicing ad ad quis adipisicing et commodo adipisicing. Elit incididunt in labore labore est id nostrud labore officia officia duis anim eu adipisicing.",
    ],
    image:
      "https://images.unsplash.com/photo-1582559934353-2e47140e7501?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Balconies and other architectural marvels",
    body: [
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
      "Fugiat reprehenderit elit aliqua officia reprehenderit consequat duis voluptate dolor. Labore pariatur duis proident cillum ea ut occaecat anim irure. Do reprehenderit non dolor nisi id. Ipsum voluptate id aliqua consequat commodo culpa fugiat occaecat velit. Ut veniam laborum est voluptate.",
      "Sunt non aute ut velit id ex tempor est fugiat incididunt. Fugiat anim reprehenderit eiusmod elit culpa consequat. Do minim cillum anim veniam fugiat ullamco enim consectetur enim in. Cupidatat in quis veniam cillum quis.",
      "Quis tempor cillum est minim incididunt esse eu eiusmod. Dolor do pariatur id laboris. Ipsum commodo adipisicing pariatur reprehenderit esse irure eiusmod eu et ullamco aute. Minim quis anim proident laborum non esse ut sint nisi adipisicing. Pariatur irure cillum dolore adipisicing eiusmod amet velit eiusmod voluptate. Voluptate deserunt qui cillum voluptate aliqua ad nulla culpa duis enim laborum in velit dolor. Magna mollit amet commodo do ad aute cupidatat.",
    ],
    image:
      "https://images.unsplash.com/photo-1522415826258-b1ba87e6b55d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Nope rope",
    body: [
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
      "Nulla esse qui magna ex. Ad Lorem ex ad nostrud nisi adipisicing Lorem cillum velit velit aute cupidatat aliquip. Voluptate ullamco labore commodo velit incididunt laboris adipisicing est eu consectetur. Minim ex qui ea aliqua exercitation voluptate amet. Esse nostrud nulla proident sit nostrud do sint commodo tempor dolor enim magna enim ea. Incididunt cupidatat ipsum cupidatat eu velit do ad tempor irure velit. Ipsum cupidatat cillum Lorem duis ea cillum consequat commodo.",
      "Eiusmod laborum adipisicing cupidatat pariatur ipsum excepteur sit labore est ipsum. Minim proident nisi laborum minim voluptate enim consequat aliquip amet fugiat ullamco esse excepteur. Esse tempor nisi veniam fugiat.",
      "Excepteur laboris velit non non non consectetur. Laboris deserunt minim sint nostrud. Proident nostrud fugiat excepteur sit esse id. Cillum quis aute laborum eu tempor laborum proident cillum. Consectetur ad aliqua ipsum enim aute deserunt Lorem commodo in. Minim sunt ullamco pariatur laboris veniam. Aute pariatur mollit irure reprehenderit aliquip cupidatat deserunt esse qui commodo esse.",
    ],
    image:
      "https://images.unsplash.com/photo-1512619876244-02d219b93818?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
];

// https://source.unsplash.com/600x300/?city

const cities = [
  {
    name: "Bangkok",
    country: "Thailand",
    image:
      "https://images.unsplash.com/photo-1546342279-0a2e8682110e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=600",
  },
  {
    name: "San Francisco",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1510608017596-61fac35cc312?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=600",
  },
  {
    name: "Las Vegas",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1526442698070-bbe142c3531d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=600",
  },
  {
    name: "London",
    country: "UK",
    image:
      "https://images.unsplash.com/photo-1519863528809-9a44cbc3f1f4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=600",
  },
  {
    name: "Singapore",
    country: "Singapore",
    image:
      "https://images.unsplash.com/photo-1577743401035-5cd175264d9f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=600",
  },
];

db.City.deleteMany({}, (err, dCities) => {
  if (err) return console.error(err);
  console.log(`Deleted ${dCities.deletedCount} cities.`);
  db.City.create(cities, (err, newCities) => {
    if (err) return console.error(err);
    // db.User.deleteMany({}, (err, dUsers) => {
    //   if (err) return console.error(err);
    //   console.log(`Deleted ${dUsers.deletedCount} users.`);
    //   db.User.create(users, (err, newUsers) => {
    // for (let user of newUsers) {
    //   console.log(user.password);
    //   bcrypt.hash(user.password, 10, async (err, hash) => {
    //     console.log(hash);
    //     user.password = hash;
    //     user.save();
    //   })
    //   await user.save();
    // }
    db.Post.deleteMany({}, (err, dPosts) => {
      // console.log(newUsers);
      if (err) return console.error(err);
      console.log(`Deleted ${dPosts.deletedCount} posts.`);
      db.Post.create(posts, (err, newPosts) => {
        // console.log(newUsers);
        for (let n = 0; n < cities.length; n++) {
          newPosts[n * 2].city = newCities[n]._id;
          newPosts[n * 2].author = "5ea257bb85264b285e0934b4";
          newPosts[n * 2].save();
          newPosts[n * 2 + 1].city = newCities[n]._id;
          newPosts[n * 2 + 1].author = "5ea257bb85264b285e0934b4";
          newPosts[n * 2 + 1].save();
          // newUsers[n].save();
        }
        console.log(
          `Created ${newCities.length} cities, 0 users, ${newPosts.length} posts.`
        );
        // console.log(newUsers);
      });
    });
    // })
    // })
  });
});

// db.Problem.deleteMany({})
//   .then((_result) => db.Solution.deleteMany())
//   .then(() => db.Solution.create(solutions))
//   .then(() =>
//     // return a Promise.all
//     Promise.all(
//       // takes an array of promises
//       // callback of map returns a promise
//       problems.map((problem) =>
//         db.Solution.find({ name: problem.solutionNames }).then((results) => {
//           problem.properties.solutions = results
//           return db.Problem.create(problem.properties)
//         })
//       )
//     )
//   )
//   .then((createdProblems) => {
//     console.log(createdProblems)
//     process.exit()
//   })

// 2. run node seed in terminal to clear & seed database

// 3. Ctrl + c in terminal to exit node shell once database is seeded

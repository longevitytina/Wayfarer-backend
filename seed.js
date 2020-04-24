require("dotenv").config();
const db = require("./models");
const bcrypt = require("bcrypt");

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
    title: "Easter",
    body:
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
    image:
      "https://images.unsplash.com/photo-1543153694-4a27d3bfeca6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Snowy times",
    body:
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
    image:
      "https://images.unsplash.com/photo-1515466579786-f8000c1b0998?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Florian",
    body:
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
    image:
      "https://images.unsplash.com/photo-1572732952263-11da8c4b06c9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Lake",
    body:
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
    image:
      "https://images.unsplash.com/photo-1500468228039-a1769cf9cb41?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Street cafe",
    body:
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
    image:
      "https://images.unsplash.com/photo-1495562569060-2eec283d3391?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Pagoda",
    body:
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
    image:
      "https://images.unsplash.com/photo-1580651316320-a8fd7e199e9c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Crop circles",
    body:
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Pub expo",
    body:
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
    image:
      "https://images.unsplash.com/photo-1582559934353-2e47140e7501?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Balconies",
    body:
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
    image:
      "https://images.unsplash.com/photo-1522415826258-b1ba87e6b55d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300",
  },
  {
    title: "Nope rope",
    body:
      "Adipisicing adipisicing culpa amet veniam est sint. Esse enim nostrud sint ad voluptate qui. Sit proident incididunt in aliquip irure sunt cupidatat exercitation dolore quis.",
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
    name: "Seattle",
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
    db.User.deleteMany({}, (err, dUsers) => {
      if (err) return console.error(err);
      console.log(`Deleted ${dUsers.deletedCount} users.`);
      db.User.create(users, (err, newUsers) => {
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
          db.Post.create(posts, async (err, newPosts) => {
            // console.log(newUsers);
            for (let n=0; n<users.length; n++) {
              newPosts[n*2].city = newCities[n]._id;
              newPosts[n*2].author = newUsers[n]._id;
              newPosts[n*2].save();
              newPosts[n*2+1].city = newCities[n]._id;
              newPosts[n*2+1].author = newUsers[n]._id;
              newPosts[n*2+1].save();
              // newUsers[n].save();
            }
            console.log(`Created ${newCities.length} cities, ${newUsers.length} users, ${newPosts.length} posts.`);
            // console.log(newUsers);
            
          })
        })
      })
    })
  });
})


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


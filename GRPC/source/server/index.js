const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");

// Parsing proto file
const packageDefinition = protoLoader.loadSync("./demo.proto");

// Loading file
const carProto = grpc.loadPackageDefinition(packageDefinition);

const CARS = [
  { id: 1, name: "car1", price: 100000 },
  { id: 2, name: "car2", price: 200000 },
];

// Server instance
const server = new grpc.Server();

// getting all handlers and mapping functions
server.addService(carProto.carPriceSerice.service, {
  getCarbyId: getCarbyId,
  AddCars: AddCars,
});

function getCarbyId(call, callback) {
  console.log(`invoked: getCarbyId`);
  const { id } = call.request;
  const car = CARS.find((x) => x.id === id);
  callback(null, car);
}

function AddCars(call, callback) {
  console.log(`invoked: AddCars`);
  const { name, price } = call.request;
  const car = { id: CARS.length + 1, name: name, price: price };
  CARS.push(car);
  callback(null, car);
}

// Starting server
const PORT = "127.0.0.1:50531";
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.log(err);
    return;
  }
  server.start();
  console.log(`server is listening on ${PORT}`);
});

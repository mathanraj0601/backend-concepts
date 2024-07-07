const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");

const packageDefinition = protoLoader.loadSync("./demo.proto");

const carProto = grpc.loadPackageDefinition(packageDefinition).carPriceSerice;

const URL = "127.0.0.1:50531";
const client = new carProto(URL, grpc.credentials.createInsecure());

client.getCarbyId({ id: 1 }, (error, car) => {
  if (error) {
    console.log(error, "error");
  }
  console.log(car);
});

client.AddCars({ id: 1, name: "car3", price: 1222222 }, (error, car) => {
  if (error) {
    console.log(error, "error");
  }
  console.log(car);
});

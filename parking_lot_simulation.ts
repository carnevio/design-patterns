import { ParkingLot, Subscriber, ParkingLotEvent } from "./parking_lot.ts";

const maxFillIntervalMillis = 1000;
const maxEmptyIntervalMillis = 2000;
const initialFillPhaseMillis = 5000;

const sleep = (millis: number) => new Promise((r) => setTimeout(r, millis));

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1));

// Display as Subscriber
class Display implements Subscriber {
  update(event: ParkingLotEvent): void {
    const action = event.type === "entered" ? "A car entered" : "A car left";
    console.log(`${action} the lot ${event.name}: ${event.occupied}/${event.capacity} occupied.`);
  }
}

const fill = async (lot: ParkingLot) => {
  while (!lot.isFull()) {
    await sleep(rand(0, maxFillIntervalMillis));
    lot.enter();
  }
};

const empty = async (lot: ParkingLot) => {
  while (!lot.isEmpty()) {
    await sleep(rand(0, maxEmptyIntervalMillis));
    lot.exit();
  }
};

const bahnhofParking = new ParkingLot("Bahnhof Parking", 100);
const display = new Display();
bahnhofParking.subscribe(display);

const filler = fill(bahnhofParking);
await sleep(initialFillPhaseMillis);
const emptier = empty(bahnhofParking);
await filler;
await emptier;

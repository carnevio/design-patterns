export class ParkingLot {
  public occupied: number = 0;

  constructor(
    public name: string,
    public capacity: number,
  ) {}

  enter() {
    if (!this.isFull()) {
      this.occupied++;
    } else {
      throw new Error(`the parking lot is full`);
    }
  }

  exit() {
    if (!this.isEmpty()) {
      this.occupied--;
    } else {
      throw new Error(`the parking lot is empty`);
    }
  }

  isFull() {
    return this.occupied == this.capacity;
  }

  isEmpty() {
    return this.occupied == 0;
  }
}

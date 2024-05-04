class App {
    constructor() {
      this.loadButton = document.getElementById("load-btn");
      this.carContainerElement = document.getElementById("cars-container");
    }
  
    run = async () => {
      this.driverTypeSelect = document.getElementById("driver-type");
      this.dateInput = document.getElementById("date-input");
      this.pickupTimeSelect = document.getElementById("pickup-time");
      this.passengerCountInput = document.getElementById("passenger-count");
  
      const driverType = this.driverTypeSelect.value;
      const date = this.dateInput.value;
      const pickupTime = this.pickupTimeSelect.value;
      let passengerCount = this.passengerCountInput.value;
  
      if (passengerCount === "") passengerCount = 0;
  
      this.carContainerElement.classList.remove("hidden");
  
      this.carContainerElement.innerHTML = "";
  
      await this.load(date,pickupTime,passengerCount,driverType);
  
      Car.list.forEach((car) => {
        const node = document.createElement("div");
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    };
  
    async load(date,pickupTime,passengerCount,driverType) {
      const dateTime = new Date(`${date}T${pickupTime}`);
      const cars = await Binar.listCars(car =>
        car.available &&
        car.availableAt > dateTime &&
        car.capacity >= passengerCount &&
        car.typeDriver === driverType
      );
      Car.init(cars);
    }
  }
  
  const app = new App();
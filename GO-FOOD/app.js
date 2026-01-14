// Data Storage (menggunakan variabel global sebagai pengganti localStorage)
const appData = {
  currentUser: null,
  cart: [],
  selectedDriver: null,
  orders: [],
  drivers: []
};

// Food Menu Data
const foodMenu = [
  { name: "Nasi Goreng", price: 15000 },
  { name: "Mie Ayam", price: 13000 },
  { name: "Ayam Geprek", price: 18000 },
  { name: "Bakso", price: 15000 },
  { name: "Sate Ayam", price: 20000 },
  { name: "Burger", price: 22000 },
  { name: "Pizza", price: 30000 },
  { name: "Seblak", price: 12000 },
  { name: "Dimsum", price: 18000 },
  { name: "Soto Ayam", price: 16000 },
  { name: "Es Teh", price: 5000 },
  { name: "Kopi", price: 12000 },
  { name: "Jus Jeruk", price: 14000 },
  { name: "Milk Tea", price: 15000 },
  { name: "Donat", price: 6000 },
  { name: "Martabak", price: 25000 },
  { name: "Roti Bakar", price: 12000 },
  { name: "Spaghetti", price: 28000 },
  { name: "Kebab", price: 17000 },
  { name: "Salad", price: 20000 }
];

// Generate 40 Drivers dengan kompensasi
function generateDrivers() {
  if (appData.drivers.length === 0) {
    for (let i = 1; i <= 40; i++) {
      appData.drivers.push({
        id: i,
        name: `Driver ${i}`,
        isActive: Math.random() > 0.3, // 70% aktif
        totalEarnings: 0,
        totalOrders: 0,
        orderHistory: []
      });
    }
  }
  return appData.drivers;
}

// Hitung kompensasi driver (15% dari total pesanan)
function calculateDriverFee(orderTotal) {
  return Math.round(orderTotal * 0.15);
}

// Login Function
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (username === 'user' && password === '123') {
    appData.currentUser = username;
    window.location.href = 'order.html';
  } else {
    alert('❌ Username atau password salah!\n\nGunakan:\nUsername: user\nPassword: 123');
  }
}

// Logout Function
function logout() {
  if (confirm('Yakin ingin logout?')) {
    window.location.href = 'index.html';
  }
}

// Save Order
function saveOrder(orderData) {
  const driverFee = calculateDriverFee(orderData.total);
  
  const order = {
    id: appData.orders.length + 1,
    customer: appData.currentUser || 'user',
    driver: orderData.driver,
    items: orderData.items,
    total: orderData.total,
    driverFee: driverFee,
    timestamp: new Date().toLocaleString('id-ID')
  };
  
  appData.orders.push(order);
  
  // Update driver earnings
  const driver = appData.drivers.find(d => d.name === orderData.driver);
  if (driver) {
    driver.totalEarnings += driverFee;
    driver.totalOrders += 1;
    driver.orderHistory.push(order);
  }
  
  return order;
}

// Get Last Order
function getLastOrder() {
  return appData.orders[appData.orders.length - 1];
}

// Get All Orders
function getAllOrders() {
  return appData.orders;
}

// Get Driver Data
function getDriverData() {
  return appData.drivers.filter(d => d.totalOrders > 0);
}
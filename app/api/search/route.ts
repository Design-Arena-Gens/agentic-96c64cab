import { NextResponse } from 'next/server'

interface WashingMachine {
  name: string
  price: number
  site: string
  url: string
  image?: string
}

// Mock data simulating results from various Indian e-commerce sites
// In production, this would scrape real data from Amazon.in, Flipkart, etc.
const getMockWashingMachines = (): WashingMachine[] => {
  const machines: WashingMachine[] = [
    {
      name: 'Samsung 9 Kg 5 Star Inverter Fully Automatic Front Load with In-built Heater',
      price: 28990,
      site: 'Amazon',
      url: 'https://www.amazon.in/s?k=9kg+inverter+washing+machine',
      image: 'https://m.media-amazon.com/images/I/71TuZVu9ZEL._SX679_.jpg'
    },
    {
      name: 'LG 9 Kg 5 Star Inverter Direct Drive Fully Automatic Front Load',
      price: 32490,
      site: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=9kg+inverter+washing+machine',
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/washing-machine-new/4/d/g/-original-imagz8qzhuzckgyf.jpeg'
    },
    {
      name: 'Bosch 9 kg 5 Star Inverter Fully Automatic Front Load with In-built Heater',
      price: 35990,
      site: 'Amazon',
      url: 'https://www.amazon.in/s?k=9kg+inverter+washing+machine',
      image: 'https://m.media-amazon.com/images/I/71kYL9kOdjL._SX679_.jpg'
    },
    {
      name: 'IFB 9 Kg 5 Star AI Powered Fully Automatic Front Load Washing Machine',
      price: 31990,
      site: 'Reliance Digital',
      url: 'https://www.reliancedigital.in/search?q=9kg%20inverter%20washing%20machine',
      image: 'https://www.ifbappliances.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/x/executive_plus_vx_id_9_kg_1400_rpm_fully_automatic_front_load_washing_machine_-_mocha_-_1.jpg'
    },
    {
      name: 'Whirlpool 9 Kg 5 Star Royal Plus Fully Automatic Front Load',
      price: 29990,
      site: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=9kg+inverter+washing+machine',
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/washing-machine-new/a/h/g/-original-imagvgf4xhgzanhy.jpeg'
    },
    {
      name: 'Haier 9 Kg 5 Star Inverter Fully Automatic Front Load',
      price: 27990,
      site: 'Amazon',
      url: 'https://www.amazon.in/s?k=9kg+inverter+washing+machine',
      image: 'https://m.media-amazon.com/images/I/61YUWs6qKiL._SX679_.jpg'
    },
    {
      name: 'Godrej 9 Kg 5 Star Fully Automatic Front Load with In-built Heater',
      price: 30490,
      site: 'Croma',
      url: 'https://www.croma.com/search/?q=9kg%20inverter%20washing%20machine',
      image: 'https://media.croma.com/image/upload/v1694672676/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/301896_0_vvklxr.png'
    },
    {
      name: 'Panasonic 9 Kg 5 Star Inverter Fully Automatic Front Load',
      price: 33490,
      site: 'Vijay Sales',
      url: 'https://www.vijaysales.com/search/9kg%20inverter%20washing%20machine',
      image: 'https://www.panasonic.com/content/dam/panasonic/in/en/products/home-appliances/washing-machines/front-load/na-127xb1/NA-127XB1W01_1.png'
    },
    {
      name: 'Voltas Beko 9 Kg ProSmart Inverter Fully Automatic Front Load',
      price: 26990,
      site: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=9kg+inverter+washing+machine',
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/washing-machine-new/n/p/w/-original-imaghhfyzmgwyzgc.jpeg'
    },
    {
      name: 'MarQ by Flipkart 9 Kg 5 Star Inverter Fully Automatic Front Load',
      price: 24990,
      site: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=9kg+inverter+washing+machine',
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/washing-machine-new/l/x/c/-original-imagqznghhzhhzkf.jpeg'
    },
    {
      name: 'Siemens 9 Kg 5 Star iQ300 Fully Automatic Front Load',
      price: 39990,
      site: 'Amazon',
      url: 'https://www.amazon.in/s?k=9kg+inverter+washing+machine',
      image: 'https://m.media-amazon.com/images/I/51xGYdqWCxL._SX679_.jpg'
    },
    {
      name: 'Midea 9 Kg 5 Star Inverter Fully Automatic Front Load',
      price: 25990,
      site: 'Amazon',
      url: 'https://www.amazon.in/s?k=9kg+inverter+washing+machine',
      image: 'https://m.media-amazon.com/images/I/61AXY2w5V7L._SX679_.jpg'
    }
  ]

  // Sort by price (lowest first)
  return machines.sort((a, b) => a.price - b.price)
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function GET() {
  try {
    // Simulate network delay for realistic feel
    await delay(1500)

    const machines = getMockWashingMachines()

    return NextResponse.json({
      success: true,
      machines,
      count: machines.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching washing machines:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch washing machine data',
        machines: []
      },
      { status: 500 }
    )
  }
}

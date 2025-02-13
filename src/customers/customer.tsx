import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const menuItems = [
  {
    id: 1,
    name: "Food Name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    price: "$300.00",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Food Name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    price: "$300.00",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Food Name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    price: "$300.00",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Food Name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    price: "$300.00",
    image: "https://via.placeholder.com/100",
  },
];

const Customer = () => {
  return (
    <div className=" text-white">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <Input
          type="text"
          placeholder="Search menu items"
          className="w-full sm:w-2/3 md:w-1/2 text-white"
        />
        <Button variant="ghost" className="ml-2 p-2">
          <span className="text-white">☰</span>
        </Button>
      </div>

      {/* Menu List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="rounded-lg p-4 flex items-start">
            <CardContent className="p-0">
              <div className="flex space-x-4">
                <img
                  src="https://plus.unsplash.com/premium_photo-1668616815139-3773564f22f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2QlMjB2ZWclMjBhbmQlMjBub24lMjB2ZWd8ZW58MHx8MHx8fDA%3D"
                  alt={item.name}
                  className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] object-cover rounded-lg"
                />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-xs text-gray-400">{item.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-lg font-bold">{item.price}</span>
                    <Button className="bg-purple-600 text-white text-xs h-8 px-2">
                      Add Cart
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Customer;

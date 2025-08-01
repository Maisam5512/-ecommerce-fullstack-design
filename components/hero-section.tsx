import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white border rounded-lg border-gray-300 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar Categories */}
          <div className="bg-white  h-full">
            <div className="space-y-0">
              <div className="text-sm text-gray-800 font-semibold py-3 px-4 rounded-lg bg-blue-50 cursor-pointer">
                Automobiles
              </div>
              {[
                "Clothes and wear",
                "Home interiors",
                "Computer and tech",
                "Tools, equipments",
                "Sports and outdoor",
                "Animal and pets",
                "Machinery tools",
                "More category",
              ].map((item) => (
                <div
                  key={item}
                  className="text-sm text-gray-700 py-3 px-4 rounded-lg  hover:bg-gray-50 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Main Banner */}
          <div
            className="col-span-2  p-8 flex flex-col justify-center h-full bg-cover bg-center text-white"
            style={{ backgroundImage: "url('/images/Banner.png')" }}
          >
            <h2 className="text-xl mb-1 font-large text-black">Latest trending</h2>
            <h3 className="text-2xl font-bold mb-4 text-black">Electronic items</h3>
            <Button variant="outline" className="bg-white text-black hover:bg-gray-100 border-gray-300 w-fit">
              Learn more
            </Button>
          </div>

          {/* Side Panels */}
          <div className="flex flex-col justify-between h-full space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Image
                  src="/images/Avater.png"
                  alt="User"
                  width={24}
                  height={24}
                />
              </div>
              <div className="text-sm text-gray-600 mb-1">Hi, user</div>
              <div className="text-sm text-gray-800 mb-4">let’s get stated</div>
              <Button size="sm" className="w-full mb-2 bg-blue-500 hover:bg-blue-600">
                Join now
              </Button>
              <Button variant="outline" size="sm" className="w-full bg-white">
                Log in
              </Button>
            </div>

            <div className="bg-orange-400 rounded-lg p-4 text-white">
              <div className="text-sm font-semibold mb-1">Get US $10 off</div>
              <div className="text-xs">with a new supplier</div>
            </div>

            <div className="bg-teal-400 rounded-lg p-4 text-white">
              <div className="text-sm font-semibold mb-1">Send quotes with</div>
              <div className="text-xs">supplier preferences</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}














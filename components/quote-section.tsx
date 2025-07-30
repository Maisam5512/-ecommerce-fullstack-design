import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function QuoteSection() {
  return (
    <div className="relative mt-12 rounded-lg overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/quote.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-500 opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col lg:flex-row items-center justify-between text-white gap-10 min-h-[400px]">
        {/* Left text block */}
        <div className="max-w-md">
          <h3 className="text-3xl font-bold mb-4 leading-snug">
            An easy way to send <br /> requests to all suppliers
          </h3>
          <p className="text-blue-100 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
          </p>
        </div>

        {/* Quote Form */}
        <Card className="w-full max-w-sm bg-white shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-800 text-base">Send quote to suppliers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="What item you need?"
              className="border-gray-300 text-black"
            />
            <Textarea
              placeholder="Type more details"
              className="border-gray-300 text-black min-h-[80px]"
              rows={3}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Quantity" className="border-gray-300 text-black" />
              <Select>
                <SelectTrigger className="border-gray-300 text-black">
                  <SelectValue placeholder="Pcs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pcs">Pcs</SelectItem>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="boxes">Boxes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 h-10 text-white">
              Send inquiry
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



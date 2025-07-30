import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function Newsletter() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Subscribe on our newsletter</h3>
        <p className="text-gray-600 mb-8">Get daily news on upcoming offers from many suppliers all over the world</p>

        <div className="flex max-w-md mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder="Email" className="pl-10 rounded-r-none border-r-0 h-11" />
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 rounded-l-none h-11 px-6">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

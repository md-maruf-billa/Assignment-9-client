import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function ReviewBanner() {
  return (
    <div className="w-full bg-orange-100 rounded-xl p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Help millions make the right choice
          </h2>
          <p className="text-lg mb-6">
            Share your experience on Trustpilot, where real reviews make a
            difference.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="rounded-full bg-black text-white hover:bg-black/90">
              Login or sign up
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Google"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Apple"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=200"
              alt="Person in garden"
              width={200}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=200"
              alt="People walking"
              width={200}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=200"
              alt="Person enjoying coffee"
              width={200}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

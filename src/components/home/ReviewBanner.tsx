
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebookF } from 'react-icons/fa';
import banner1 from '@/assets/ReviewBanner/banner-1.jpg';
import banner2 from '@/assets/ReviewBanner/banner-2.jpg';
import banner3 from '@/assets/ReviewBanner/banner-3.jpg';


export default function ReviewBanner() {
  return (
    <div className="w-full bg-orange-100 rounded-xl p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Help millions make the right choice
          </h2>
          <p className="text-lg mb-6">
            Share your experience on ReviewHub, where real reviews make a
            difference.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="rounded-full bg-black text-white hover:bg-black/90">
              Login or sign up
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <FcGoogle className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full text-[#1877F2]"
              >
                <FaFacebookF className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full text-black"
              >
                <FaApple className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={banner1}
              alt="Person in garden"
              width={200}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src={banner2}
              alt="People walking"
              width={200}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src={banner3}
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

import { Button } from '@/components/ui/button';

export default function SiteBanner() {
  return (
    <div className="w-full bg-emerald-200 rounded-3xl p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            We're Trustpilot
          </h2>
          <p className="text-gray-900 text-lg">
            We're a review platform that's open to everyone. Our vision is to
            become the universal symbol of trust — by empowering people to shop
            with confidence, and helping companies improve.
          </p>
          <Button className="rounded-full bg-gray-900 text-white hover:bg-gray-800">
            What we do
          </Button>
        </div>

        <div className="bg-green-900 text-white p-6 md:p-8 rounded-2xl">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              Our Transparency Report has landed!
            </h3>
            <p>
              Find out which actions we've taken to protect you and promote
              trust on our platform this year.
            </p>

            <div className="flex justify-between mb-4 mt-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-emerald-400 w-16 h-16 rounded-lg flex items-center justify-center font-bold text-3xl">
                  2
                </div>
                <div className="bg-orange-300 w-16 h-16 rounded-lg flex items-center justify-center font-bold text-3xl">
                  0
                </div>
                <div className="bg-pink-400 w-16 h-16 rounded-lg flex items-center justify-center font-bold text-3xl">
                  2
                </div>
                <div className="bg-yellow-300 w-16 h-16 rounded-lg flex items-center justify-center font-bold text-3xl">
                  4
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="rounded-full border-white text-white hover:bg-white/10"
            >
              Take a look
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

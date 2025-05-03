import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface BankCardProps {
  logo: string;
  name: string;
  website: string;
  rating: number;
  reviewCount: number;
}

const BankCard = ({
  logo,
  name,
  website,
  rating,
  reviewCount,
}: BankCardProps) => {
  return (
    <Card className="p-4 flex flex-col gap-2">
      <div className="w-16 h-16 mb-2">
        <Image
          src={logo || '/placeholder.svg'}
          alt={`${name} logo`}
          width={64}
          height={64}
          className="object-contain"
        />
      </div>
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm text-muted-foreground">{website}</p>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 fill-current ${
              i < Math.floor(rating) ? 'text-green-500' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 font-medium">{rating}</span>
        <span className="text-muted-foreground text-sm">
          ({reviewCount.toLocaleString()})
        </span>
      </div>
    </Card>
  );
};

export default function SiteComparison() {
  const banks = [
    {
      logo: '/placeholder.svg?height=64&width=64',
      name: 'DuGood Credit Union',
      website: 'www.dugood.org',
      rating: 4.8,
      reviewCount: 4344,
    },
    {
      logo: '/placeholder.svg?height=64&width=64',
      name: 'MAJORITY - Mobile Banking',
      website: 'majority.com',
      rating: 4.7,
      reviewCount: 11201,
    },
    {
      logo: '/placeholder.svg?height=64&width=64',
      name: 'BankFive',
      website: 'www.bankfive.com',
      rating: 4.7,
      reviewCount: 4742,
    },
    {
      logo: '/placeholder.svg?height=64&width=64',
      name: 'Credit Union of New Jersey',
      website: 'www.cunj.com',
      rating: 4.7,
      reviewCount: 3860,
    },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Best in Bank</h2>
        <Button variant="outline" className="rounded-full">
          See more
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {banks.map((bank, index) => (
          <BankCard key={index} {...bank} />
        ))}
      </div>
    </div>
  );
}

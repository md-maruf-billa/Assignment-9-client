import Image from 'next/image';
import bank1 from '@/assets/bank logo/bank-1.png';
import bank2 from '@/assets/bank logo/bank-2.png';
import bank3 from '@/assets/bank logo/bank-3.png';
import bank4 from '@/assets/bank logo/bank-4.png';

const bankData = [
  {
    name: 'DuGood Credit Union',
    url: 'www.dugood.org',
    logo: bank1,
    rating: 4.8,
    reviews: 4345,
  },
  {
    name: 'EECU Credit Union',
    url: 'eecu.org',
    logo: bank2,
    rating: 4.8,
    reviews: 1667,
  },
  {
    name: 'Superior Funding',
    url: 'superiorfunding.net',
    logo: bank3,
    rating: 4.8,
    reviews: 450,
  },
  {
    name: 'MAJORITY - Mobile Banking',
    url: 'majority.com',
    logo: bank4,
    rating: 4.7,
    reviews: 11207,
  },
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-green-500' : 'text-gray-300'}`}
    fill={filled ? 'currentColor' : 'none'}
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.974 2.888 1.519 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.974 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.974-2.888c-.784-.57-.38-1.81.588-1.81h4.911l1.519-4.674z" />
  </svg>
);

export default function SiteReview() {
  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Best in Bank</h2>
        <button className="text-sm border border-blue-500 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-50">
          See more
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {bankData.map((bank, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-64 bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-14 h-14 mb-2">
              <Image
                src={bank.logo}
                alt="img"
                width={56}
                height={56}
                className="rounded-md object-contain"
              />
            </div>
            <h3
              className="font-semibold text-[15px] leading-tight truncate"
              title={bank.name}
            >
              {bank.name}
            </h3>
            <p className="text-gray-500 text-sm">{bank.url}</p>
            <div className="flex items-center mt-2">
              <div className="flex gap-[1px]">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} filled={i < Math.floor(bank.rating)} />
                ))}
              </div>
              <p className="text-sm text-gray-700 ml-1">
                {bank.rating} ({bank.reviews.toLocaleString()})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

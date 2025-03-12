import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  subtitle?: string;
  logoUrl?: string;
}

const Header = ({ title, subtitle, logoUrl }: HeaderProps) => {
  return (
    <header className="flex flex-col items-center justify-center py-6 px-4 text-center">
      {logoUrl && (
        <div className="w-24 h-24 rounded-full overflow-hidden bg-nmalls-primary mb-4 flex items-center justify-center">
          <Image
            src={logoUrl}
            alt={title}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
      )}
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </header>
  );
};

export default Header; 
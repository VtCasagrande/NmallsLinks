import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-4 px-6 text-center text-sm text-gray-500 mt-auto">
      <p>
        &copy; {new Date().getFullYear()} Nmalls - Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer; 
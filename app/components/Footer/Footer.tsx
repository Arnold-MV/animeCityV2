export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="text-sm text-gray-400 ">&copy; {year} AnimeCity</footer>
  );
};

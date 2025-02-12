const Footer = () => {
  return (
    <footer className="text-center p-4 bg-pink-100 space-y-2">
      <p className="text-sm text-pink-500 max-w-xs mx-auto">
        🔒 Your data is never shared anywhere. It stays in your device's cookies 
        and is lost when refreshed. Have fun!
      </p>
      <p className="text-pink-600">
        Made with ❤️ by{' '}
        <a
          href="https://www.linkedin.com/in/edhumbling/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-pink-800"
        >
          Emma
        </a>
      </p>
    </footer>
  );
};

export default Footer; 
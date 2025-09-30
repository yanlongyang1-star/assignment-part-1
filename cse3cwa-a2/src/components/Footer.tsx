export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          <p>
            Yanlong Yang, Student No. 22519263, {new Date().toISOString().split('T')[0]}
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            CSE3CWA Assignment 2 - Based on Assignment 1 (ltu-a1) with enhanced features
          </p>
        </div>
      </div>
    </footer>
  );
}

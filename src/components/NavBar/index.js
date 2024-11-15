import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
            
          <Link href="/">
           HOME
          </Link>
        </li>
        <li>
            
          <Link href="/lcs">
            LCS Algorithm
          </Link>
        </li>
        
        <li>
          <Link href="/mye">
            Myers' Algorithm
          </Link>
        </li>
        
      </ul>
    </nav>
  );
}

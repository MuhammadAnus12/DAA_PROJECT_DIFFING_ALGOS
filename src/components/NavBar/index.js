import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
            
          <Link href="/lcs">
            LCS Algorithm
          </Link>
        </li>
        <li>

          <Link href="/vilcs">
           Visualize LCS Algorithm
          </Link>
        </li>
        <li>

          <Link href="/vimye">
          Visualize   Myers' Algorithm
          </Link>
        </li>
        <li>
          <Link href="/mye">
            Myers' Algorithm
          </Link>
        </li>
        <li>
          <Link href="/comparison">
            Comparison
          </Link>
        </li>
      </ul>
    </nav>
  );
}

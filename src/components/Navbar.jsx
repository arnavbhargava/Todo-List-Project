export default function Navbar() {
  return (
    <nav className="flex justify-between text-white bg-purple-600 py-2">
      <div className="logo">
        <span className="font-bold text-lg cursor-pointer mx-14">
          Task Buddy
        </span>
      </div>
      <ul className="flex gap-12 mx-12">
        <li className="cursor-pointer hover:font-bold transition-all">
          <a href="#home">Home</a>
        </li>
        <li className="cursor-pointer hover:font-bold transition-all">
          <a href="#yourtasks">Your Tasks</a>
        </li>
      </ul>
    </nav>
  );
}

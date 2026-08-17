import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({
    Route,
    heading,
    subHeading
}) => {
  return (
    <div className="flex items-center justify-between px-8 py-6 border-b border-(--border-color)">

      {/* Back Button */}
      <Link
        to={`${Route}`}
        className="
          flex
          items-center
          gap-2
          text-(--text-secondary)
          hover:text-(--spotify-green)
          transition-all
          duration-300
        "
      >
        <ChevronLeft size={28} />
        <span className="text-lg font-medium">Back</span>
      </Link>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-(--text-primary)">
         {heading}
        </h1>

        <p className="text-sm text-(--text-secondary) mt-1">
          {
            subHeading
          }
        </p>
      </div>

      {/* Empty div for perfect center alignment */}
      <div className="w-[90px]"></div>

    </div>
  );
};

export default Header;
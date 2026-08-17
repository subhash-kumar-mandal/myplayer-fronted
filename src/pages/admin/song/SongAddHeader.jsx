import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SongAddHeader = () => {
  return (
    <div className="flex items-center justify-between px-8 py-6 border-b border-(--border-color)">

      {/* Back Button */}
      <Link
        to="/admin/songs"
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
          Add New Song
        </h1>

        <p className="text-sm text-(--text-secondary) mt-1">
          Upload a new song to your music library
        </p>
      </div>

      {/* Empty div for perfect center alignment */}
      <div className="w-[90px]"></div>

    </div>
  );
};

export default SongAddHeader;
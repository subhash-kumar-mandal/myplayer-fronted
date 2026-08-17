const MusicLogo = ({ className = "w-10 h-10" }) => {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Music note */}
            <path
                d="M38 12V42.5C38 49.4 33 54 26 54C20.5 54 16 50.5 16 46C16 41.5 20.5 38 26 38C28.7 38 31.2 38.8 33 40.2V20L48 16V35"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Play button */}
            <path
                d="M27 42L27 50L34 46L27 42Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default MusicLogo;
function Spinner({ h, w, position }) {

    return (
        <div
            style={{ height: ` ${(h !== undefined && w !== undefined) ? `16px` : ''}`, width: ` ${(h !== undefined && w !== undefined) ? `16px` : ''}` }}
            className={` ${(h !== undefined && w !== undefined) ? `` : 'h-6 w-6'} ${position ? position : "border-t-white  border-zinc-700"} animate-spin rounded-full  border-2 `}
        />
    );
};


export default Spinner
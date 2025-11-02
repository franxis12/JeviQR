function Header({ user }) {
  return (
    <div className="  w-full">
      <div className="flex items-center justify-end  gap-2 px-5 py-1">
        <h1>{user?.email}</h1>
        <img
          className="w-15 h-15 rounded-full border"
          src="https://wallpapers.com/images/hd/team-success-keys-wx2y1rgcainq64y8.jpg"
        />
      </div>
    </div>
  );
}

export default Header;

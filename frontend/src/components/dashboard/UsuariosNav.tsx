import { useNavigate } from "react-router-dom";

export default function UsuariosNav({usersToShow, setUpdateUser, setUserSelect, setSearchUser}: any) {
    if (!usersToShow) return null;
  
    const navigate = useNavigate();
  
    return (
      <div className="h-full w-[400px] bg-gray-900 text-white p-4 flex flex-col">
        <div className="flex flex-col gap-2">
          <div>
            <svg
              onClick={() => navigate('/')}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 cursor-pointer border-blue-400 border-2 px-1 py-2 rounded-xl"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <h1 className="text-center text-xl text-blue-400">Usuarios</h1>
          </div>
          <input
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search by username or email"
            type="text"
            className="py-1 text-black bg-white rounded-md border-blue-400 border-2"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4 overflow-auto flex-1">
          {usersToShow.map((user: any) => (
            <div
              key={user._id}
              className="flex border-2 border-blue-700 rounded-md items-center justify-between px-5 py-1"
            >
              <p
                onClick={() => {
                  setUpdateUser(false);
                  setUserSelect(user._id);
                }}
                className="text-center px-1 py-1.5 text-blue-400 cursor-pointer"
              >
                {user.username}
              </p>
              <svg
                onClick={() => {
                    setUserSelect(user._id);
                  setUpdateUser(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
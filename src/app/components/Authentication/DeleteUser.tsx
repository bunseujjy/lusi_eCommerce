import { NextResponse } from "next/server";

const DeleteUser = () => {
  const handleSubmit = async (id: string) => {
    try {
      const res = await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (res.ok) {
        return NextResponse.json("User deleted successfully");
      } else {
        return NextResponse.json("Failed to delete user");
      }
    } catch (error) {
      return NextResponse.json("Failed to delete user");
    }
  };

  return (
    <form className="w-full p-4 text-right text-gray-500">
      <button
        onClick={() => handleSubmit}
        className="inline-flex items-center focus:outline-none mr-4"
      >
        <svg
          fill="none"
          className="w-4 mr-2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Delete account
      </button>
    </form>
  );
};

export default DeleteUser;
